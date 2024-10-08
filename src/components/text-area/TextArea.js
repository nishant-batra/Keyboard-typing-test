import React, { useState, useEffect, useRef } from "react";
import "./textArea.css";
import Stats from "../stats/Stats";
import Timer from "../Timer/Timer";
const compareAttempts = (a, b) => {
  if (a.accuracy * a.wpm > b.accuracy * b.wpm) {
    return -1;
  } else if (a.accuracy * a.wpm === b.accuracy * b.wpm) {
    return 0;
  } else return 1;
};

function TextArea({ start, time, text, prevAttempts, setPrevAttempts }) {
  const sampleText = text;
  const [inputText, setInputText] = useState("");
  const [timer, setTimer] = useState(time * 1000);
  const [textHeight, setTextHeight] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const sampleTextRef = useRef(null);
  const calculateCorrectChars = () => {
    let count = 0;
    for (let i in inputText) {
      if (inputText[i] === sampleText[i]) {
        count++;
      }
    }
    return count;
  };
  const [timerState, setTimerState] = useState("reset");
  const timeoutId = useRef(null);
  const textRef = useRef(null);
  const updateAttempts = () => {
    let attempts = [
      ...prevAttempts,
      {
        date: new Date().toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "numeric",
        }),
        wpm: parseInt(
          (inputText.split(" ").length * 60) /
            ((time * 1000 - timer) / 1000).toFixed(0)
        ),
        accuracy: parseInt(
          ((calculateCorrectChars() / inputText.length) * 100).toFixed(2)
        ),
      },
    ];
    attempts = attempts.sort(compareAttempts);
    setPrevAttempts(attempts.slice(0, 5));
  };
  useEffect(() => {
    if (start) {
      setTimerState("start");
      timeoutId.current = setTimeout(() => {
        setTimerState("end");
        setShowModal(true);
      }, parseInt(time * 1000));
    } else {
      setInputText("");
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
      setTimerState("reset");
    }
  }, [start, time]);
  useEffect(() => {
    if (inputText.length === sampleText.length) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
      setTimerState("end");
      setShowModal(true);
    }
    setTextHeight(sampleTextRef.current.offsetHeight + 10);
  }, [inputText, sampleText]);

  useEffect(() => {
    if (timerState === "start") textRef.current.focus();
    else if (timerState === "end") updateAttempts();
  }, [timerState]);
  useEffect(() => {
    window.addEventListener("resize", adjustHeight);
    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, []);
  const adjustHeight = () => {
    setTextHeight(sampleTextRef.current.offsetHeight);
  };
  const handleKeyDown = (event) => {
    const input = event.target.value;
    if (input.length > sampleText.length) return;
    setInputText(input);
  };
  return (
    <div className="text-area">
      <Timer time={time} timer={timer} setTimer={setTimer} state={timerState} />
      <textarea
        value={inputText}
        onChange={handleKeyDown}
        disabled={timerState === "reset" || timerState === "end"}
        ref={textRef}
        style={{
          height: textHeight,
        }}
      ></textarea>
      <div
        className="sample-text"
        ref={sampleTextRef}
        onClick={() => textRef.current.focus()}
      >
        {sampleText.split("").map((val, index) => {
          return (
            <span
              className={
                index < inputText.length &&
                inputText[index] === sampleText[index]
                  ? "green"
                  : index >= inputText.length
                  ? ""
                  : "red"
              }
            >
              {val}
            </span>
          );
        })}
      </div>
      {showModal && (
        <Stats
          words={inputText.split(" ").length}
          chars={inputText.length}
          correctChars={calculateCorrectChars()}
          time={((time * 1000 - timer) / 1000).toFixed(0)}
          setShowModal={setShowModal}
          inputText={inputText}
          sampleText={sampleText}
          previousAttempt={prevAttempts ? prevAttempts[0] : null}
        />
      )}
    </div>
  );
}

export default TextArea;
