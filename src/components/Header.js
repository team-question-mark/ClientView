import React from 'react';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import { Link } from 'react-router-dom';


function Header() {



  const goHome = () => {
    window.location.href = "/";
  }
  const goHelp = () => {
    window.location.href = '/pages/Help';
  }
  const goSttings = () => {
    window.location.href = '/pages/Settings';
  }
  const goInformation = () => {
    window.location.href = '/pages/Informaiton';
  }

  //대화방이라 지워야함
  const goRoom = () => {
    window.location.href = '/pages/Room';
  }



  return (
    <div style={{position:"sticky",top:0}}>
      <Container>
        <TEXT onClick={goHome}>팀 물음표</TEXT>
        <HeaderUl>
          <HeaderLi onClick={goHome}>Home</HeaderLi>
          <HeaderLi onClick={goHelp} >Help</HeaderLi>
          <HeaderLi onClick={goSttings}>Settings</HeaderLi>
          <HeaderLi onClick={goInformation}>Information</HeaderLi>

          <HeaderLi onClick={goRoom}>대화방확인</HeaderLi>
        </HeaderUl>
      </Container>  
    </div>
  );
}

export default Header;


let Container = styled.nav`  //가장 큰거 담는 부분
  display: flex;
  height: 80px;
  width: 100;
  //margin-top: 10px;
  min-width: 1240px;
  background: white;
  align-items: center;
  //justify-content: space-between;
  padding: 0 50px 0 100px;
  flex-wrap: wrap;
`
let HeaderUl = styled.div`  //메뉴 영역

  margin-left: 10%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-top: 1%;
`
let HeaderLi = styled.div` //메뉴 글자모양
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
`

let TEXT = styled.div` //팀 물음표 글자 모양
  margin-top: 0.5%;
  color: black;
  font-size: 34px;
  font-weight: 600;
  margin-left: -40px;
  cursor: pointer;
`


