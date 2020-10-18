import { useState, useEffect } from "react";
import { storage, db, timestamp } from "./config";

function useStorage(file, user, caption) {
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storageRef = storage.ref(file.name);
    const dbRef = db.collection("posts");

    const unsub = storageRef.put(file).on(
      "state_changed",
      (snap) => {
        const percentage = parseInt(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setProgress(percentage);
      },
      (err) => {
        setError(err);
        console.log("Error from useStorage:", err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);

        // Add Data to Firestore
        dbRef.add({
          email: user.email,
          username: user.displayName,
          imgUrl: url,
          caption,
          createdAt: timestamp(),
          likes: []
        });
      }
    );

    return () => {
      unsub();
    };
  }, [file]);

  return { url, progress, error };
}

export default useStorage;
