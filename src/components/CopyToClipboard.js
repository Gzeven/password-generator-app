import React, { useState } from 'react';
import styled from 'styled-components';
import ClipboardJS from 'clipboard';
import copyIcon from '../assets/images/icon-copy.svg'

const CopyIconImage = styled.img`
  height: 1.25rem;
  cursor: pointer;
  transition: filter 0.6s; // Add a transition for a smooth effect
  @media(hover: hover) and (pointer: fine) {
    &:hover {
    filter: brightness(0) invert(1); // Change the image color to white on hover
  }
  }

  @media (min-width: 768px) {
   height: 1.5rem;
    }
`;

const CopyButton = styled.button`
border: none;
background-color: var(--color-dark-grey);
display: flex;
align-items: center;



`

const CopiedText = styled.span`
  margin-right: 8px; /* Add some margin between the text and the image */
  font-size: 10px;
  color: var(--color-neon-green);

  @media (min-width: 475px) {
    font-size: 18px;
  }

`;



const CopyToClipboard = ({ password }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const clipboard = new ClipboardJS('.copy-button', {
      text: () => password,
    });

    clipboard.on('success', () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Hide the "copied" message after 2 seconds
    });
  };

  return (
    <div>
      <CopyButton className="copy-button" onClick={handleCopy}>
        {copied && <CopiedText>COPIED</CopiedText>}
        <CopyIconImage src={copyIcon} alt="Copy to Clipboard" />
      </CopyButton>
    </div>
  );
};

export default CopyToClipboard;
