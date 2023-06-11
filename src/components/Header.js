import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


function Header() {


  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 페이지 스크롤 값이 0보다 크면 스크롤된 상태로 설정하고,
    // 0보다 작거나 같으면 스크롤되지 않은 상태로 놓음
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // 스크롤하면 handleScroll 함수를 실행함
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 삭제함
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const goHome = () => {
    window.location.href = "/";
  };

  const goHelp = () => {
    window.location.href = '/pages/Help';
  };

  const goInformation = () => {
    window.location.href = '/pages/Informaiton';
  };

  // 대화방이라 지워야함
  const goRoom = () => {
    window.location.href = '/pages/Room';
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <Container>
        <TEXT onClick={goHome}>팀 물음표</TEXT>
        <HeaderUl>
          <HeaderLi onClick={goHome}>Home</HeaderLi>
          <HeaderLi onClick={goHelp}>Help</HeaderLi>
          <HeaderLi onClick={goInformation}>Information</HeaderLi>
          {/* <HeaderLi onClick={goRoom}>대화방확인</HeaderLi> */}
        </HeaderUl>
      </Container>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ scrolled }) => (scrolled ? '#fff' : 'transparent')};
  z-index: 9999;
`;

const Container = styled.nav`
  display: flex;
  height: 80px;
  width: 100;
  min-width: 1240px;
  background: white;
  align-items: center;
  padding: 0 50px 0 100px;
  flex-wrap: wrap;
  pointer-events: auto;
`;

const HeaderUl = styled.div`
  margin-left: 10%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-top: 1%;
`;

const HeaderLi = styled.div`
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

const TEXT = styled.div`
  margin-top: 0.5%;
  color: black;
  font-size: 34px;
  font-weight: 600;
  margin-left: -40px;
  cursor: pointer;
`;
