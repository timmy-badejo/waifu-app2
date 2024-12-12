import React from 'react';

const ResultCard = ({ image }) => {
  return (
    <div className="result-card">
      <img src={image} alt="Waifu" />
    </div>
  );
};

export default ResultCard;
