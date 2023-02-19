import React from "react";

function Task({ showTask, word, onGuessWord }) {
  return (
    <div className="task" style={{ display: showTask ? 'flex' : 'none' }}>
      <h2>{word}</h2>
      <div className="guess-buttons">
        <button onClick={() => onGuessWord('No')}>No</button>
        <button onClick={() => onGuessWord('Yes')}>Yes</button>
      </div>
    </div>
  );
}

export default Task;