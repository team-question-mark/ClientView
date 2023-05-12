import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import NavBarBoot from '../components/NavBarBoot';


function Help(){
    return(
        <>
            <div>
                <NavBarBoot></NavBarBoot>
                <h2>헬프창임</h2>
            </div>
        </>
    )
}
export default Help;