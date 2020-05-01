import React from "react";

import useRecorder from "../useRecorder";
function Cards() {
  let [
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
    botRecording,
  ] = useRecorder();
  console.log(audioURL[1].audioURL);
  return (
    <div>
      <div
        style={{
          width: "80vh",
          height: "50vh",
          border: "1px #bdc3c7 solid",
        }}
      >
        <div>
          <h4>Snip</h4>

          <div>
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{ fontSize: "30px", float: "left", marginLeft: "10px" }}
              >
                Bot
              </label>
              <textarea
                style={{ float: "left", marginLeft: "20px" }}
                id="w3mission"
                rows="2"
                cols="40"
              ></textarea>
              <div>
                <audio
                  style={{ marginTop: "5px" }}
                  id="2"
                  src={audioURL[1].audioUrl}
                  controls
                ></audio>
                <button
                  style={{
                    marginRight: "5px",
                    float: "left",
                    marginTop: "5px",
                    marginLeft: "5px",
                  }}
                  id="2"
                  onClick={(e) => startRecording(2, "bot", e)}
                  disabled={botRecording}
                >
                  start recording
                </button>
                <button
                  style={{
                    float: "left",
                    marginTop: "5px",
                  }}
                  onClick={(e) => stopRecording(2, "bot", e)}
                  disabled={!botRecording}
                >
                  stop recording
                </button>
              </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  fontSize: "30px",
                  float: "right",
                  marginRight: "10px",
                }}
              >
                Customer
              </label>
              <textarea
                style={{ float: "right", marginRight: "20px" }}
                id="w3mission"
                rows="2"
                cols="40"
              ></textarea>

              <div>
                <audio
                  style={{ marginTop: "5px" }}
                  id="1"
                  src={audioURL[0].audioUrl}
                  controls
                ></audio>
                <button
                  style={{ marginTop: "5px" }}
                  onClick={(e) => startRecording(1, "user", e)}
                  disabled={isRecording}
                >
                  start recording
                </button>
                <button
                  style={{ marginTop: "5px", marginLeft: "5px" }}
                  onClick={(e) => stopRecording(1, "user", e)}
                  disabled={!isRecording}
                >
                  stop recording
                </button>
              </div>
            </div>
          </div>
          <button style={{ marginRight: "10px" }}>Submit</button>
          <button>Download</button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
