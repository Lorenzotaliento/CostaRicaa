import React, { useEffect } from 'react';
import styled from 'styled-components';

const CardAlert = ({ type = 'success', title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <StyledWrapper type={type}>
      <div className="modern-alert-message" role="alert" aria-live="assertive" aria-atomic="true">
        <button className="close-btn" aria-label="Close alert" onClick={onClose}>
          &times;
        </button>
        <div className="icon-wrapper">
          <svg
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="alert-icon"
          >
            {type === 'success' ? (
              <>
                <path d="M9 12l2 2 4-4" />
                <circle r={10} cy={12} cx={12} />
              </>
            ) : (
              <path d="M6 6L18 18M6 18L18 6" />
            )}
          </svg>
        </div>
        <div className="text-wrapper">
          <div className="title">{title}</div>
          <div className="message">{message}</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .modern-alert-message {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    background: ${({ type }) =>
      type === 'success'
        ? 'rgba(0, 198, 255, 0.2)'
        : 'rgba(255, 75, 75, 0.2)'};
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    color: white;
    font-family: 'Raleway', Arial, sans-serif;
    font-weight: 600;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    animation: slideIn 0.5s ease-in-out;
  }

  .modern-alert-message:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 35px rgba(31, 38, 135, 0.6);
  }

  .close-btn {
    position: absolute;
    top: 12px;
    right: 20px;
    background: none;
    border: none;
    font-size: 28px;
    color: white;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    font-weight: 700;
    user-select: none;
  }

  .close-btn:hover {
    opacity: 1;
  }

  .icon-wrapper {
    background-color: rgba(255, 255, 255, 0.15);
    padding: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }

  .alert-icon {
    width: 36px;
    height: 36px;
  }

  .text-wrapper .title {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 4px;
    color: #fff;
    opacity: 1;
  }

  .text-wrapper .message {
    font-size: 15px;
    color: #fff;
    opacity: 1;
  }

  .modern-alert-message::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0)
    );
    transform: rotate(45deg);
    transition: all 0.5s ease-in-out;
    pointer-events: none;
    z-index: 0;
  }

  .modern-alert-message:hover::before {
    transform: rotate(90deg);
    opacity: 0.5;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export default CardAlert;