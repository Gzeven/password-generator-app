import React, { useState } from 'react';
import styled from 'styled-components';
import secureRandomPassword from 'secure-random-password';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import CopyToClipboard from './CopyToClipboard';
import Modal from './PopupModel';
import Checkbox from './CheckBox';
import { ReactComponent as Arrow } from '../assets/images/icon-arrow-right.svg';


const PasswordGeneratorContainer = styled.div`
background-color: var(--color-very-dark-grey);
padding: 64px 16px;
height: 100vh;
max-width: 540px;
margin: 0 auto;
`

const GeneratedPassword = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 16px;
  height: 64px;
  background-color: var(--color-dark-grey);
  color: var(--color-almost-white);
  margin: 16px 0;
  font-size: 18px;
  @media (min-width: 475px) {
    font-size: 24px;
  }


  @media (min-width: 768px) {
    margin: 32px 0 24px;
    padding-inline: 32px;
    font-size: 32px;
    }
    
`;

const PasswordContainer = styled.div`
  background-color: var(--color-dark-grey);
  padding: 16px;
  @media (min-width: 768px) {
    padding: 24px 32px;
 
    }
`;

const PasswordSliderText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-almost-white); // Text color to white
  margin-bottom: 8px;
  span {
    color: var(--color-neon-green); // Variable color to green
    font-size: 24px;
  }
  label {
    text-align: left; // Align text to the left
    font-size: 16px;
  }
  span {
    text-align: right; // Align variable to the right
  }
  @media (min-width: 768px) {
    margin-bottom: 16px;
    label {
    font-size: 18px;
  }
    span {
    
    font-size: 32px;
  }
    }
`;

const PasswordSlider = styled.input`
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, var(--color-neon-green) ${(props) => (props.value / 20) * 100}%, var(--color-very-dark-grey) ${(props) => (props.value / 20) * 100}%); /* Green track color */
  border: none; /* Remove the default border */
  appearance: none;
  -webkit-appearance: none; /* Remove default styles for WebKit browsers */
  
  
  &::-webkit-slider-thumb {
    appearance: none;
    height: 28px;
    width: 28px;
    background: var(--color-almost-white);
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
    cursor: pointer;
    transition: all 0.6s;
    @media(hover: hover) and (pointer: fine) {
      &:hover {
      
      background-color: var(--color-very-dark-grey);
      border: 2px solid var(--color-neon-green);
  
    }

    }
 
    
  }

  &::-moz-range-thumb {
    appearance: none;
    height: 28px;
    width: 28px;
    background: var(--color-almost-white);
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
    cursor: pointer;
    transition: all 0.6s;
    @media(hover: hover) and (pointer: fine) {
      &:hover {
      
      background-color: var(--color-very-dark-grey);
      border: 2px solid var(--color-neon-green);
    
    }
    }
    
   
  }

  &::-ms-thumb {
    appearance: none;
    height: 28px;
    width: 28px;
    background: var(--color-almost-white);
    border-radius: 100%;
    border: 0;
    transition: background-color 150ms;
    cursor: pointer;
    transition: all 0.6s;
    @media(hover: hover) and (pointer: fine) {
      &:hover {
      
      background-color: var(--color-very-dark-grey);
      border: 2px solid var(--color-neon-green);
    
    }
    }
   
    
  }


  &::-webkit-slider-thumb {
    position: relative;
  }

  &::-moz-range-thumb {  
    margin: 0;  
  }

  &::-ms-thumb {
    top: 0;
    margin: 0;
    box-shadow: none;
  }

`;

const CheckBoxContainer = styled.div`
margin: 32px 0;
`

const GeneratedPasswordButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
border: none;
margin-top: 16px;
height: 56px;
width: 100%;
background-color: var(--color-neon-green);
color: var(--color-dark-grey);
font-size: 16px;
font-weight: 700;
cursor: pointer;
transition: all 0.6s;
svg {
  margin-left: 20px;
  height: 14px;
}

@media(hover: hover) and (pointer: fine) {
  &:hover {
  border: 2px solid var(--color-neon-green);
  background-color: var(--color-dark-grey);
  color: var(--color-neon-green);
  svg {
  path {
  fill: ${({hovercolor}) => hovercolor || 'var(--color-neon-green)'};
}
 }
  }

}



@media (min-width: 768px) {
    margin-top: 32px;
    height: 65px;
   }
`





const PasswordGenerator = () => {
  // Initialize state to hold the generated password and other option states
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [characterLength, setCharacterLength] = useState(0); // Default length
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to generate a password
  const generatePassword = () => {
    // Define characters based on inclusion options
    const characters = [
      ...(includeUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''),
      ...(includeLowercase ? 'abcdefghijklmnopqrstuvwxyz' : ''),
      ...(includeNumbers ? '0123456789' : ''),
      ...(includeSymbols ? '!@#$%^&*()_+[]{}|;:,.<>?~' : ''),
    ].join('');

    if (characterLength < 1 || characters.length === 0 ) {
        // Conditions not met, show the modal
        toggleModal();
        return;
    }
    // Generate the password
    const password = secureRandomPassword.randomPassword({
      length: characterLength,
      characters,
    });

    // Set the generated password in state
    setGeneratedPassword(password);
  };


  return (
    <PasswordGeneratorContainer>
    <h1>Password Generator</h1>
      {generatedPassword ? (
        <GeneratedPassword characterLength={characterLength}>{generatedPassword} <CopyToClipboard password={generatedPassword} /> {/* Use the CopyToClipboard component */}</GeneratedPassword>
      ) : (
        <GeneratedPassword> <h4>P4$5W0rD!</h4> <CopyToClipboard/> </GeneratedPassword>
      )}
    
    <PasswordContainer>
    <label>
    <PasswordSliderText>
    <label>Character Length:</label>
    <span>{characterLength}</span>
  </PasswordSliderText>
   
    <PasswordSlider
  type="range"
  min="0"
  max="20"
  value={characterLength} // Pass the characterLength as the value
  onChange={(e) => setCharacterLength(parseInt(e.target.value))}
/>
  </label>
  <CheckBoxContainer>
  <Checkbox
  checked={includeUppercase}
  onChange={() => setIncludeUppercase(!includeUppercase)}
  label="Include Uppercase Letters"
/>
<Checkbox
checked={includeLowercase}
onChange={() => setIncludeLowercase(!includeLowercase)}
label="Include Lowercase Letters"
/>
<Checkbox
checked={includeNumbers}
onChange={() => setIncludeNumbers(!includeNumbers)}
label="Include Numbers"
/>
<Checkbox
checked={includeSymbols}
onChange={() => setIncludeSymbols(!includeSymbols)}
label="Include Symbols"
/>
</CheckBoxContainer>
  <PasswordStrengthMeter password={generatedPassword} />

  <GeneratedPasswordButton onClick={generatePassword}>GENERATE <Arrow />  </GeneratedPasswordButton>
    </PasswordContainer>
     
     
      <Modal isVisible={isModalVisible} message="Please choose at least one option and set a length of at least 1." onClose={toggleModal} />
    </PasswordGeneratorContainer>
  );
};

export default PasswordGenerator;

