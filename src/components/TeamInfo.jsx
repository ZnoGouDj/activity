import React from "react";

function TeamInfo({ team }) {
  return (
    <div style={{ background: team.isCurrent ? '#db6060' : 'none' }}>
      <h3>Name: {team.name}</h3>
      <p>Position: {team.position}</p>
    </div>
  );
}

export default TeamInfo;