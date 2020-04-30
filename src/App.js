import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Cards from "./pages/Cards";
import "./App.css";

function App() {
  const [snip, setSnip] = useState([]);

  const AddSnip = () => {
    setSnip([...snip, <Cards />]);
  };

  const remove = (i) => {
    const newsnip = [...snip];
    newsnip.splice(i, 1);
    setSnip(newsnip);
  };

  return (
    <div className="App">
      <div>
        <Button onClick={AddSnip}>Add Snip</Button>
      </div>
      <div>
        {snip.map((snip, i) => (
          <div key={i}>
            {snip}
            <Button
              style={{ position: "relative", bottom: "40vh" }}
              variant="outline-secondary"
              className="float-left "
              onClick={() => {
                remove(i);
              }}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
