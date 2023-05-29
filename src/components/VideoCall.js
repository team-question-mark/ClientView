import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';




function VideoCall(props) {

    // let socket = null;

    const url = process.env.REACT_APP_SIGNALLING_SERVER_URL;
    console.log('url is : ' + url);

    const [socket, setSocket] = useState(null);

    const roomId = props.roomId;

    console.log('roomID is ' + roomId);

    //여기부터 화상통화
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isMuted, setIsMuted] = useState(false);

    // const navigate = useNavigate();



    // 미디어 스트림 가져오기
    useEffect(() => {
        const constraints = { audio: true, video: true };
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                setLocalStream(stream);
            })
            .catch((error) => {
                console.error(error);
            });
        setSocket(io(url));
        // socket = io(url);
    }, []);


    useEffect(() => {
        // socket.emit('join', roomId)
        // console.log('localstream, join is sucessed')
        if (socket === null) {
            return; // 초기 렌더링 시에는 실행하지 않음
        }

        const joinRoom = (roomId) => {
            socket.emit('join', roomId);
            console.log('localstream, join is sucessed');
        }

        joinRoom(roomId);

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
    }, [socket]);


    // 연결 관련
    const handleStart = () => {
        // navigator.mediaDevices.getUserMedia({ video: true, audio: true })

        console.log('handelStart')
        const pc = new RTCPeerConnection(null);

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate);
            }
        };

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        pc.createOffer()
            .then((offer) => {
                pc.setLocalDescription(offer);
                socket.emit('offer', offer);
            })
            .catch((error) => {
                console.error(error);
            });

        setPeerConnection(pc);
    };


    // offer
    const handleOffer = (offer) => {
        const pc = new RTCPeerConnection(null);

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('candidate', event.candidate);
            }
        };

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        pc.setRemoteDescription(new RTCSessionDescription(offer));

        pc.createAnswer()
            .then((answer) => {
                pc.setLocalDescription(answer);
                socket.emit('answer', answer);
            })
            .catch((error) => {
                console.error(error);
            });

        setPeerConnection(pc);
    };

    // answer
    const handleAnswer = (answer) => {
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    };


    // candidate 교환
    const handleCandidate = (candidate) => {
        const iceCandidate = new RTCIceCandidate(candidate);
        peerConnection.addIceCandidate(iceCandidate)
            .catch((error) => {
                console.error(error);
            });
    };

    // 연결 해제 관련
    const handleHangUp = () => {
        setLocalStream(null);
        setRemoteStream(null);

        if (peerConnection) {
            peerConnection.close();
        }

        socket.disconnect();
    };


    // 음소거 관련
    const handleToggleMute = () => {
        const audioTracks = localStream.getAudioTracks();
        if (audioTracks.length === 0) {
            return;
        }

        const track = audioTracks[0];
        setIsMuted(!isMuted);
        track.enabled = !isMuted;
    };










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