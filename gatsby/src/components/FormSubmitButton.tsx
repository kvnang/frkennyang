import React from 'react';
import styled, { keyframes } from 'styled-components';
import { breakpoints } from '../styles/breakpoints';

interface Props {
  loading: boolean;
  title?: string;
  icon?: React.ReactChild;
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
`;

const SubmitButtonStyles = styled.button`
  display: inline-flex;
  align-items: center;

  svg {
    color: var(--color-accent);

    path {
      fill: currentColor;
    }
  }

  .icon {
    height: 1rem;
    vertical-align: middle;
    margin-left: 0.5rem;
    margin-bottom: 6px; // compensate button padding
  }
`;

const LoadingDivStyles = styled.div`
  height: 2rem;
  width: 2rem;

  @media ${breakpoints.tablet} {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(0, -50%);
  }
`;

const LoadingSvgStyles = styled.svg`
  height: 2rem;
  width: 2rem;
  animation: ${rotate} 1s ease infinite;
`;

export default function FormSubmitButton({ loading, title, icon }: Props) {
  return (
    <SubmitButtonStyles
      type="submit"
      className="button"
      disabled={loading}
      style={{
        position: 'relative',
      }}
    >
      <span>{title || 'Send'}</span>
      {icon && <span className="icon">{icon}</span>}
      {loading && (
        <LoadingDivStyles style={{ height: '2rem', width: '2rem' }}>
          <LoadingSvgStyles
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" />
          </LoadingSvgStyles>
        </LoadingDivStyles>
      )}
    </SubmitButtonStyles>
  );
}
