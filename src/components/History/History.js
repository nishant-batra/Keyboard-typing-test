import "./history.css";
import { createPortal } from "react-dom";
function History({ data, setShowHistory }) {
  return createPortal(
    <>
      <div className="stats">
        <div className="list">
          {data && data.length > 0 ? (
            <>
              <h2>History</h2>
              <p className="subheading">Here you can see your top 5 scores</p>
              <div className="w-100">
                {data.map((val, index) => {
                  return (
                    <div
                      className={
                        index % 2 === 1 ? "list-item" : "list-item bg-gray"
                      }
                    >
                      <p>{index + 1}</p>
                      <div>
                        <h4>Date: </h4>
                        <p>{val.date}</p>
                      </div>
                      <div>
                        <h4>Accuracy: </h4>
                        <p>{val.accuracy}</p>
                      </div>
                      <div>
                        <h4>WPM: </h4>
                        <p>{val.wpm}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <h1 className="data-empty">No Attempts Yet</h1>
          )}
          <button className="bg-blue" onClick={() => setShowHistory(false)}>
            Okay
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

export default History;
