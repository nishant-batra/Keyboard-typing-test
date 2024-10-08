import { createPortal } from "react-dom";
import "./stats.css";
function Stats({
  words,
  time,
  chars,
  correctChars,
  setShowModal,
  inputText,
  previousAttempt,
  sampleText,
}) {
  console.log(previousAttempt);
  const wpm = parseInt(((words * 60) / time).toFixed(0));
  const accuracy = parseInt(((correctChars / chars) * 100).toFixed(2));
  console.log(previousAttempt?.wpm, previousAttempt?.accuracy, wpm, accuracy);
  return createPortal(
    <div className="stats">
      <div className="modal-content">
        <h1>Stats</h1>
        {(previousAttempt?.wpm * previousAttempt?.accuracy <= wpm * accuracy ||
          !previousAttempt) && (
          <div
            className="personal-best"
            style={{ textAlign: "center", height: "100px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="pb-icon"
            >
              <path d="M17 15.2454V22.1169C17 22.393 16.7761 22.617 16.5 22.617C16.4094 22.617 16.3205 22.5923 16.2428 22.5457L12 20L7.75725 22.5457C7.52046 22.6877 7.21333 22.6109 7.07125 22.3742C7.02463 22.2964 7 22.2075 7 22.1169V15.2454C5.17107 13.7793 4 11.5264 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9C20 11.5264 18.8289 13.7793 17 15.2454ZM12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15ZM12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9C16 11.2091 14.2091 13 12 13Z"></path>
            </svg>
            <hr></hr>
            <p>Personal Best!!</p>
          </div>
        )}
        <div className="flex-item">
          <h4 className="mr-10 no-shrink">Original text: </h4>
          <p className="finished-text in-b"> {sampleText}</p>
        </div>
        <div className="flex-item">
          <h4 className="mr-10">Text written by you: </h4>
          <p className="finished-text in-b"> {inputText}</p>
        </div>
        <div className="flex-item">
          <h4>Accuracy: </h4>
          <p> {accuracy} %</p>
        </div>
        <div className="flex-item">
          <h4>Words Per Minute: </h4>
          <p>{wpm}</p>
        </div>
        <button className="bg-blue" onClick={() => setShowModal(false)}>
          Okay
        </button>
      </div>
    </div>,
    document.body
  );
}

export default Stats;
