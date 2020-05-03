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

  useEffect(() => {
    const audio = innerRef.current;

    const audios = [];
    chat.forEach(function (c) {
      audios.push(c.user.audio);
      audios.push(c.bot.audio);
    });

    let combinedAudios = new Crunker();
    if (audios.length) {
      combinedAudios
        .fetchAudio(...audios)
        .then((buffers) => combinedAudios.mergeAudio(buffers))
        .then((merged) => combinedAudios.export(merged, "audio/mp3"))
        .then((output) => {
          console.log(output);
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
