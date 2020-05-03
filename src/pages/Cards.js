import React, { useState, useEffect } from "react";
import "./Cards.css";
import useRecorder from "../useRecorder";
import generate from "shortid";
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
    if (
      chat.find(
        (c) =>
          c.user.text.toLowerCase() === user.text.toLowerCase() &&
          c.bot.text.toLowerCase() === bot.text.toLocaleLowerCase()
      )
    ) {
      return;
    }
    setChat([...chat, { id: generate(), user: user, bot: bot }]);
  };

  return (
    //please click Get audio btn after stop recording to play audio  in player
    <div>
      <div className="card">
        <div>
          <h4 style={{ fontWeight: "700" }}>SNIP</h4>

          <div>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <label
                style={{
                  fontSize: "30px",
                  float: "left",
                  marginLeft: "1%",
                  fontWeight: "700",
                }}
              >
                Bot
              </label>
              <textarea
                type="text"
                value={bot.text}
                onChange={(e) => {
                  setBot({ ...bot, text: e.target.value, audio: "" });
                }}
                style={{
                  float: "left",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
                id="w3mission"
                rows="2"
                cols="20"
              ></textarea>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <audio
                  className="botaudio"
                  style={{ marginTop: "5px" }}
                  id="2"
                  src={bot.audio}
                  controls
                ></audio>
                <div style={{ diaplay: "flex" }}>
                  <button
                    className="stopbot"
                    style={{
                      fontWeight: "700",

                      backgroundColor: "#1abc9c",
                      border: "none",

                      borderRadius: "2px",
                    }}
                    onClick={(e) => {
                      stopRecording(2, "bot", e);
                    }}
                    disabled={!botRecording}
                  >
                    stop recording
                  </button>
                  <button
                    className="startbot"
                    style={{
                      fontWeight: "700",

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
                    className="fetchbot"
                    style={{
                      fontWeight: "700",

                      backgroundColor: "#1abc9c",
                      border: "none",

                      borderRadius: "2px",
                    }}
                    onClick={() => {
                      setBot({ ...bot, audio: audioURL[1].audioUrl });
                    }}
                  >
                    Get Audio
                  </button>
                </div>
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                flexDirection: "column",
                textAlign: "right",
                justifyContent: "right",
              }}
            >
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
                type="text"
                value={user.text}
                onChange={(e) => {
                  setUser({ ...user, text: e.target.value, audio: "" });
                }}
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginLeft: "20px",
                }}
                id="w3mission"
                rows="2"
                cols="20"
              ></textarea>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <audio
                  className="useraudio"
                  style={{ marginTop: "5px" }}
                  id="1"
                  src={user.audio}
                  controls
                ></audio>
                <div>
                  <button
                    className="userfetch"
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
                    Get Audio
                  </button>
                  <button
                    className="userstop"
                    style={{
                      fontWeight: "700",
                      float: "right",

                      backgroundColor: "#1abc9c",
                      border: "none",

                      borderRadius: "2px",
                    }}
                    onClick={(e) => {
                      stopRecording(1, "user", e);
                    }}
                    disabled={!isRecording}
                  >
                    stop recording
                  </button>
                  <button
                    className="userstart"
                    style={{
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
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#1abc9c",
              border: "none",
              fontWeight: "700",
              marginTop: "3%",
              marginBottom: "2%",
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
