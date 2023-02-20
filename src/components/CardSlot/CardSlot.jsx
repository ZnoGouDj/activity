import React from 'react';
import PropTypes from 'prop-types';
import './CardSlot.scss';

function CardSlot({ difficulty, onCardPick }) {
  return (
    <button
      className="card"
      onClick={() => {
        onCardPick(difficulty);
      }}
      type="button"
    >
      <h2>Activity</h2>
      <p className="difficulty">{difficulty}</p>
    </button>
  );
}

CardSlot.propTypes = {
  difficulty: PropTypes.number.isRequired,
  onCardPick: PropTypes.func.isRequired,
};

export default CardSlot;
