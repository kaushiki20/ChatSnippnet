import React, { useState } from "react";

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

  const AddSnip = () => {
    setSnip([
      ...snip,
      <Cards chat={chat} setChat={setChat} download={handleDownload} />,
    ]);
  };

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
  console.log(chat);
  // Not needed, just for logging purposes:
  React.useEffect(() => {
    console.log("Dragged From: ", dragAndDrop && dragAndDrop.draggedFrom);
    console.log("Dropping Into: ", dragAndDrop && dragAndDrop.draggedTo);
  }, [dragAndDrop]);

  React.useEffect(() => {
    console.log("List updated!");
  }, [snip]);

  return (
    <div className="App" style={{ display: "flex" }}>
      <div>
        <button onClick={AddSnip}>Add Snip</button>
      </div>
      <div>
        {snip.map((snip, i) => (
          <ul key={i} style={{ marginLeft: "10px" }}>
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
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default App;
