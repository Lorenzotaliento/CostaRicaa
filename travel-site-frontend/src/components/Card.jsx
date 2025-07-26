import React, { useState, useRef, useEffect } from 'react';

const Card = ({ header, content, image }) => {
  const cardRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null);

  const hoverEasing = 'cubic-bezier(0.23, 1, 0.32, 1)';
  const returnEasing = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';

  useEffect(() => {
    if (cardRef.current) {
      setWidth(cardRef.current.offsetWidth);
      setHeight(cardRef.current.offsetHeight);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (cardRef.current?.classList.contains('card-active')) return;
    if (cardRef.current) {
      setMouseX(e.pageX - cardRef.current.offsetLeft - width / 2);
      setMouseY(e.pageY - cardRef.current.offsetTop - height / 2);
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelay);
  };

  const handleMouseLeave = () => {
    const delay = setTimeout(() => {
      setMouseX(0);
      setMouseY(0);
    }, 1000);
    setMouseLeaveDelay(delay);
  };

  const mousePX = mouseX / width;
  const mousePY = mouseY / height;

  const isActive = cardRef.current?.classList.contains('card-active');
  const cardStyle = {
    transform: isActive
      ? 'scale(1.05)'
      : `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
    transition: mouseX === 0 && mouseY === 0 ? `1s ${returnEasing}` : `0.6s ${hoverEasing}`,
  };

  const cardBgTransform = {
    transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
    transition: mouseX === 0 && mouseY === 0 ? `1s ${returnEasing}, opacity 5s 1s ${returnEasing}` : `0.6s ${hoverEasing}, opacity 5s ${hoverEasing}`,
    opacity: mouseX === 0 && mouseY === 0 ? 0.5 : 0.8,
  };

  const cardBgImage = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  const cardInfoStyle = {
    transform: mouseX === 0 && mouseY === 0 ? 'translateY(40%)' : 'translateY(0)',
    transition: mouseX === 0 && mouseY === 0 ? '0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1)' : '0.6s 0s cubic-bezier(0.215, 0.61, 0.355, 1)',
  };

  const contentStyle = {
    opacity: mouseX === 0 && mouseY === 0 ? 0 : 1,
    transition: mouseX === 0 && mouseY === 0 ? '0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1)' : '0.6s 0s cubic-bezier(0.215, 0.61, 0.355, 1)',
    textShadow: 'rgba(0, 0, 0, 1) 0 2px 3px',
  };

  const cardInfoAfterStyle = {
    opacity: mouseX === 0 && mouseY === 0 ? 0 : 1,
    transform: mouseX === 0 && mouseY === 0 ? 'translateY(100%)' : 'translateY(0)',
    transition: mouseX === 0 && mouseY === 0 ? '5s 1s ${returnEasing}' : '5s 0s ${hoverEasing}',
    backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 100%)',
    backgroundBlendMode: 'overlay',
  };

  return (
    <div
      className="card-wrap"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card" style={cardStyle}>
        <div className="card-bg" style={{ ...cardBgTransform, ...cardBgImage }} />
        <div className="card-info" style={cardInfoStyle}>
          <h1 style={{ fontFamily: '"Playfair Display"', fontSize: '36px', fontWeight: '700', textShadow: 'rgba(0, 0, 0, 0.5) 0 10px 10px' }}>
            {header}
          </h1>
          <p style={contentStyle}>{content}</p>
          <div style={cardInfoAfterStyle} />
        </div>
      </div>
    </div>
  );
};

export default Card;