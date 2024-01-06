// BackgroundAnimation.js
import React from 'react';
import './Background.css';

const BackgroundAnimation = () => {
  return (
    <div className="background-animation">
      {/* Generating squares dynamically */}
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} className={`square square${index + 1}`} />
      ))}
    </div>
  );
}

export default BackgroundAnimation;
