import React from "react";

const Field = React.memo(({ index }) => {
  const words = ['speak', 'show', 'draw'];

  const isStartOrFinish = index !== 0 && index !== 48;
  const word = words[Math.floor(Math.random() * words.length)];
  const fieldClass = !isStartOrFinish ? 'field' : `field ${word}`;

  return (
    <div className={fieldClass}>
      {/* {isStartOrFinish && word} */}
      {isStartOrFinish && index}
    </div>
  );
});

export default Field;