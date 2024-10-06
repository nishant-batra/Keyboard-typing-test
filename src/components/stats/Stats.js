import { createPortal } from "react-dom";
import "./stats.css";
function Stats({ words, time, chars, correctChars, setShowModal, inputText }) {
  return createPortal(
    <div className="stats">
      <div className="modal-content">
        <div>
          <h4 className="in-b mr-10">Text written by you: </h4>
          <p className="finished-text in-b"> {" " + inputText}</p>
        </div>
        <div>
          <h4>Accuracy: </h4>
          <p> {" " + ((correctChars / chars) * 100).toFixed(2)} %</p>
        </div>
        <div>
          <h4>Words Per Minute: </h4>
          <p>{" " + ((words * 60) / time).toFixed(0)}</p>
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
