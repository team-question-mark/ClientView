import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import Header from '../components/Header';


function Informaiton(){
    return(
        <>
            <div>
                <Header></Header>
                <h2>인포창임</h2>
            </div>
        </>
    )
}
export default Informaiton;