import React, { useRef, useEffect } from "react";
import "./timer.css";
function Timer({ timer, state, setTimer, time }) {
  const intervalId = useRef(null);
  useEffect(() => {
    if (state === "start") {
      const stopTime = Date.now() + parseInt(time) * 1000;
      intervalId.current = setInterval(() => {
        if (Date.now() >= stopTime) clearInterval(intervalId.current);
        setTimer(stopTime - Date.now());
      }, 10);
    } else if (state === "reset") {
      clearInterval(intervalId.current);
      setTimer(time * 1000);
    } else {
      clearInterval(intervalId.current);
    }
  }, [state, time]);
  return (
    <div className="timer">
      <h4>Timer: </h4>
      <p>
        {(timer / 1000).toFixed(0).toString().length === 1 ? " 0" : " "}
        {parseInt((timer / 1000).toFixed(0))} s
      </p>
    </div>
  );
}
export default Timer;
