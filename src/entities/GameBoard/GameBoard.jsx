import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import TeamInfo from '../../widgets/TeamInfo/TeamInfo';
import Field from '../Field/Field';
import CardSlot from '../../widgets/CardSlot/CardSlot';
import './GameBoard.scss';

const fields = Array.from({ length: 49 }).map((_, i) => ({
  key: uuid(),
  index: i,
}));

function GameBoard({
  onCardPick, teams,
}) {
  return (
    <div className="game-board">
      <div className="info">
        {teams.map((team) => (
          <TeamInfo team={team} key={team.name} />
        ))}
      </div>
      <div className="field-grid">
        {fields.map(({ key, index }) => (
          <Field key={key} index={index} />
        ))}
      </div>
      <div className="card-slots">
        {Array.from({ length: 3 }, (_, i) => (
          <CardSlot difficulty={5 - i} onCardPick={onCardPick} key={uuid()} />
        ))}
      </div>
    </div>
  );
}

GameBoard.propTypes = {
  onCardPick: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool.isRequired,
  })).isRequired,
};

export default GameBoard;
