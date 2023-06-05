import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const url = process.env.REACT_APP_SIGNALLING_SERVER_URL;

function VideoCallTest(props) {
  const roomId = props.roomId;


  
  const rtcConfig = {
    iceServers: [
      { urls: process.env.REACT_APP_STUN_SERVER_URL },
      {
        urls: process.env.REACT_APP_TURN_SERVER_URL,
        username: process.env.REACT_APP_TURN_SERVER_USER_NAME,
        credential: process.env.REACT_APP_TURN_SERVER_CREDENTIAL
      }
    ]
  };

  const [socket, setSocket] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);



  useEffect(() => {
    const constraints = { audio: true, video: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setLocalStream(stream);
        setSocket(io(url));
        setPeerConnection(new RTCPeerConnection(rtcConfig));
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      handleHangUp();
    };
  }, []);

  useEffect(() => {
    if (socket === null || localStream === null) {
      return;
    }

    const joinRoom = (roomId) => {
      socket.emit('join', roomId);
    };
    joinRoom(roomId);

    socket.on('start', () => {
      handleStart();
    });

    socket.on('offer', (offer) => {
      handleOffer(offer);
    });

    socket.on('answer', (answer) => {
      handleAnswer(answer);
    });

    socket.on('candidate', (candidate) => {
      handleCandidate(candidate);
    });

    // //플라스크에서 날라오는 텍스트결과값
    // socket.on('result', (result) => {
    //     setResultText(result);
    //   });
  }, [socket, localStream]);

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

    peerConnection
      .createOffer()
      .then((offer) => {
        peerConnection.setLocalDescription(offer);
        socket.emit('offer', offer, roomId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleHangUp = () => {
    if (peerConnection) {
      peerConnection.close();
    }
    if (socket) {
      socket.disconnect(roomId);
    }

    setLocalStream(null);
    setRemoteStream(null);
    setSocket(null);
    setPeerConnection(null);
  };

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

    peerConnection
      .createAnswer()
      .then((answer) => {
        peerConnection.setLocalDescription(answer);
        socket.emit('answer', answer, roomId);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAnswer = (answer) => {
    peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleCandidate = (candidate) => {
    const iceCandidate = new RTCIceCandidate(candidate);
    peerConnection
      .addIceCandidate(iceCandidate)
      .catch((error) => {
        console.error(error);
      });
  };

  const sendVideoFrame = () => {
    if (localStream && socket) {
      const canvas = document.createElement('canvas');
      canvas.width = localStream.width;
      canvas.height = localStream.height;
      const context = canvas.getContext('2d');
      context.drawImage(localStream, 0, 0, localStream.width, localStream.height);
      const imageData = canvas.toDataURL('image/jpeg');
      socket.emit('video-frame', imageData);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(sendVideoFrame, 200); // 200ms 간격으로 비디오 프레임 전송
    return () => {
      clearInterval(intervalId);
    };
  }, [localStream, socket]);

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
      {/* <div>{resultText}</div> */}
    </div>
  );
}

export default VideoCallTest;
