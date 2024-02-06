import React from "react";
import { useState } from "react";

const imagesContext = require.context('../public/assets/cardFronts', false, /\.(png|jpe?g|svg)$/);
const cardImages = imagesContext.keys().map(imagesContext);
const imagesContextCover = require.context('../public/assets', false, /\.(png|jpe?g|svg)$/);
const coverImg = imagesContextCover.keys().map(imagesContextCover);

const Card = ({card, handleCardClick}) => {
  const { src, id, turned } = card;

  return (
    <div className="card">
      {
        turned ? 
          <img src={src} className="front" key={id}/>
          : 
          <img src={coverImg} alt="cover image" className="cover" key={id} onClick={() => handleCardClick(id)} />
      }
  </div>
  );
};

const App = () => {
  const [currentCards, setCurrentCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const handleCardClick = (key) => {
    console.log("handleCardClick() runs", key);

    let newCards = [...currentCards];
    for (const card of newCards) {
      if (card.id === key) {
        console.log("card.id === key");
        card.turned = true;
      }
    }

    console.log("newCards: ", newCards);
    // update currentCards and their state
    setCurrentCards(newCards);
  };

  const generateShuffledCards = () => {
    let cards = [...cardImages, ...cardImages]
      .sort(() => {
        // Randomly sort cards
        return Math.random() - 0.5;
      })
      .map(card => {
        console.log("card in App: ", card);
        return {
          src: card,
          id: Math.random(),
          turned: false
      }});
      
      setCurrentCards(cards);
  };

  /*
  on generating shuffled cards:
    cards all show cover
    for each card:
      on click:
        change state turned to true
  */

  
  return (
    <div className="App">
      <h1 className="memory-game-headline">Memory Game</h1>
      <button 
        className="new-game-btn"
        onClick={generateShuffledCards}>New Game</button>
      <div className="memory-board">
        {
          currentCards.map(card =>
            <Card 
              card={card}
              handleCardClick={handleCardClick}
            />
          )
        }
      </div>
    </div>
  );
};

export default App;