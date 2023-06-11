import React from 'react';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import Header from '../components/Header';
import { SectionsContainer, Section } from 'react-fullpage'; //풀페이지 스크롤 라이브러리

function Informaiton(){

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


    return(
        <>
            <div>
                <Header></Header>
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
                        <div style={{fontSize:"55px"}}>
                            <h2>버튼들과 상호작용하여 연습해보세요</h2>
                        </div>
                    </Container1>
                </Section>
                <Section>
                    <Container1>
                        <div style={{fontSize:"55px"}}>
                            <h2>버튼들과 상호작용하여 연습해보세요</h2>
                        </div>
                    </Container1>
                </Section>
                </SectionsContainer>
            </div>
        </>
    )
}
export default Informaiton;



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