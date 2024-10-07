import React, { useEffect, useState } from "react";
import "./container.css";
import TextArea from "../text-area/TextArea";
import History from "../History/History";
import { data } from "../../data";
function Container() {
  const [start, setStart] = useState(false);
  const timeIntervals = ["30", "45", "60"];
  const [time, setTime] = useState(0);
  const [sampleText, setSampleText] = useState("sample text");
  const [showHistory, setShowHistory] = useState(false);
  const [prevAttempts, setPreviousAttemps] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("10TypingTestResults");
    console.log(storedData);
    if (storedData && storedData.length) {
      setPreviousAttemps(JSON.parse(storedData));
    }
  }, []);
  useEffect(() => {
    if (prevAttempts && prevAttempts.length)
      localStorage.setItem("10TypingTestResults", JSON.stringify(prevAttempts));
  }, [prevAttempts]);
  useEffect(() => {
    if (start === false) getNewSampleText();
  }, [time, start]);
  const getNewSampleText = () => {
    setSampleText(calcSampleText());
  };
  const calcSampleText = () => {
    let words = timeIntervals[time];
    let sampleText = "";
    const dataArray = data.split(" ");
    const size = dataArray.length;
    for (let i = 0; i < words; i += 2) {
      const startIndex = parseInt((Math.random() * (size - 2)).toFixed(0));
      if (sampleText) {
        sampleText = sampleText.concat(" ");
      }
      sampleText = sampleText.concat(
        dataArray.slice(startIndex, startIndex + 2).join(" ")
      );
    }
    return sampleText;
  };
  const handleDuration = (selected) => {
    setTime(selected);
  };
  return (
    <div className="container">
      <h1>Typing Test</h1>
      <div className="length-selection">
        <p className="length">Select length: </p>
        <div className="btn-container">
          <button
            className="bg-green"
            disabled={start}
            onClick={() => handleDuration(0)}
          >
            Short
          </button>
          <button
            className="bg-yellow"
            disabled={start}
            onClick={() => handleDuration(1)}
          >
            Medium
          </button>
          <button
            className="bg-red"
            disabled={start}
            onClick={() => handleDuration(2)}
          >
            Long
          </button>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="icon"
        onClick={() => getNewSampleText()}
      >
        <path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="icon icon-1"
        onClick={() => setShowHistory(true)}
      >
        <path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM6 7V9H14V7H6ZM6 11V13H14V11H6ZM6 15V17H11V15H6Z"></path>
      </svg>
      <TextArea
        start={start}
        time={timeIntervals[time]}
        text={sampleText}
        setPrevAttempts={setPreviousAttemps}
        prevAttempts={prevAttempts}
      />
      <button className="bg-blue" onClick={() => setStart((prev) => !prev)}>
        {start ? "Reset" : "Start"}
      </button>
      {showHistory && (
        <History data={prevAttempts} setShowHistory={setShowHistory} />
      )}
    </div>
  );
}

export default Container;
