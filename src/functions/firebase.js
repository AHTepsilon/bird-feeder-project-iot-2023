// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYnspKW3YTv99NqeFpKmyz2EGnAYRvRpw",
  authDomain: "bird-feeder-iot.firebaseapp.com",
  projectId: "bird-feeder-iot",
  storageBucket: "bird-feeder-iot.appspot.com",
  messagingSenderId: "959874637725",
  appId: "1:959874637725:web:bf0ebf1d3b7b76be539974",
  measurementId: "G-FZ30SP4RMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, db, storage, auth}