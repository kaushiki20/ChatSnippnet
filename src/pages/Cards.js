import React, { useState, useEffect } from "react";

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
    debugger;
    setChat([...chat, { id: "", user: user, bot: bot }]);
  };

  const handleDownload = () => {
    console.log(chat);
    debugger;
    download();
  };

  console.log(user.audio);

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
                value={bot.text}
                onChange={(e) => {
                  setBot({ ...bot, text: e.target.value });
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
                  style={{ float: "left", marginTop: "5px" }}
                  onClick={() => {
                    setBot({ ...bot, audio: audioURL[1].audioUrl });
                  }}
                >
                  fetch audio
                </button>
                <button
                  style={{
                    float: "left",
                    marginLeft: "5px",
                    position: "relative",
                    bottom: "3vh",
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
                value={user.text}
                onChange={(e) => {
                  setUser({ ...user, text: e.target.value });
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
                  onClick={() => {
                    setUser({ ...user, audio: audioURL[0].audioUrl });
                  }}
                >
                  fetch audio
                </button>
                <button
                  style={{ marginTop: "5px", marginLeft: "5px" }}
                  onClick={(e) => startRecording(1, "user", e)}
                  disabled={isRecording}
                >
                  start recording
                </button>
                <button
                  style={{
                    marginTop: "5px",
                    marginLeft: "5px",
                    float: "right",
                    marginRight: "30px",
                  }}
                  onClick={(e) => stopRecording(1, "user", e)}
                  disabled={!isRecording}
                >
                  stop recording
                </button>
              </div>
            </div>
          </div>
          <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
