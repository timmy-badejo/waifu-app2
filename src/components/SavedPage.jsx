import React, { useState } from 'react';

const SavedPage = () => {
  const [savedItems, setSavedItems] = useState(
    JSON.parse(localStorage.getItem('savedItems')) || []
  );

  const handleRemove = (id) => {
    const updatedItems = savedItems.filter((item) => item.id !== id);
    setSavedItems(updatedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="saved-page">
      <h1>Saved Favourites</h1>
      <div className="saved-grid">
        {savedItems.map((item) => (
          <div key={item.id} className="saved-item">
            <img src={item.image} alt="Saved Waifu" />
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPage;
