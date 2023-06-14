import React, { useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import ReactHookSTT from './STT';



// Signalling Server url
const url = process.env.REACT_APP_SIGNALLING_SERVER_URL;
// const kslurl = "http://localhost:5000";
const kslurl = process.env.REACT_APP_KSL_SERVER_URL;



function VideoCallTest2(props) {

    const [videoQueue, setVideoQueue] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const handleVideoQueueUpdate = (videoQueue) => {
        setVideoQueue(videoQueue);
      };

    const roomId = props.roomId;
    const signUser = props.signUser;
    // STUN/TURN Server Config
    const rtcConfig = {
        'iceServers': [{
            'urls': process.env.REACT_APP_STUN_SERVER_URL  // STUN 서버 URL
        },
        {
            'urls': process.env.REACT_APP_TURN_SERVER_URL,  // TURN 서버 URL
            'username': process.env.REACT_APP_TURN_SERVER_USER_NAME,  // TURN 서버 인증을 위한 사용자 이름
            'credential': process.env.REACT_APP_TURN_SERVER_CREDENTIAL  // TURN 서버 인증을 위한 패스워드
        }]
    };

    const [socket, setSocket] = useState(null);
    const [kslsocket, setKslsocket] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [wordarray, setWordArray] = useState(null); // 허브 서버로 보낼 state
    const canvasRef = useRef(null);
    const timerRef = useRef(null);
    const countRef = useRef(0);



    const [audiotest,setAudioTest] = useState(null);
    // const [isMuted, setIsMuted] = useState(false);
    
    const audioRef = useRef(); // 오디오 참조
    // get Local Media Stream  &  connect Socket  &  WebRTC Config & connect KSLFLASK
    useEffect(() => {

        // 로그 확인
        console.log('url is : ' + url);
        console.log('roomID is ' + roomId);
        console.log('대화방에 sign user수화 여부 :' + signUser);

        // get Local Media Stream
        const constraints = { audio: true, video: true };
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                setLocalStream(stream);
                // setSocket(io(url));
                // setPeerConnection(new RTCPeerConnection(rtcConfig));
            })
            .catch((error) => {
                console.error(error);
            });

        // connect Socket
        setSocket(io(url));
        
        // WebRTC Config
        setPeerConnection(new RTCPeerConnection(rtcConfig));
        
        // connect KSLFLASK
        if(signUser){
        setKslsocket(io(kslurl));
        }

        // unmount
        return () => {
            handleHangUp();
        }
    }, []);
   



    // connect WebRTC
    useEffect(() => {
        if (socket === null || localStream === null) {
            return;
        }

        // 로그 확인
        console.log('stream is ' + localStream);
        console.log('socket is ' + socket);
        console.log('pc is '+ peerConnection);


        // room 입장
        const joinRoom = (roomId) => {
            socket.emit('join', roomId);
            console.log('localstream, join is sucessed');
        }
        joinRoom(roomId);


        // Socket Listener

        // 상대방이 소켓을 연결했을 때
        socket.on('start', () => {
            handleStart();
        })

        // Offer를 받았을 때의 처리
        socket.on('offer', (offer) => {
            handleOffer(offer);
        });

        // Answer를 받았을 때의 처리
        socket.on('answer', (answer) => {
            handleAnswer(answer);
        });

        // Candidate를 받았을 때의 처리
        socket.on('candidate', (candidate) => {
            handleCandidate(candidate);
        });

        socket.on('ksl_ani', (list)=>{
            // 리스트 받은거 큐에 넣어줌.
            console.log("list"+list)
            handleVideoQueueUpdate(list)
        });

        socket.on('voice', (voice)=>{
            // s3에 저장된 mp3파일 출력
            setAudioTest(voice);
            console.log('voice url is  '+voice)
            
            playAudio(voice)
        });


     


    }, [socket, localStream,kslsocket]);





    
    // Handler

    // 연결 시작
    const handleStart = () => {
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate, roomId);
            }
        };

        peerConnection.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        localStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, localStream);
        });

        peerConnection.createOffer()
            .then((offer) => {
                peerConnection.setLocalDescription(offer);
                socket.emit('offer', offer, roomId);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // 연결 해제
    const handleHangUp = () => {

        if (peerConnection) {
            peerConnection.close();
        }
        if (socket) {
            socket.disconnect(roomId);
        }
        // if(localStream){
        //     localStream.
        // }

        setLocalStream(null);
        setRemoteStream(null);
        setSocket(null);
        setKslsocket(null);
        setPeerConnection(null);
    };

    // offer handler
    const handleOffer = (offer) => {
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate, roomId);
            }
        };

        peerConnection.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        peerConnection.createAnswer()
            .then((answer) => {
                peerConnection.setLocalDescription(answer);
                socket.emit('answer', answer,roomId);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // answer handler
    const handleAnswer = (answer) => {
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    };


    // candidate handler
    const handleCandidate = (candidate) => {
        console.log('pc is ' + peerConnection);
        const iceCandidate = new RTCIceCandidate(candidate);
        peerConnection.addIceCandidate(iceCandidate)
            .catch((error) => {
                console.error(error);
            });

        //플라스크와 연결되면 콘솔에 찍기
        kslsocket.on('connect', () => {
            console.log("FLASK Connected...!",)
        })

    };


    //FLASK에게 이미지 전송
    useEffect(() => {

        if(kslsocket === null){
            return
        }
        // if (localStream && countRef.current < 5) {
        if (localStream && !timerRef.current) {
          timerRef.current = setInterval(() => {
            sendFrame();
          }, 300);
        }

        // //플라스크 result
        if (kslsocket) {
            kslsocket.on('result', (data) => {
                console.log("result: ", data)
                //받은걸 바로 보내기
                // axios.post('/server/ksl/from', {
                //     ksl_recog_word_arr: data,
                // })  
                axios({
                    method: 'post',
                    url: process.env.REACT_APP_HUB_SERVER_URL +'server/ksl/from',
                    data: {"ksl_recog_word_arr": data},
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })  
                .then((response) => { console.log(response.data);
                    if (response.data.speaking_audio) {
                        socket.emit('voice', response.data.speaking_audio, roomId)
                        playAudio(response.data.speaking_audio)
                        console.log("voice로 에밋 보냄 : " + response.data.speaking_audio);
                        // playAudio(response.data.speaking_audio);
                    } }) 
                .catch(error => {console.error('ksl 에러 : '+error);});
                // setWordArray(data);
            }) 
        }
        // 플라스크 response back
        if (kslsocket) {
            kslsocket.on('response_back', (data) => {
                console.log("response_back: ", data)
            })
        }
        return () => {
          clearInterval(timerRef.current);
          //새롭게 추가
          timerRef.current = null;
        };
      }, [localStream]);

      
    
      const sendFrame = () => {
        const video = document.querySelector('video');
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
    
        context.drawImage(video, 0, 0, width, height);
        const imageData = canvas.toDataURL('image/jpeg', 0.5);
    
        kslsocket.emit('image', imageData);
        // countRef.current++;
    
        // if (countRef.current >= 5) {
        //   clearInterval(timerRef.current);
        // }
      };

   //오디오 재생
   const playAudio = (audioUrl) => {
    audioRef.current.src = audioUrl; // 참조를 사용하여 오디오 요소의 소스를 설정합니다.
    audioRef.current.play(); // 오디오를 재생합니다.
    console.log( 'audioTest 스테이트 : ' + audiotest);
  };



    // // 음소거 관련
    // const handleToggleMute = () => {
    //     const audioTracks = localStream.getAudioTracks();
    //     if (audioTracks.length === 0) {
    //         return;
    //     }

    //     const track = audioTracks[0];
    //     setIsMuted(!isMuted);
    //     track.enabled = !isMuted;
    // };




    return (
        <div style={{display:"flex"}}>
            {localStream && (
                <div style={{display:"flex",flexdirection:"row"}}>           
                <video
                    ref={(video) => {
                        if (video && !video.srcObject) {
                            video.srcObject = localStream;
                        }
                    }}
                    autoPlay
                    muted
                    //style={{width:"50%"}}
                />
                <div style={{display:"flex",flexDirection:"column"}}>             
                <ReactHookSTT socket={socket} roomId={roomId} signUser={signUser}  onVideoQueueUpdate={handleVideoQueueUpdate} />
                <VideoPlayer videoQueue={videoQueue}/>
                </div>
                {/* <ReactHookSTT onVideoQueueUpdate={handleVideoQueueUpdate}/> */}
                {/* <ReactHookSTT socket={socket} roomId={roomId} onVideoQueueUpdate={handleVideoQueueUpdate} /> */}
                </div>
            )}
            {remoteStream && (
                <div>
                <video
                    ref={(video) => {
                        if (video && !video.srcObject) {
                            video.srcObject = remoteStream;
                        }
                    }}
                    autoPlay
                    style={{width:"auto"}}
                />
                </div>
            )}
            {/* <div>
                <button onClick={handleToggleMute}>
                    {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <button onClick={handleHangUp}>Hang Up</button>
                {!localStream && <button onClick={handleStart}>Start</button>}
            </div> */}



            {/* 삼항연산자로 true일때만 쏴주기 */}
            {signUser === true ? <canvas
                id="videoCanvas"
                ref={canvasRef}
                width={640}
                height={480}
                style={{ display: 'none' }}
            /> : <div/>}
             <audio ref={audioRef} controls style={{ display: 'none' }} />
            {/* <canvas
                id="videoCanvas"
                ref={canvasRef}
                width={640}
                height={480}
                style={{ display: 'none' }}
            />        */}
        </div>
    );
};



export default VideoCallTest2;