import React from 'react';
import './ResultCard.css';

const ResultCard = ({ image, name }) => {
  return (
    <div className="result-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default ResultCard;
