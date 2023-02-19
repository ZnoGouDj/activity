import React from "react";

function Popup({ showPopup, onTeamQtyChange }) {
  return (
    <div className="popup" style={{ display: showPopup ? 'flex' : 'none' }}>
      <h2>Choose the amount of teams</h2>
      <div className="btns-container">
        <button onClick={() => onTeamQtyChange(2)}>2</button>
        <button onClick={() => onTeamQtyChange(3)}>3</button>
        <button onClick={() => onTeamQtyChange(4)}>4</button>
      </div>
    </div>
  );
}

export default Popup;