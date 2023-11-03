import React from 'react';
import zxcvbn from 'zxcvbn';
import styled from 'styled-components';

const StrengthMeterContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-very-dark-grey);
  height: 56px;
  padding: 0 16px;
  @media (min-width: 768px) {
    height: 72px;
    padding: 0 32px;
    margin-top: 32px;
   }
`;

const StrengthBarsContainer = styled.div`
   display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 8px; // Create a gap between bars
`;

const StrengthText = styled.h1`
/* justify-content: flex-start; */
color: var(--color-grey);
font-size: 16px;
@media (min-width: 768px) {
   font-size: 18px;
   }
`


const StrengthIndication = styled.h2`
color: var(--color-almost-white);
font-size: 16px;
margin-right: 8px;
@media (min-width: 768px) {
    font-size: 24px;
   }
`

const StrengthBar = styled.div`
  width: 10px;
  height: 28px;
  border: 1px solid ${({ $strengthColor }) => $strengthColor || 'var(--color-almost-white)'};
  background-color: ${({ $strengthColor }) => $strengthColor};
 
`;

const PasswordStrengthMeter = ({ password }) => {
  const bars = [0, 0, 0, 0]; // Create an array to represent the four bars
  let strenghtText = '';
  
  if(password) {
    bars[0] = 'var(--color-red)';
    const result = zxcvbn(password);
    const strength = result.score; // A score from 0 to 4
  
    switch (strength) {
        case 0:
        bars[0] = 'var(--color-red)';
        strenghtText="TOO WEAK!"
        break;
      case 1:
        bars[0] = 'var(--color-red)';
        strenghtText="TOO WEAK!"
        break;
      case 2:
        bars[0] = 'var(--color-orange)';
        bars[1] = 'var(--color-orange)';
        strenghtText="WEAK"
        break;
      case 3:
        bars[0] = 'var(--color-yellow)';
        bars[1] = 'var(--color-yellow)';
        bars[2] = 'var(--color-yellow)';
        strenghtText="MEDIUM"
        break;
      case 4:
        bars[0] = 'var(--color-neon-green)';
        bars[1] = 'var(--color-neon-green)';
        bars[2] = 'var(--color-neon-green)';
        bars[3] = 'var(--color-neon-green)';
        strenghtText="STRONG"
        break;
      default:
        break;
    }

}


    return (
        <StrengthMeterContainer>
        <StrengthText> STRENGTH</StrengthText>
        <StrengthBarsContainer>
        <StrengthIndication>{strenghtText}</StrengthIndication>
        
        {bars.map((barColor, index) => (
          <StrengthBar key={index} $strengthColor={barColor} />
        ))}
       
       
      </StrengthBarsContainer>
        </StrengthMeterContainer>
      );
    };

  export default PasswordStrengthMeter;




