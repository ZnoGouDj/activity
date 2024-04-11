import React, { useState, useRef } from 'react';
import './Timer.scss';

function Timer() {
  const [time, timeSet] = useState({
    minutes: 1,
    seconds: 30,
  });
  const [timerStarted, timerStartedSet] = useState(false);
  const [showTimer, showTimerSet] = useState(false);

  const intervalRef = useRef(null);

  const formatTime = (value) => value.toString().padStart(2, '0');

  const launchTimer = () => {
    timerStartedSet(true);
    intervalRef.current = setInterval(() => {
      timeSet((prevTime) => {
        if (prevTime.seconds > 0) {
          return {
            ...prevTime,
            seconds: prevTime.seconds - 1,
          };
        }
        if (prevTime.minutes > 0) {
          return {
            minutes: prevTime.minutes - 1,
            seconds: 59,
          };
        }
        clearInterval(intervalRef.current);
        alert('The time is over');
        return {
          minutes: 1,
          seconds: 30,
        };
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    timeSet({
      minutes: 1,
      seconds: 30,
    });
    timerStartedSet(false);
  };

  const toggleTimer = () => {
    showTimerSet((prev) => !prev);
  };

  return (
    <div className={`timer ${showTimer ? 'show' : ''}`}>
      <button type="button" aria-label="toggler" className="toggler" onClick={toggleTimer} />
      <div className="clock">
        <div className="clock_circle">
          <div className="minute-hand" style={{ transform: `rotate(${time.minutes * 6 + time.seconds / 10}deg)` }} />
          <div className="second-hand" style={{ transform: `rotate(${time.seconds * 6}deg)` }} />
        </div>
      </div>
      <div className="time">
        {`${formatTime(time.minutes)}:${formatTime(time.seconds)}`}
      </div>
      {timerStarted ? (
        <button type="button" className="stop_timer" onClick={stopTimer}>Stop</button>
      ) : (
        <button type="button" className="start_timer" onClick={launchTimer}>Start</button>
      )}
    </div>
  );
}

export default Timer;
