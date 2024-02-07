import React from "react";

const imagesContextCover = require.context('../../public/assets', false, /\.(png|jpe?g|svg)$/);
const coverImg = imagesContextCover.keys().map(imagesContextCover);

const Card = ({card, handleCardClick}) => {
  const { src, id, turned } = card;

  return (
    <div className="card">
      {
        turned ? 
          <img src={src} className="front"/>
          : 
          <img src={coverImg} alt="cover image" className="cover" onClick={() => handleCardClick(id)} />
      }
  </div>
  );
};

export default Card;