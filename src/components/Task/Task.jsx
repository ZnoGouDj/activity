import React from 'react';
import PropTypes from 'prop-types';
import './Task.scss';

function Task({ showTask, word, onGuessWord }) {
  return (
    <div className="task" style={{ display: showTask ? 'flex' : 'none' }}>
      <h2>{word}</h2>
      <div className="guess-buttons">
        <button onClick={() => onGuessWord('No')} type="button">No</button>
        <button onClick={() => onGuessWord('Yes')} type="button">Yes</button>
      </div>
    </div>
  );
}

Task.propTypes = {
  showTask: PropTypes.bool.isRequired,
  word: PropTypes.string.isRequired,
  onGuessWord: PropTypes.func.isRequired,
};

export default Task;
