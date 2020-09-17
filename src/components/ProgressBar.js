import React, { useEffect } from "react";
import useStorage from "../firebase/useStorage";

function ProgressBar({
  image,
  setImage,
  user,
  caption,
  setUpload,
  setCaption,
}) {
  const { url, progress, error } = useStorage(image, user, caption);

  useEffect(() => {
    if (url) {
      setImage(null);
      setUpload(false);
      setCaption("");
    }
  }, [url]);

  return (
    <React.Fragment>
      <div className="img__upload__progress">
        <div style={{ width: progress + "%" }}></div>
      </div>
    </React.Fragment>
  );
}

export default ProgressBar;
