import React from "react";

function CardSlot({ difficulty, onCardPick }) {
    return (
      <div
        className="card"
        onClick={() => {
          onCardPick(difficulty);
        }}
      >
        <h2>Activity</h2>
        <p className="difficulty">{difficulty}</p>
      </div>
    );
  }

  export default CardSlot;