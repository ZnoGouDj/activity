import React from 'react';
import PropTypes from 'prop-types';

function TeamInfo({ team }) {
  return (
    <div style={{ background: team.isCurrent ? '#db6060' : 'none' }}>
      <h3>
        Name:
        {team.name}
      </h3>
      <p>
        Position:
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
