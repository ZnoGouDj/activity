import React from 'react';
import PropTypes from 'prop-types';
import './Task.scss';

function Task({ word, onGuessWord }) {
  return (
    <div className="task">
      <h2>{word}</h2>
      <div className="guess-buttons">
        <button onClick={() => onGuessWord('No')} type="button">No</button>
        <button onClick={() => onGuessWord('Yes')} type="button">Yes</button>
      </div>
    </div>
  );
}

Task.propTypes = {
  word: PropTypes.string.isRequired,
  onGuessWord: PropTypes.func.isRequired,
};

export default Task;
