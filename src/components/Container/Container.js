import React, { useEffect, useState } from "react";
import "./container.css";
import TextArea from "../text-area/TextArea";
import { data } from "../../data";
function Container() {
  const [start, setStart] = useState(false);
  const timeIntervals = ["30", "45", "60"];
  const [time, setTime] = useState(0);
  const [sampleText, setSampleText] = useState("sample text");
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
      <TextArea start={start} time={timeIntervals[time]} text={sampleText} />
      <button className="bg-blue" onClick={() => setStart((prev) => !prev)}>
        {start ? "Reset" : "Start"}
      </button>
    </div>
  );
}

export default Container;
