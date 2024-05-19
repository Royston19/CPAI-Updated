// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE3ugHiUUoqbXzsRkaZ6SpRyqCFUU9VO0",
  authDomain: "cpai-b8b49.firebaseapp.com",
  projectId: "cpai-b8b49",
  storageBucket: "cpai-b8b49.appspot.com",
  messagingSenderId: "523456407093",
  appId: "1:523456407093:web:2c3280280fbf0c228e337c",
  measurementId: "G-K10JS2Q8XR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
 const storage = getStorage();


export { firebaseApp, db , storage};