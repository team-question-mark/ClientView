// import React from "react";
// import styled from "styled-components";



// function Modal(props) {
//   const handleCloseClick = () => {
//     if (props.onClose) {
//       props.onClose();
//     }
//   };

//   return (
//     <ModalOverlay>
//       <ModalWrapper>
//         <CloseButton onClick={handleCloseClick}>&times;</CloseButton>
//         {props.children}
//       </ModalWrapper>
//     </ModalOverlay>
//   );
// }

// export default Modal;

// const ModalOverlay = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
// `;

// const ModalWrapper = styled.div`
//   position: relative;
//   background-color: #fefefe;
//   padding: 20px;
//   border: 1px solid #888;
//   max-width: 500px;
//   width: 80%;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   font-size: 20px;
//   font-weight: bold;
//   color: #888;
//   background-color: transparent;
//   border: none;
//   cursor: pointer;

//   &:hover {
//     color: #000;
//   }
// `;

// import React, { useState } from 'react';
// import styled from 'styled-components';

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.6);
//   display: ${props => (props.isOpen ? 'block' : 'none')};
//   z-index: 9999;
// `;

// const ModalWrapper = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 50%;
//   max-width: 600px;
//   background-color: white;
//   border-radius: 10px;
//   padding: 20px;
//   box-sizing: border-box;
//   display: ${props => (props.isOpen ? 'block' : 'none')};
//   z-index: 10000;

//   @media screen and (max-width: 768px) {
//     width: 80%;
//   }
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   border: none;
//   background-color: transparent;
//   font-size: 20px;
//   cursor: pointer;
// `;

// const ModalContent = styled.div`
//   padding: 20px;
//   font-size: 24px;
// `;

// function Modal(props) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <button onClick={handleOpen}>Open Modal</button>
//       <ModalOverlay isOpen={isOpen}>
//         <ModalWrapper isOpen={isOpen}>
//           <CloseButton onClick={handleClose}>&times;</CloseButton>
//           <ModalContent>{props.children}</ModalContent>
//         </ModalWrapper>
//       </ModalOverlay>
//     </>
//   );
// }

// export default Modal;

// import React, { useState } from 'react';
// import styled from 'styled-components';

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.6);
//   display: ${props => (props.isOpen ? 'block' : 'none')};
//   z-index: 9999;
// `;

// const ModalWrapper = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 50%;
//   max-width: 600px;
//   background-color: white;
//   border-radius: 10px;
//   padding: 20px;
//   box-sizing: border-box;
//   display: ${props => (props.isOpen ? 'block' : 'none')};
//   z-index: 10000;

//   @media screen and (max-width: 768px) {
//     width: 80%;
//   }
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   border: none;
//   background-color: transparent;
//   font-size: 20px;
//   cursor: pointer;
// `;

// const ModalContent = styled.div`
//   padding: 20px;
//   font-size: 24px;
// `;

// function Modal(props) {
//   const [isOpen, setIsOpen] = useState(true); // isOpen을 true로 초기화

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <ModalOverlay isOpen={isOpen}>
//         <ModalWrapper isOpen={isOpen}>
//           <CloseButton onClick={handleClose}>&times;</CloseButton>
//           <ModalContent>{props.children}</ModalContent>
//         </ModalWrapper>
//       </ModalOverlay>
//     </>
//   );
// }

// export default Modal;

// import React, { useState } from 'react';
// import styled from 'styled-components';

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.6);
//   display: ${props => (props.isOpen ? 'block' : 'none')};
//   z-index: 9999;
// `;

// const ModalWrapper = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 50%;
//   max-width: 600px;
//   background-color: white;
//   border-radius: 10px;
//   padding: 20px;
//   box-sizing: border-box;
//   display: ${props => (props.isOpen ? 'block' : 'none')};
//   z-index: 10000;

//   @media screen and (max-width: 768px) {
//     width: 80%;
//   }
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   border: none;
//   background-color: transparent;
//   font-size: 20px;
//   cursor: pointer;
// `;

// const ModalContent = styled.div`
//   padding: 20px;
//   font-size: 24px;
// `;

// let MainButton = styled.button` //버튼 형태

//     border-width: 0;
//     border-radius: 18px;
//     background-color: white;
//     padding: 10px 30px;
//     font-size: 55px;
//     font-weight: bold;

//     &:hover {
//     background: black;
//     color: white;
//     transition: 0.25s;
//     }
//     cursor: pointer;
// `

// function Modal(props) {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       <MainButton onClick={handleOpen}>Open Modal</MainButton>
//       <ModalOverlay isOpen={isOpen}>
//         <ModalWrapper isOpen={isOpen}>
//           <CloseButton onClick={handleClose}>&times;</CloseButton>
//           <ModalContent>{props.children}</ModalContent>
//         </ModalWrapper>
//       </ModalOverlay>
//     </>
//   );
// }

// export default Modal;

import React, { useState } from 'react';
import styled from 'styled-components';


function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MainButton onClick={handleOpen}>{props.buttonLabel}</MainButton>
      <ModalOverlay isOpen={isOpen}>
        <ModalWrapper isOpen={isOpen}>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
          <ModalContent>{props.children}</ModalContent>
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
}

export default Modal;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  max-width: 600px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  z-index: 10000;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 20px;
  font-size: 24px;
`;

const MainButton = styled.button`
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
`;