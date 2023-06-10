import React from 'react';
import styled from 'styled-components';

function Modal2({ children, isOpen, handleClose }) {
    return (
      <>
        <ModalOverlay isOpen={isOpen}>
          <ModalWrapper isOpen={isOpen}>
            <CloseButton onClick={handleClose}>&times;</CloseButton>
            <ModalContent>{children}</ModalContent>
          </ModalWrapper>
        </ModalOverlay>
      </>
    );
  }
  
  export default Modal2;
  
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