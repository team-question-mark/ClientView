import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import Header from '../components/Header';
import Modal from '../components/Modal';


function Main() {

    //모달창 켜고 닫기
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
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
                            <Modal buttonLabel="방 생성" isOpen={isModalOpen} handleClose={handleModalClose}>
                                   뱅을 생성할꺼냐?
                                <OpenButton>예</OpenButton> <OpenButton>아니오</OpenButton>
                            </Modal>
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
                                <input style={{display:"block", width:"100%",marginTop:"20px",height:"25px",borderWidth:"2px",borderRadius:"5px"}} >

                                </input>
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

// let MainButton = styled.button` //버튼 형태

//     border-width: 0;
//     border-radius: 18px;
//     background-color: white;
//     padding: 10px 30px;
//     font-size: 55px;
//     font-weight: bold;

//     &:hover {
//     background: black;
//     color: white;
//     transition: 0.25s;
//     }
//     cursor: pointer;
// `
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