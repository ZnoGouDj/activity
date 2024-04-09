import React, { useState, useRef } from 'react';
import './Timer.scss';

function Timer() {
  const [time, setTime] = useState({
    minutes: 1,
    seconds: 30,
  });
  const [timerStarted, setTimerStarted] = useState(false);
  const intervalRef = useRef(null);

  const formatTime = (value) => value.toString().padStart(2, '0');

  const launchTimer = () => {
    setTimerStarted(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
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
    setTime({
      minutes: 1,
      seconds: 30,
    });
    setTimerStarted(false);
  };

  return (
    <div className="timer">
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
        <button type="button" onClick={stopTimer}>Stop</button>
      ) : (
        <button type="button" onClick={launchTimer}>Start</button>
      )}
    </div>
  );
}

export default Timer;
