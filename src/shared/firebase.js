import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-l737Ne32lhlzrGL44xWCk5mtcEiTR2w",
  authDomain: "my-magazine-93e2a.firebaseapp.com",
  projectId: "my-magazine-93e2a",
  storageBucket: "my-magazine-93e2a.appspot.com",
  messagingSenderId: "971805281648",
  appId: "1:971805281648:web:4f23703a87294f11d613b5",
  measurementId: "G-MS6H1B2KVX",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const { apiKey } = firebaseConfig;

export { auth, apiKey, firestore, storage };
export default firebase;
