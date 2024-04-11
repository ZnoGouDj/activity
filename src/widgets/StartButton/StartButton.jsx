import React from 'react';
import PropTypes from 'prop-types';

function StartButton({ startGame }) {
  return (
    <button className="start-btn" onClick={startGame} type="button">Start game</button>
  );
}

StartButton.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default StartButton;
