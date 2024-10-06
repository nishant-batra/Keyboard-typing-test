import React, { useState, useEffect, useRef } from "react";
import "./textArea.css";
import Stats from "../stats/Stats";
import Timer from "../Timer/Timer";
function TextArea({ start, time, text }) {
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
        console.log(inputText);
        count++;
      }
    }
    return count;
  };
  const [timerState, setTimerState] = useState("reset");
  const timeoutId = useRef(null);
  const textRef = useRef(null);
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
        />
      )}
    </div>
  );
}

export default TextArea;
