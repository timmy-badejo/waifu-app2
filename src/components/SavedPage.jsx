import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './SavedPage.css';

const SavedPage = () => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('savedItems')) || [];
    setSavedItems(items);
  }, []);

  const handleRemove = (id) => {
    const updatedItems = savedItems.filter((item) => item.id !== id);
    setSavedItems(updatedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));
  };

  useEffect(() => {
    gsap.fromTo(
      '.saved-card',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, [savedItems]);

  return (
    <div className="saved-page">
      <h1>Your Saved Favourites</h1>
      {savedItems.length === 0 ? (
        <div className="empty-state">
          <p>No items saved yet. Start exploring and save your favourites!</p>
          <Link to="/" className="explore-btn">
            Explore Now
          </Link>
        </div>
      ) : (
        <div className="saved-grid">
          {savedItems.map((item) => (
            <div key={item.id} className="saved-card">
              <img src={item.url} alt={item.name} className="saved-image" />
              <div className="saved-content">
                <h3>{item.name}</h3>
                <button onClick={() => handleRemove(item.id)} className="remove-btn">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;




//LocalStorage: Loads and updates saved items persistently across sessions.
// Remove Button: Removes items dynamically and updates storage.
//Placement:

//Add the useEffect hook below the useState and useEffect that initializes the saved items but above the handleRemove function for better organization.

//Trigger:
// The animation is triggered whenever the savedItems list changes. This happens when an item is added or removed.

//Target:The gsap.fromTo function targets .save-btn (the class for your "Remove" button), adding a scaling animation effect.

// Dependencies:[savedItems] ensures the animation is re-applied only when the savedItems array changes.
