import { useEffect, useState } from "react";
import { db } from "./config";

function useFirestore(collection) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const unsub = db
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.docs.forEach((doc) => {
          documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setResult(documents);
      });

    return () => {
      unsub();
    };
  }, [collection]);

  return result;
}

export default useFirestore;
