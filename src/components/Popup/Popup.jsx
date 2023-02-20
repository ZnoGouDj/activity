import React from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

function Popup({ showPopup, onTeamQtyChange }) {
  return (
    <div className="popup" style={{ display: showPopup ? 'flex' : 'none' }}>
      <h2>Choose the amount of teams</h2>
      <div className="btns-container">
        <button onClick={() => onTeamQtyChange(2)} type="button">2</button>
        <button onClick={() => onTeamQtyChange(3)} type="button">3</button>
        <button onClick={() => onTeamQtyChange(4)} type="button">4</button>
      </div>
    </div>
  );
}

Popup.propTypes = {
  showPopup: PropTypes.bool.isRequired,
  onTeamQtyChange: PropTypes.func.isRequired,
};

export default Popup;
