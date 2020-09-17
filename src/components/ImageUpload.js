import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

function ImageUpload({ user }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(null);
  const [upload, setUpload] = useState(false);

  const fileInputChangeHandler = (e) => {
    const file = e.target.files[0];
    const types = ["image/png", "image/jpeg"];

    if (types.includes(file.type)) {
      setImage(file);
    } else {
      alert("Please Upload a valid Photo!");
    }
  };

  const onUpload = (e) => {
    setUpload(true);

    // Clearing caption input value
    document.querySelector("#caption__input").value = "";
  };

  return (
    <div className="img__upload">
      {image && <section className="img__upload__name">{image.name}</section>}

      {image && upload && (
        <ProgressBar
          image={image}
          setImage={setImage}
          setUpload={setUpload}
          user={user}
          caption={caption}
          setCaption={setCaption}
        />
      )}

      <section className="img__upload__inputs">
        <label htmlFor="file">+</label>
        <input type="file" id="file" onChange={fileInputChangeHandler} />
        <input
          type="text"
          placeholder="Type caption here..."
          id="caption__input"
          onChange={(e) => setCaption(e.target.value)}
        />
        <input type="button" value="Upload Image" onClick={onUpload} />
      </section>
    </div>
  );
}

export default ImageUpload;
