import React, { useState } from "react";
import Draggable from "react-draggable";
function Text() {
  const [toggleState, setToggleState] = useState(false);
  const [textVal, setTextVal] = useState("double click and drag to set...");

  return (
    <Draggable>
      {toggleState ? (
        <input
          type="text"
          className="meme-text-input centered"
          onDoubleClick={() => setToggleState(false)}
          onChange={(event) => setTextVal(event.target.value)}
          placeholder="Text"
        />
      ) : (
        <h2 className="centered" onDoubleClick={() => setToggleState(true)}>
          {textVal}
        </h2>
      )}
    </Draggable>
  );
}

export default Text;
