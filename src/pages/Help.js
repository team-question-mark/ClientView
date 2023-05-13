import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'; // react에 css 바로 사용 라이브러리
import Header from '../components/Header';



//뒤로가기 이미지
{/* <img src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjIgMTIuMDAyYzAtNS41MTctNC40OC05Ljk5Ny05Ljk5OC05Ljk5Ny01LjUxNyAwLTkuOTk3IDQuNDgtOS45OTcgOS45OTcgMCA1LjUxOCA0LjQ4IDkuOTk4IDkuOTk3IDkuOTk4IDUuNTE4IDAgOS45OTgtNC40OCA5Ljk5OC05Ljk5OHptLTEuNSAwYzAgNC42OS0zLjgwOCA4LjQ5OC04LjQ5OCA4LjQ5OHMtOC40OTctMy44MDgtOC40OTctOC40OTggMy44MDctOC40OTcgOC40OTctOC40OTcgOC40OTggMy44MDcgOC40OTggOC40OTd6bS02LjcxMS00Ljg0NWMuMTQxLS4xMDguMy0uMTU3LjQ1Ni0uMTU3LjM4OSAwIC43NTUuMzA2Ljc1NS43NDl2OC41MDFjMCAuNDQ1LS4zNjcuNzUtLjc1NS43NS0uMTU3IDAtLjMxNi0uMDUtLjQ1Ny0uMTU5LTEuNTU0LTEuMjAzLTQuMTk5LTMuMjUyLTUuNDk4LTQuMjU4LS4xODQtLjE0Mi0uMjktLjM2LS4yOS0uNTkyIDAtLjIzLjEwNy0uNDQ5LjI5MS0uNTkxem0tLjI4OSA3LjU2NHYtNS40NDZsLTMuNTIyIDIuNzE4eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+"></img> */}


function Help(){
    return (
        <>
            <Header />
            <Container1>
                <MainBox>
                    <CreateBox1>
                        <CreateBox2>
                            <img width="256" height="256" src="https://img.icons8.com/windows/256/home.png" alt="home" />
                            {/* <img src={process.env.PUBLIC_URL + '/Images/Home.png'} alt='Home'/> */}
                        </CreateBox2>
                        <CreateBox3>
                            <MainButton>방 생성</MainButton>
                        </CreateBox3>
                    </CreateBox1>
                    <ParticipateBox1>
                        <ParticipateBox2>
                            <img width="256" height="225" src="https://icon-library.com/images/enter-icon-png/enter-icon-png-4.jpg" />
                        </ParticipateBox2>
                        <ParticipateBox3>
                            <MainButton>방 참가</MainButton>
                        </ParticipateBox3>
                    </ParticipateBox1>
                </MainBox>
            </Container1>
        </>
    )
}
export default Help;


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
