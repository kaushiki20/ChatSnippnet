import React, { useState, useEffect } from "react";
import "../App.css";
import useRecorder from "../useRecorder";
function Cards({ chat, setChat, download }) {
  let [
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
    botRecording,
  ] = useRecorder();
  const [user, setUser] = useState({ text: "", audio: "" });
  const [bot, setBot] = useState({ text: "", audio: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    setChat([...chat, { id: "", user: user, bot: bot }]);
  };

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
          <h4 style={{ fontWeight: "700" }}>SNIP</h4>

          <div>
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  fontSize: "30px",
                  float: "left",
                  marginLeft: "10px",
                  fontWeight: "700",
                }}
              >
                Bot
              </label>
              <textarea
                value={bot.text}
                onChange={(e) => {
                  setBot({ ...bot, text: e.target.value, audio: "" });
                }}
                style={{ float: "left", marginLeft: "20px" }}
                id="w3mission"
                rows="2"
                cols="40"
              ></textarea>
              <div>
                <audio
                  style={{ marginTop: "5px" }}
                  id="2"
                  src={bot.audio}
                  controls
                ></audio>
                <button
                  style={{
                    marginRight: "5px",
                    fontWeight: "700",
                    float: "left",
                    marginTop: "5px",
                    marginLeft: "5px",
                    backgroundColor: "#1abc9c",
                    border: "none",

                    borderRadius: "2px",
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
                    fontWeight: "700",
                    marginTop: "5px",
                    backgroundColor: "#1abc9c",
                    border: "none",

                    borderRadius: "2px",
                  }}
                  onClick={() => {
                    setBot({ ...bot, audio: audioURL[1].audioUrl });
                  }}
                >
                  fetch audio
                </button>
                <button
                  style={{
                    float: "left",
                    fontWeight: "700",
                    marginLeft: "5px",
                    position: "relative",
                    bottom: "3vh",
                    backgroundColor: "#1abc9c",
                    border: "none",

                    borderRadius: "2px",
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
                  fontWeight: "700",
                  float: "right",
                  marginRight: "10px",
                }}
              >
                Customer
              </label>
              <textarea
                value={user.text}
                onChange={(e) => {
                  setUser({ ...user, text: e.target.value, audio: "" });
                }}
                style={{ float: "right", marginRight: "20px" }}
                id="w3mission"
                rows="2"
                cols="40"
              ></textarea>

              <div>
                <audio
                  style={{ marginTop: "5px" }}
                  id="1"
                  src={user.audio}
                  controls
                ></audio>

                <button
                  style={{
                    backgroundColor: "#1abc9c",
                    border: "none",
                    fontWeight: "700",
                    borderRadius: "2px",
                  }}
                  onClick={() => {
                    setUser({ ...user, audio: audioURL[0].audioUrl });
                  }}
                >
                  fetch audio
                </button>
                <button
                  style={{
                    marginTop: "5px",
                    marginLeft: "5px",
                    fontWeight: "700",
                    backgroundColor: "#1abc9c",
                    border: "none",

                    borderRadius: "2px",
                  }}
                  onClick={(e) => startRecording(1, "user", e)}
                  disabled={isRecording}
                >
                  start recording
                </button>
                <button
                  style={{
                    marginTop: "5px",
                    marginLeft: "5px",
                    fontWeight: "700",
                    float: "right",
                    marginRight: "30px",
                    backgroundColor: "#1abc9c",
                    border: "none",

                    borderRadius: "2px",
                  }}
                  onClick={(e) => stopRecording(1, "user", e)}
                  disabled={!isRecording}
                >
                  stop recording
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            style={{
              marginRight: "10px",
              marginTop: "25px",
              backgroundColor: "#1abc9c",
              border: "none",
              fontWeight: "700",
              width: "10vh",
              borderRadius: "2px",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
