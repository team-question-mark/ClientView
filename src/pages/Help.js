import React from 'react';
import { useState, useEffect, useRef } from "react";
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import Header from '../components/Header';
import { SectionsContainer, Section } from 'react-fullpage'; //풀페이지 스크롤 라이브러리
import HelpModal from '../components/HelpModal';
import HelpModal2 from '../components/HelpModal2';


function Help() {
    //페이지 스크롤 함수
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    let options = { //풀페이지 스크롤 옵션 설정
        anchors: ['sectionOne', 'sectionTwo','sectionThree'],
        //normalScrollElements: '.header-container',
    };


    //모달창 켜고 닫기
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
        <>
            <Header />
            <SectionsContainer {...options}>
            <Section>
                    <Container1>
                        <div style={{fontSize:"55px"}}>
                            <h2>버튼들과 상호작용하여 연습해보세요</h2>
                        </div>
                    </Container1>
                </Section>

                <Section>
                    <Container1>
                        <MainBox1>
                            <CreateBox1>
                                <CreateBox2>
                                    <img width="256" height="256" src="https://img.icons8.com/windows/256/home.png" alt="home" />
                                </CreateBox2>
                                <CreateBox3>
                                    <MainButton onClick={handleModalOpen}>방생성</MainButton>

                                    <HelpModal2 isOpen={isModalOpen} handleClose={handleModalClose}>
                                        <p>뱅을 생성할꺼냐?</p>
                                        <OpenButton onClick={handleSecondModalOpen}>예</OpenButton>
                                        <OpenButton onClick={handleModalClose}>아니오</OpenButton>
                                    </HelpModal2>

                                    <HelpModal2
                                        isOpen={isSecondModalOpen}
                                        handleClose={handleSecondModalClose}
                                    >
                                        <p>수화 사용자이십니까?</p>
                                        <OpenButton onClick={handleSecondModalClose}>예</OpenButton>
                                        <OpenButton onClick={handleSecondModalClose}>아니오</OpenButton>
                                    </HelpModal2>
                                </CreateBox3>
                            </CreateBox1>
                            <ParticipateBox1>
                                <ParticipateBox2>
                                    <img width="256" height="225" src="https://icon-library.com/images/enter-icon-png/enter-icon-png-4.jpg" />
                                </ParticipateBox2>
                                <ParticipateBox3>
                                    <HelpModal buttonLabel="방 참가" isOpen={isModalOpen} handleClose={handleModalClose}>
                                        뱅 코드를 입력해라
                                        <input style={{display:"block", width:"100%",marginTop:"20px",height:"25px",borderWidth:"2px",borderRadius:"5px"}} >

                                        </input>
                                    </HelpModal>
                                </ParticipateBox3>
                            </ParticipateBox1>
                        </MainBox1>
                    </Container1>
                </Section>
                <Section>
                    <Container2>
                        <HangUpBox1>
                            <HangUpBox2 onClick={showConfirm}>
                                <div style={{ borderStyle: "solid", borderWidth: "5px", borderRadius: "100px", padding: "15px" }}>
                                    <img src={process.env.PUBLIC_URL + '/Images/HangUp.png'} alt='HangUp' width={80} />
                                </div>
                                통화 종료
                            </HangUpBox2>
                        </HangUpBox1>
                        <MainBox2>
                            <DevideBox1>
                                <ConverBox1>
                                    <img
                                        style={{ width: "100%", height: "100%" }}
                                        src='https://image.fmkorea.com/files/attach/new2/20220825/486616/2407582322/4958574293/a1c34755168aa750f6c27544cc4a32ab.png' />
                                </ConverBox1>
                                <ConverBox2>
                                    <img
                                        style={{ width: "100%", height: "100%" }}
                                        src='https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/4arX/image/cr9XuEQ_LA3Asy-updakmyVdwv0.jpg' />
                                </ConverBox2>
                            </DevideBox1>
                            <DevideBox2>
                                <CodeBox>

                                    <div>방 코드 : asdasdasd</div>

                                </CodeBox>
                                <TextBox>


                                    <div style={{ margin: "1px" }}>나 : &nbsp;&nbsp;나는 말한다</div>
                                    <div style={{ margin: "1px" }}>상대 : &nbsp;&nbsp;너는 말한다</div>

                                </TextBox>
                            </DevideBox2>
                        </MainBox2>
                        <TalkBox1>
                            <TalkBox2 onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                                {/* <div style={{borderStyle:"solid", borderWidth:"6px",borderRadius:"100px" , padding:"10px",width:"40%"}}> */}
                                <img src={process.env.PUBLIC_URL + '/Images/Mic3.png'} alt='Mic' width={120} />
                                {/* </div> */}
                                {isButtonPressed ? '말하는 중' : '눌러서 말하기'}
                            </TalkBox2>
                        </TalkBox1>
                    </Container2>
                </Section>
            </SectionsContainer>
        </>
    )
}
export default Help;

////////////////////// 메인페이지

let Container1 = styled.div`  //가장 큰거 담는 부분 섹션1
    display: flex;
    background-color: white;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;
    min-width: 1240px;
    min-height: 600px;
`

let MainBox1 = styled.div`  //메인박스1
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

let MainButton = styled.button` //버튼 형태

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
//////////////////여기서부터 대화방


let Container2 = styled.div`  //가장 큰거 담는 부분2
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


let MainBox2 = styled.div`  //메인박스2
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