import React from 'react';
import './App.css'; // assumes you have a CSS file for styling

function GameBoard() {
  const words = ['speak', 'show', 'draw'];

  return (
    <div className="game-board">
      <div className="field-grid">
        {Array.from({ length: 49 }, (_, i) => {
          const isStartOrFinish = i !== 0 && i !== 48;
          const word = words[Math.floor(Math.random() * words.length)];
          const fieldClass = word && isStartOrFinish ? `field ${word}` : 'field';
          return (
            <div className={fieldClass} key={i}>
              {isStartOrFinish ? word : ''}
            </div>
          );
        })}
      </div>
      <div className="card-slots">
        {Array.from({ length: 3 }, (_, i) => (
          <div className="card" key={i}>
            <h2>Activity</h2>
            <p className='difficulty'>{5 - i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameBoard;