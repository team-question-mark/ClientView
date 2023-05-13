import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import Header from '../components/Header';



function Room() {
    return (
        <div style={{width:"100", height:"100vh"}}>
            <Header />
            <Container>
                <HangUpBox1>
                    <HangUpBox2>
                        <div style={{ borderStyle: "solid", borderWidth: "5px", borderRadius: "100px", padding: "15px" }}>
                            <img src={process.env.PUBLIC_URL + '/Images/HangUp.png'} alt='HangUp' width={80} />
                        </div>
                        통화 종료
                    </HangUpBox2>
                </HangUpBox1>
                <MainBox>
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

                </MainBox>
                <TalkBox1>
                    <TalkBox2>
                        {/* <div style={{borderStyle:"solid", borderWidth:"6px",borderRadius:"100px" , padding:"10px",width:"40%"}}> */}
                        <img src={process.env.PUBLIC_URL + '/Images/Mic3.png'} alt='Mic' width={120} />
                        {/* </div> */}
                        눌러서 말하기
                    </TalkBox2>
                </TalkBox1>


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