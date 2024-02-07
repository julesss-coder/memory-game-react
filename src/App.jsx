import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import Card from "./components/Card.jsx";

const imagesContext = require.context('../public/assets/cardFronts', false, /\.(png|jpe?g|svg)$/);
const cardImages = imagesContext.keys().map(imagesContext);

const App = () => {
  const [currentCards, setCurrentCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [points, setPoints] = useState(0);
  const [pairsFound, setPairsFound] = useState([]);


  useEffect(() => {
    // Once two cards are turned, compare them:
    if (turns === 2) {
      compareCards();
    }
  }, [turns, compareCards]);

  useEffect(() => {
    if (points === 6) {
      document.querySelector('.overlay').style.display = 'block';
    }
  }, [points]);

  const handleCardClick = (key) => {
    // If 2 cards are unequal and turned, turn them face-down again before turning the clicked card face-up
    if (turns > 1) {
      const turnedCards = [...currentCards];
      turnedCards.forEach(card => {
        if (pairsFound.includes(card.src)) {
          card.turned = true;
        } else {
          card.turned = false;
        }
      });

      setCurrentCards(turnedCards);
      setTurns(0);
    }

    let newCards = [...currentCards];
    for (const card of newCards) {
      if (card.id === key) {
        card.turned = true;
        setTurns(turns => turns + 1);
        break;
      }
    }

    setCurrentCards(newCards);
  };

  const compareCards = useCallback(() => {
    let imgToCompare;

    for (const card of currentCards) {
      if (card.turned && !pairsFound.includes(card.src)) {
        if (!imgToCompare) {
          imgToCompare = card.src;
        } else {
          if (imgToCompare === card.src) {
            setPoints(prevPoints => ++prevPoints);
            const currentPairs = [...pairsFound];
            currentPairs.push(card.src);
            setPairsFound(currentPairs);
            return;
          } 
        }
      }
    }
  }, [currentCards, pairsFound]);

  const generateShuffledCards = () => {
    let cards = [...cardImages, ...cardImages]
    // Randomly sort cards
      .sort(() => {
        return Math.random() - 0.5;
      })
      .map(card => {
        return {
          src: card,
          id: Math.random(),
          turned: false
        }
      });

    setCurrentCards(cards);
  };

  return (
    <>
      <div className="App">
        <h1 className="memory-game-headline">Memory Game</h1>
        <p className="points">Points: {points}</p>
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

      {/* Overlay with winner alert */}
      <div className="overlay">
        <div className="winner-alert">
          <span className="close" onClick={() => {
            document.querySelector('.overlay').style.display = 'none';
          }}>x</span>
          <p className="alert-message">You won the game!</p>
        </div>
      </div>
    </>
  );
};

export default App;