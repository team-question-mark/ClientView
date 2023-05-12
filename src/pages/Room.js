import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import NavBarBoot from '../components/NavBarBoot';



function Room(){
    return(
        <>
            <div>
                <NavBarBoot></NavBarBoot>
                <h2>대화방임</h2>
            </div>
        </>
    )
}
export default Room;