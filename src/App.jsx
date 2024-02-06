import React from "react";

const imagesContext = require.context('../public/assets', false, /\.(png|jpe?g|svg)$/);
const cardImages = imagesContext.keys().map(imagesContext);

const App = () => {
  console.log(cardImages)
  const cards = [...cardImages, ...cardImages];
  console.log(cards)

  // TODO Add one more image
  // TODO Randomize order of cards
  const cardImgs = cards.map((card, index) => {
    return (
      <img src={card} key={index} className="memory-image"/>
    );
  });
  
  return (
    <div className="App">
      <h1 className="memory-game-headline">Memory Game</h1>
      <button className="new-game-btn">New Game</button>
      <div className="memory-board">
        {cardImgs}
      </div>
    </div>
  );
};

export default App;