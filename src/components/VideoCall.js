import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Signalling Server url
const url = process.env.REACT_APP_SIGNALLING_SERVER_URL;

function VideoCall(props) {

    const roomId = props.roomId;

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
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    // const [isMuted, setIsMuted] = useState(false);


    // get Local Media Stream  &  connect Socket  &  WebRTC Config
    useEffect(() => {

        // 로그 확인
        console.log('url is : ' + url);
        console.log('roomID is ' + roomId);


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

    }, [socket, localStream]);


    
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
        <div>
            {localStream && (
                <video
                    ref={(video) => {
                        if (video && !video.srcObject) {
                            video.srcObject = localStream;
                        }
                    }}
                    autoPlay
                    muted
                />
            )}
            {remoteStream && (
                <video
                    ref={(video) => {
                        if (video && !video.srcObject) {
                            video.srcObject = remoteStream;
                        }
                    }}
                    autoPlay
                />
            )}
            {/* <div>
                <button onClick={handleToggleMute}>
                    {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <button onClick={handleHangUp}>Hang Up</button>
                {!localStream && <button onClick={handleStart}>Start</button>}
            </div> */}
        </div>
    );
};



export default VideoCall;
