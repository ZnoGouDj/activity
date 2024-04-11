import React from 'react';
import PropTypes from 'prop-types';
import './TeamInfo.scss';

function TeamInfo({ team }) {
  return (
    <div className="team-info" style={{ background: team.isCurrent ? '#db6060' : 'none' }}>
      <h3>
        {team.name}
      </h3>
      <p>
        Position:
        {' '}
        {team.position}
      </p>
    </div>
  );
}

TeamInfo.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    isCurrent: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TeamInfo;
