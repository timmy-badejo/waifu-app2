import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const [savedItems, setSavedItems] = useState(
    JSON.parse(localStorage.getItem('savedItems')) || []
  );

  const handleSave = () => {
    const newItem = { id, image: `https://api.waifu.pics/sfw/waifu/${id}` };
    const updatedItems = [...savedItems, newItem];
    setSavedItems(updatedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="detail-page">
      <h1>Waifu Detail</h1>
      <img src={`https://api.waifu.pics/sfw/waifu`} alt="Waifu" />
      <button onClick={handleSave}>Save to Favourites</button>
    </div>
  );
};

export default DetailPage;
