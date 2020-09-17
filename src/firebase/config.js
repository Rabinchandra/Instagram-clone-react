import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBbrVNgAbbdp_vU6j3UbziMTP_S0_i4f2s",
  authDomain: "instagram-clone-react-154dc.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-154dc.firebaseio.com",
  projectId: "instagram-clone-react-154dc",
  storageBucket: "instagram-clone-react-154dc.appspot.com",
  messagingSenderId: "626217289160",
  appId: "1:626217289160:web:6058f0e2c8f1e63c2decfd",
  measurementId: "G-9K8RQSH0Z4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, storage, auth, timestamp };
