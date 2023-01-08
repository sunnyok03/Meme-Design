import React, { useState, useEffect, createRef } from "react";
import Text from "./Text.jsx";
import { exportComponentAsJPEG } from "react-component-export-image";

function Meme() {

  const [allMemes, setAllMemes] = useState([]);
  const [memeImg, setMemeImg] = useState("https://i.imgflip.com/30b1gx.jpg");
  const [countText, setCountText] = useState(0);
  const finalRef = createRef();

  function getMemeImg() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const URL = allMemes[randomNumber].url;
    setMemeImg(URL);
  }

  function addText() {
    setCountText(countText + 1);
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
  }, []);

  return (
    <main>
      <div className="main__container">
        {/* top buttons */}
        <div className="new-img__container">
          {/* upload local image */}
          <label className="btn upload-label">
            <input
              onChange={(event) => {
                setMemeImg(URL.createObjectURL(event.target.files[0]));
              }}
              className="upload-image"
              name="Image"
              type="file"
              accept="image/jpeg, image/png"
            />
            Upload Image
          </label>
          {/* get random image */}
          <button onClick={getMemeImg} className="btn">
            Random Image
          </button>
        </div>
        {/* meme image */}
        <div ref={finalRef} className="meme-img__wrapper">
          <img className="meme-image" src={memeImg} alt="meme-img" />
          {Array(countText)
            .fill(0)
            .map((value, index) => (
              <Text key={index} />
            ))}
        </div>
        {/* bottom buttons */}
        <div className="save-add__container">
          <button
            onClick={addText}
            className="btn">
            Add Text
          </button>
          <button
            onClick={() => setCountText(0)}
            className="btn reset">
            Delete Text
          </button>
          <button
            onClick={() => exportComponentAsJPEG(finalRef)}
            className="save btn">
            Save Image
          </button>
        </div>
      </div>
    </main>
  );
}

export default Meme;
