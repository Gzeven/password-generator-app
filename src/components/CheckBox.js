import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    margin-bottom: 1.25rem;
   }
`;

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxCheckmark = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border: ${(props) => (props.checked ? '2px solid var(--color-neon-green)' : '2px solid var(--color-almost-white)')}; 
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.25rem;
  background-color: ${(props) => (props.checked ? 'var(--color-neon-green)' : 'transparent')};

  &:hover {
    border-color: var(--color-neon-green);
  }

  @media (min-width: 768px) {
    margin-right: 24px;
   }
`;

const CheckboxLabel = styled.span`
  font-size: 1rem;
  color: var(--color-almost-white);
  @media (min-width: 768px) {
    font-size: 1.125rem;
   }
`;

const Checkbox = ({id, checked, onChange, label }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onChange(); // Toggle checkbox
    }
  };
  return (
    <CheckboxContainer htmlFor={id} tabIndex="0" onKeyDown={handleKeyPress}>
      <CheckboxInput id={id} type="checkbox" checked={checked} onChange={onChange} tabIndex={0} />
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
