import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import TeamInfo from '../TeamInfo/TeamInfo';
import Field from '../Field/Field';
import CardSlot from '../CardSlot/CardSlot';
import './GameBoard.scss';

const fields = Array.from({ length: 49 }).map((_, i) => ({
  key: uuid(),
  index: i,
}));

function GameBoard({
  onCardPick, startGame, teams, showStart,
}) {
  return (
    <div className="game-board">
      <div className="info">
        {teams.map((team) => (
          <TeamInfo team={team} key={team.name} />
        ))}
      </div>
      <div className="field-grid">
        {showStart ? (
          <button className="start-btn" onClick={startGame} type="button">
            Start game
          </button>
        ) : (
          fields.map(({ key, index }) => (
            <Field key={key} index={index} />
          ))
        )}
      </div>
      {!showStart && (
        <div className="card-slots">
          {Array.from({ length: 3 }, (_, i) => (
            <CardSlot difficulty={5 - i} onCardPick={onCardPick} key={uuid()} />
          ))}
        </div>
      )}
    </div>
  );
}

GameBoard.propTypes = {
  onCardPick: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool.isRequired,
  })).isRequired,
  showStart: PropTypes.bool.isRequired,
};

export default GameBoard;
