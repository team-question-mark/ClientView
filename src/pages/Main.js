import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import NavBarBoot from '../components/NavBarBoot';

function Main(){

    const goRoom = () =>{
        window.location.href = "/pages/Room";
    }
    const goHelp = () =>{
        window.location.href = "/pages/Help";
    }
    const goSettings = () =>{
        window.location.href = "/pages/Settings";
    }

    return(
        <>
            <div>
                <NavBarBoot></NavBarBoot>
                <h2>메인임</h2>
                <button onClick={goRoom}>룸페이지로 이동</button>
                <button onClick={goHelp}>도움페이지로 이동</button>
                <button onClick={goSettings}>설정페이지로 이동</button>
            </div>
        </>
    )
}
export default Main;