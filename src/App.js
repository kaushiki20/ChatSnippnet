import React, { useState, useEffect, useRef } from "react";

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
  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);
  const [chat, setChat] = useState([]);

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

  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: snip,
    });

    // Note: this is only for Firefox.
    // Without it, the DnD won't work.
    // But we are not using it.
    event.dataTransfer.setData("text/html", "");
  };

  // onDragOver fires when an element being dragged
  // enters a droppable area.
  // In this case, any of the items on the list
  const onDragOver = (event) => {
    // in order for the onDrop
    // event to fire, we have
    // to cancel out this one
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;

    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    // index of the droppable area being hovered
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (event) => {
    setSnip(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  let onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };
 =

  React.useEffect(() => {
    console.log("Dragged From: ", dragAndDrop && dragAndDrop.draggedFrom);
    console.log("Dropping Into: ", dragAndDrop && dragAndDrop.draggedTo);
  }, [dragAndDrop]);

  React.useEffect(() => {
    console.log("List updated!");
  }, [snip]);
  //audio stich
  const innerRef = useRef(null);
  const index = useRef(1);
  useEffect(() => {
    const audio = innerRef.current;

    const audios = [];
    chat.forEach(function (c) {
      audios.push(c.user.audio);
      audios.push(c.bot.audio);
    });
    
    audio.src = audios.length ? audios[0] : "";

    audio.load();
    audio.addEventListener("ended", () => {
      
      if (index.current > audios.length) {
        return;
      }
      audio.src = audios[index.current] || "";
      index.current = index.current + 1;
      audio.load();
      var isPlaying =
        audio.currentTime > 0 &&
        !audio.paused &&
        !audio.ended &&
        audio.readyState > 2;

      if (!isPlaying) {
        audio.play();
      }
    });
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
      <audio style={{ marginTop: "10px" }} controls ref={innerRef} />
      <div display={{ display: "flex", flexWrap: "wrap" }}>
        {snip.map((snip, i) => (
          <ul
            key={i}
            style={{ marginLeft: "10px", listStyle: "none", marginTop: "20px" }}
          >
            <li
              key={i}
              data-position={i}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              className={
                dragAndDrop && dragAndDrop.draggedTo === Number(i)
                  ? "dropArea"
                  : ""
              }
            >
              {" "}
              {snip}
              <button
                style={{
                  position: "relative",
                  bottom: "50vh",
                  marginLeft: "5px",
                  marginTop: "5px",
                  border: "none",
                  borderRadius: "2px",
                  backgroundColor: "#607D8B",
                  fontWeight: "700",
                }}
                variant="outline-secondary"
                className="float-left "
                onClick={() => {
                  remove(i);
                }}
              >
                X
              </button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default App;
