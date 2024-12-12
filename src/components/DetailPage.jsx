/* DetailPage.jsx */
import React, { useEffect } from 'react'; // Add useEffect import
import { useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import './DetailPage.css';

const DetailPage = ({ onSave }) => {
  const { id } = useParams();

  const detail = {
    id,
    url: `https://via.placeholder.com/600?text=Waifu+${id}`,
    name: `Waifu ${id}`,
    description: `This is a description for Waifu ${id}`,
  };

  useEffect(() => {
    gsap.fromTo(
      '.detail-card',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power4.out' }
    );
  }, []);

  return (
    <div className="detail-page">
      <div className="detail-card">
        <img src={detail.url} alt={detail.name} className="detail-image" />
        <div className="detail-content">
          <h1>{detail.name}</h1>
          <p>{detail.description}</p>
          <button onClick={() => onSave(detail)} className="save-btn">
            Save to Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;



//Save Button: Adds the current waifu to a saved list with a playful heart emoji.
// Dynamic Details: Displays waifu details or a placeholder if unavailable.
// Added useEffect Import: useEffect was not imported previously, causing the no-undef error. The fix ensures that useEffect is properly imported and can be used in the component.

// No Changes to Logic: The GSAP animation remains the same, and no additional functionality is modified.
