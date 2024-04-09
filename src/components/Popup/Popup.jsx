import React from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

function Popup({ onTeamQtyChange }) {
  return (
    <div className="popup">
      <h2>Choose the teams amount</h2>
      <div className="btns-container">
        <button onClick={() => onTeamQtyChange(2)} type="button">2</button>
        <button onClick={() => onTeamQtyChange(3)} type="button">3</button>
        <button onClick={() => onTeamQtyChange(4)} type="button">4</button>
      </div>
    </div>
  );
}

Popup.propTypes = {
  onTeamQtyChange: PropTypes.func.isRequired,
};

export default Popup;
