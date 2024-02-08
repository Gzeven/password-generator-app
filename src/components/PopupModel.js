import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: ${(props) => (props.$isVisible ? 'block' : 'none')};
  z-index: 999; /* Adjust the z-index as needed */
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-dark-grey);
  color: var(--color-almost-white);
  padding: 1.25rem;
  border-radius: 0.25rem;
  
  /* Add other styles for your modal content */
`;

const ModalButton = styled.button`
border: none;
margin-top: 1rem;
height: 3.5rem;
width: 100%;
background-color: var(--color-neon-green);
color: var(--color-dark-grey);
font-size: 1rem;
cursor: pointer;

`


const Modal = ({ isVisible, message, onClose }) => {
    return (
    
        <ModalBackground  $isVisible={isVisible} >
          <ModalContent>
            <p>{message}</p>
            <ModalButton onClick={onClose}>CLOSE</ModalButton>
          </ModalContent>
        </ModalBackground>
      
    );
  };

  export default Modal;