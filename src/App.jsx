import React from "react";
import { useState } from "react";
import Card from "./components/Card.jsx";

const imagesContext = require.context('../public/assets/cardFronts', false, /\.(png|jpe?g|svg)$/);
const cardImages = imagesContext.keys().map(imagesContext);

const App = () => {
  const [currentCards, setCurrentCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const handleCardClick = (key) => {
    console.log("handleCardClick() runs", key);

    // If 2 cards are turned, turn them face-down again before turning the clicked card face-up
    if (turns > 1) {
      const turnedCards = [...currentCards];
      turnedCards.forEach(card => card.turned = false);
      setCurrentCards(turnedCards);
      setTurns(0);
    }

    let newCards = [...currentCards];
    for (const card of newCards) {
      if (card.id === key) {
        console.log("card.id === key");
        card.turned = true;
        setTurns(turns => turns + 1);
        break;
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

  return (
    <div className="App">
      <h1 className="memory-game-headline">Memory Game</h1>
      <button 
        className="new-game-btn"
        onClick={generateShuffledCards}
      >New Game</button>
      <div className="memory-board">
        {
          currentCards.map(card =>
            <Card 
              card={card}
              handleCardClick={handleCardClick}
              key={card.id}
            />
          )
        }
      </div>
    </div>
  );
};

export default App;