import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import Header from '../components/Header';
import Modal from '../components/Modal';
import VideoCall from '../components/VideoCall';
import VideoCallTest2 from '../components/VideoCallTest2';
import ReactHookSTT from '../components/STT';
import VideoPlayer from '../components/VideoPlayer';


function Room() {

    const location = useLocation();

    const roomId = location.state.roomId;
    const signUser = location.state.signUser;

    // const [videoQueue, setVideoQueue] = useState([]);
    // const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // const handleVideoQueueUpdate = (videoQueue) => {
    //     setVideoQueue(videoQueue);
    //   };
    
    useEffect(()=> {
        console.log('roomId는 '+roomId);
        console.log('수화사용자 여부? '+signUser);
    }, [])
    

    //통화 종료 함수
    const showConfirm = () => {
        if (window.confirm('통화를 종료하시겠습니까?')) {
            alert('통화 종료');
        } else {
            alert('통화유지');
        }
    }
    //여기까지

    //말하기 버튼 함수
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const handleMouseDown = () => {
        setIsButtonPressed(true);
    }

    const handleMouseUp = () => {
        setIsButtonPressed(false);
    }
    //여기까지

    return (
        <div style={{ width: "100", height: "100vh" }}>
            <Header />
            <Container>
                <HangUpBox1>
                    <HangUpBox2 onClick={showConfirm}>
                        <div style={{ borderStyle: "solid", borderWidth: "5px", borderRadius: "100px", padding: "15px" }}>
                            <img src={process.env.PUBLIC_URL + '/Images/HangUp.png'} alt='HangUp' width={80} />
                        </div>
                        통화 종료
                    </HangUpBox2>
                </HangUpBox1>
                <MainBox>
                    <DevideBox1>
                        
                        <VideoCallTest2 roomId={roomId} signUser={signUser}/>
                        
                        {/* <VideoPlayer videoQueue={videoQueue}/> */}
                    </DevideBox1>
                    <DevideBox2>
                        <CodeBox>

                            <div>방 코드 : {roomId}</div>

                        </CodeBox>
                        <TextBox>

                        {/* <ReactHookSTT onVideoQueueUpdate={handleVideoQueueUpdate} /> */}
                            

                        </TextBox>
                    </DevideBox2>

                </MainBox>
            </Container>
        </div>
    )
}
export default Room;


let Container = styled.div`  //가장 큰거 담는 부분
    display: flex;
    background-color: white;
    align-items: center;
    //justify-content: center;
    width: 100%;
    min-width: 1240px;
    height: 90vh;
    min-height: 600px;
`

let HangUpBox1 = styled.div` //전화끊기버튼이 들어갈 박스1
    display: flex;
    width: 10%;
    height: 90%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 25px;
    font-weight: bold;
`

let HangUpBox2 = styled.div` //전화끊기버튼이 들어갈 박스1
    cursor: pointer;
`


let MainBox = styled.div`  //메인박스
    display: flex;
    width: 80%;
    height: 90%;
    /* min-height: 700px;
    min-width: 800px; */
    flex-direction: column;
    background-color: white;
`

let DevideBox1 = styled.div`//얼굴박스와 채팅박스를 넣을박스1
    display: flex;
    //justify-content: center;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 80%; 
    background-color: white;
`


let DevideBox2 = styled.div`//얼굴박스와 채팅박스를 넣을박스2
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 20%;
    background-color: white;
`


let ConverBox1 = styled.div` //얼굴이 보일박스1
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 75px;
    border-style: solid;
    border-color: black;
    border-top-width: 1;
    border-left-width: 1;
    border-right-width: 0.125;
`

let ConverBox2 = styled.div` //얼굴이 보일박스2
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 75px;
    border-style: solid;
    border-color: black;
    border-top-width: 1;
    border-left-width: 0;
    border-right-width: 1;
`



let TextBox = styled.div` //대화상자 박스
    display: flex;
    flex-direction: column;
    width: 100;
    height: 100%;
    padding: 20px;
    padding-top: 10px;
    //align-items: center;
    //justify-content: center;
    background-color: white;
    font-size: 20px;
    font-weight: bold;
    border-style: solid;
    border-color: black;
    border-width: 1;
    overflow-y: scroll;
`

let CodeBox = styled.div` //대화방 코드가 들어갈 박스
    position: relative;
    display: flex;
    width: 100;
    height: 30%;
    margin-top: 5px;
    border-style: solid;
    border-width: 3px;
    border-bottom-width: 0;
    padding: 5px;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
`


let TalkBox1 = styled.div` //말하기 버튼이 들어갈 박스1
    display: flex;
    width: 10%;
    min-width: 180px;
    height: 90%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 25px;
    font-weight: bold;
`

let TalkBox2 = styled.div` //말하기 버튼이 들어갈 박스2
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: white;
    cursor: pointer;
`