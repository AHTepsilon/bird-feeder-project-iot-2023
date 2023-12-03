import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {app, db, storage, auth} from "./functions/firebase.js"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import './App.css'
import { signInAnonymously } from 'firebase/auth'
import { ref, getDownloadURL, getMetadata, uploadBytes } from 'firebase/storage'

function uploadData(id, date, time, url){
  console.log(date, time, url);
        setDoc(doc(db, "pictures", id), {
          date: date,
          time: time,
          url: url,
        });
}

function App() {
  const storageRef = ref(storage);
  const imgRef = ref(storage, 'data/photo.jpg');
  const [imgDate, setImgDate] = useState("");
  const [imgTime, setImgTime] = useState("");
  const [imgId, setImgId] = useState("");

  getMetadata(imgRef)
  .then((metadata) => {
    console.log(metadata);
    const date = new Date(metadata.timeCreated);
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const writtenDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    document.getElementById('date-time').innerHTML = `${time} at ${writtenDate}`;

    setImgDate(writtenDate);
    setImgTime(time);
    setImgId(metadata.generation);
  })
  .catch((error) => {
    console.error(error);
  });

  const newFilePath = `data/${imgId}.jpg`;
  const newFileRef = ref(storage, newFilePath);

  signInAnonymously(auth)
  .then(() => {
    getDownloadURL(imgRef)
      .then((url) => {
        document.getElementById('img').src = url;
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
          var file = new File([blob], "image name", { type: blob.type });
          uploadBytes(newFileRef, file);
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
    window.location.reload()
  });

  signInAnonymously(auth)
  .then(() => {
    getDownloadURL(newFileRef)
      .then((url) => {
        uploadData(imgId, imgDate, imgTime, url);
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
    window.location.reload()
  });

  return (
    <>
      <h1>Bird feeder</h1>
      <div className='container'>
      <p><img id="img" width="500px"/></p> 
      <p>Última foto: <span id="date-time"></span></p>
      <button onClick={(e) => {window.location.reload()}}>Recargar página</button>
      </div>
    </>
  )
}

export default App;
