import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  margin-bottom: 16px;
  @media (min-width: 768px) {
    margin-bottom: 20px;
   }
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxCheckmark = styled.div`
  width: 20px;
  height: 20px;
  border: ${(props) => (props.checked ? '2px solid var(--color-neon-green)' : '2px solid var(--color-almost-white)')}; 
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  background-color: ${(props) => (props.checked ? 'var(--color-neon-green)' : 'transparent')};

  &:hover {
    border-color: var(--color-neon-green);
  }

  @media (min-width: 768px) {
    margin-right: 24px;
   }
`;

const CheckboxLabel = styled.span`
  font-size: 16px;
  color: var(--color-almost-white);
  @media (min-width: 768px) {
    font-size: 18px;
   }
`;

const Checkbox = ({ checked, onChange, label }) => {
  return (
    <CheckboxContainer>
      <CheckboxInput type="checkbox" checked={checked} onChange={onChange} />
      <CheckboxCheckmark checked={checked}>
        {checked &&    <svg
          className={`checkbox ${checked ? 'checkbox--active' : ''}`}
          aria-hidden="true"
          viewBox="0 0 15 13"
          fill="none"
        >
          <path
            d="M2 6.60659L5.39341 10L13.3934 2"
            strokeWidth="3"
            stroke={checked ? 'var(--color-very-dark-grey)' : 'none'}
          />
        </svg>}


      </CheckboxCheckmark>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

export default Checkbox;
