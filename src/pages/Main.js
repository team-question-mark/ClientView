import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import Header from '../components/Header';
import Modal from '../components/Modal';
import Modal2 from '../components/Modal2';
import axios from 'axios';


function Main() {



    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState(null);
    const [signUser, setSignUser] = useState(false);


    //모달창 켜고 닫기
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleModalOpen = () => {
    //     setIsModalOpen(true);
    // };

    // const handleModalClose = () => {
    //     setIsModalOpen(false);
    // };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSecondModalOpen = () => {
        setIsModalOpen(false);  // 첫 번째 모달을 닫고
        setIsSecondModalOpen(true);  // 두 번째 모달을 연다
    };

    const handleSecondModalClose = () => {
        setIsSecondModalOpen(false);
    };




    // 방이동 코드
    // const goRoom = () => { 
    //     window.location.href = "/pages/Room";
    // }
    // const goHelp = () => {
    //     window.location.href = "/pages/Help";
    // }
    // const goSettings = () => {
    //     window.location.href = "/pages/Settings";
    // }





    // Video Call

    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        if(roomId === null){
            return;
        }
        console.log('go room... room id is '+ roomId);
        goRoom();
    }, [roomId])

    // roomId
    // let roomId = null;

    const handleInputValue = (event) => {
        setInputValue(event.target.value);
    }

    const goRoom = () => {
        navigate('/pages/Room', { state: { roomId: roomId, signUser: signUser } })
    }

    const roomServerApi=process.env.REACT_APP_ROOM_SERVER_API
    // 방 생성
    const createRoom = (isSignUser) => {
        // 방 생성 api   /room/create

        axios.post(roomServerApi + '/roomCreate')
        .then((result) => {
            setRoomId(result.data);
            setSignUser(isSignUser);
            //console.log('roomId : ' + roomId);
        })
        .catch((error) => {
            console.error(error)
        })

        // 연결  => roomId와 함께 화상통화 페이지로 이동

    }


    // 방 입장
    const enterRoom = () => {
        // 방 확인 api   /room/check
        axios.get(roomServerApi + '/roomCheck/'+inputValue)
        .then((result) => {
            // console.log(result.data.isRoom);
            if (!result) {
                // window.alert('no!')
            }else{
                setRoomId(inputValue);
                console.log(inputValue);
            }
        })
        .catch((error) => {
            console.error(error);
        })
        // 연결  => roomId와 함께 화상통화 페이지로 이동
    }





    return (
        <>
            <Header />

            <Container>
                <MainBox>
                    <CreateBox1>
                        <CreateBox2>
                            <img width="256" height="256" src="https://img.icons8.com/windows/256/home.png" alt="home" />
                            {/* <img src={process.env.PUBLIC_URL + '/Images/Home.png'} alt='Home'/> */}
                        </CreateBox2>
                        <CreateBox3>
                            {/* <Modal buttonLabel="방 생성" isOpen={isModalOpen} handleClose={handleModalClose}>
                                뱅을 생성할꺼냐?
                                <OpenButton onClick={test_createRoom}>예</OpenButton> <OpenButton>아니오</OpenButton>
                            </Modal> */}
                            
                            <MainButton onClick={handleModalOpen}>방생성</MainButton>

                            <Modal2 isOpen={isModalOpen} handleClose={handleModalClose}>
                                <p>뱅을 생성할꺼냐?</p>
                                <OpenButton onClick={handleSecondModalOpen}>예</OpenButton>
                                <OpenButton onClick={handleModalClose}>아니오</OpenButton>
                            </Modal2>

                            <Modal2
                                isOpen={isSecondModalOpen}
                                handleClose={handleSecondModalClose}
                               >
                                <p>수화 사용자이십니까?</p>
                                <OpenButton onClick={() => createRoom(true)}>예</OpenButton>
                                <OpenButton onClick={() => createRoom(false)}>아니오</OpenButton>
                            </Modal2>
                        </CreateBox3>
                    </CreateBox1>
                    <ParticipateBox1>
                        <ParticipateBox2>
                            <img width="256" height="225" src="https://icon-library.com/images/enter-icon-png/enter-icon-png-4.jpg" />
                        </ParticipateBox2>
                        <ParticipateBox3>
                            {/* <MainButton>방 참가</MainButton> */}
                            <Modal buttonLabel="방 참가" isOpen={isModalOpen} handleClose={handleModalClose}>
                                뱅 코드를 입력해라
                                <input style={{ display: "block", width: "100%", marginTop: "20px", height: "25px", borderWidth: "2px", borderRadius: "5px" }}
                                    type='text' value={inputValue} onChange={handleInputValue}/>
                                <GoinButton onClick={enterRoom} >입장</GoinButton>
                            </Modal>
                        </ParticipateBox3>
                    </ParticipateBox1>
                </MainBox>
            </Container>
        </>
    )
}
export default Main;


let Container = styled.div`  //가장 큰거 담는 부분
    display: flex;
    background-color: white;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;
    min-width: 1240px;
    min-height: 600px;
`

let MainBox = styled.div`  //메인박스
    display: flex;
    width: 70%;
    height: 80%;
    background-color: white;
`

let CreateBox1 = styled.div` //방생성 박스1
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 75px;
`
let CreateBox2 = styled.div` //방생성 박스2
    display: flex;
    width: 100%;
    height: 50%;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 75px;
    padding-top: 10px;

`
let CreateBox3 = styled.div` //방생성 박스3
    display: flex;
    width: 100%;
    height: 50%;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 75px;
`

let ParticipateBox1 = styled.div` //방참가 박스1
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 75px;
`
let ParticipateBox2 = styled.div` //방참가 박스2
    display: flex;
    width: 100%;
    height: 50%;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 75px;
    padding-top: 10px;
`
let ParticipateBox3 = styled.div` //방참가 박스3
    display: flex;
    width: 100%;
    height: 50%;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 75px;
    margin-left: 55px;
`

let MainButton = styled.button` //메인 버튼

    border-width: 0;
    border-radius: 18px;
    background-color: white;
    padding: 10px 30px;
    font-size: 55px;
    font-weight: bold;

    &:hover {
    background: black;
    color: white;
    transition: 0.25s;
    }
    cursor: pointer;
`


const OpenButton = styled.div` //방생성할거냐 버튼
  margin: 5px;
  color: black;
  align-items: center;
  padding: 8px 15px;
  border-radius: 15px;
  letter-spacing: 1px;
  text-decoration: none;
  font-size: 22px;
  font-weight: 650;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: black;
    color: white;
    transition: 0.25s;
  }
`;


const GoinButton = styled.div` //방입장할거냐 버튼 버튼
  margin: 5px;
  margin-top: 10px;
  color: black;
  align-items: center;
  padding: 8px 15px;
  border-radius: 15px;
  letter-spacing: 1px;
  text-decoration: none;
  text-align: center;
  width: 10%;
  font-size: 22px;
  font-weight: 650;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: black;
    color: white;
    transition: 0.25s;
  }
`;