import React, { useState, useEffect, useRef } from "react";
import Crunker from "crunker";
import Cards from "./pages/Cards";
import "./App.css";

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

function App() {
  const [snip, setSnip] = useState([]);

  const [chat, setChat] = useState([]);
  //download's the json file
  const handleDownload = () => {
    const fileName = "file";
    const json = JSON.stringify(chat);
    debugger;
    const blob = new Blob([json], { type: "application/json" });

    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  //add snips
  const AddSnip = () => {
    setSnip([
      ...snip,
      <Cards chat={chat} setChat={setChat} download={handleDownload} />,
    ]);
  };
  //remove snip
  const remove = (i) => {
    const newsnip = [...snip];
    newsnip.splice(i, 1);
    setSnip(newsnip);
  };

  const innerRef = useRef(null);
  const ind = useRef(0);
  //stiching of audios && adding buffer
  useEffect(() => {
    const audio = innerRef.current;
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let audiobot = new (window.AudioContext || window.webkitAudioContext)();
    //customer buffer
    let myArrayBuffer = audioCtx.createBuffer(1, 1500, 44100);
    console.log(myArrayBuffer);

    //bot buffer
    let myBotBuffer = audiobot.createBuffer(1, 750, 44100);
    console.log(myBotBuffer);

    var source = audioCtx.createBufferSource();
    source.buffer = myArrayBuffer;
    const audios = [];
    chat.forEach(function (c) {
      audios.push(c.user.audio);
      audios.push(c.bot.audio);
    });
    console.log(audios);
    let combinedAudios = new Crunker();
    if (audios.length) {
      combinedAudios
        .fetchAudio(...audios)
        .then((buffers) => {
          const newBuffers = [];
          buffers.forEach((buffer, index) => {
            newBuffers.push(buffer);
            if (index % 2 === 0) {
              // newBuffers.push(myArrayBuffer) jonsa bhi ho 1500ms vala ya fir 750ms vala
              newBuffers.push(myArrayBuffer);
            } else {
              // dusra vala push kar de
              newBuffers.push(myBotBuffer);
            }
          });
          return combinedAudios.mergeAudio(newBuffers);
        })
        .then((merged) => combinedAudios.export(merged, "audio/mp3"))
        .then((output) => {
          audio.src = output.url;
          audio.load();
        });
    }
  }, [chat]);

  return (
    <div className="App">
      <div style={{ justifyContent: "center" }}>
        <h1 style={{ fontWeight: "700" }}>AI Automation Tool</h1>

        <button
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            backgroundColor: "#16a085",
            border: "none",
            borderRadius: "2px",
            fontWeight: "700",
          }}
          onClick={AddSnip}
        >
          Add Snip
        </button>
        <button
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            backgroundColor: "#16a085",
            border: "none",
            borderRadius: "2px",
            fontWeight: "700",
          }}
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div>
        <audio style={{ marginTop: "10px" }} controls ref={innerRef} />
      </div>

      <div display={{ display: "flex", flexWrap: "wrap" }}>
        {snip.map((snip, i) => (
          <ul
            key={i}
            style={{ marginLeft: "10px", listStyle: "none", marginTop: "20px" }}
          >
            <li key={i}> {snip}</li>
            <button
              className="close"
              style={{
                border: "none",
                borderRadius: "2px",
                backgroundColor: "#607D8B",
                fontWeight: "700",
              }}
              onClick={() => {
                remove(i);
              }}
            >
              X
            </button>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
