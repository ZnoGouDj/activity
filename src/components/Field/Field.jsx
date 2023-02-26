import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import './Field.scss';

const Field = React.memo(({ index }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const words = ['speak', 'show', 'draw'];

  const isStartOrFinish = index !== 0 && index !== 48;
  const word = words[Math.floor(Math.random() * words.length)];
  const fieldClass = !isStartOrFinish ? 'field' : `field ${word}`;

  // do something better start
  const indexSwap = {
    7: 13,
    8: 12,
    9: 11,
    11: 9,
    12: 8,
    13: 7,
    21: 27,
    22: 26,
    23: 25,
    25: 23,
    26: 22,
    27: 21,
    35: 41,
    36: 40,
    37: 39,
    39: 37,
    40: 36,
    41: 35,
  };

  const mobileIndexSwap = {
    5: 9,
    6: 8,
    8: 6,
    9: 5,
    15: 19,
    16: 18,
    18: 16,
    19: 15,
    25: 29,
    26: 28,
    28: 26,
    29: 25,
    35: 39,
    36: 38,
    38: 36,
    39: 35,
    45: 47,
    47: 45,
  };
  // do something better end

  return (
    <div className={fieldClass}>
      {/* {isStartOrFinish && word} */}
      {isMobile ? (
        (isStartOrFinish && mobileIndexSwap[index]) || (isStartOrFinish && index)
      ) : (
        (isStartOrFinish && indexSwap[index]) || (isStartOrFinish && index)
      )}
    </div>
  );
});

Field.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Field;
