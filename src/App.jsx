import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {app, db, storage, auth} from "./functions/firebase.js"
import './App.css'
import { signInAnonymously } from 'firebase/auth'
import { ref, getDownloadURL, getMetadata } from 'firebase/storage'

function GetPicture(){
  // Reference to Picture Storage Path
}

function App() {
  const storageRef = ref(storage);
  const imgRef = ref(storage, 'data/photo.jpg');
  
  signInAnonymously(auth)
  .then(() => {
    getDownloadURL(imgRef)
      .then((url) => {
        document.getElementById('img').src = url;
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });

getMetadata(imgRef)
  .then((metadata) => {
    console.log(metadata);
    const date = new Date(metadata.timeCreated);
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const writtenDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    document.getElementById('date-time').innerHTML = `${time} at ${writtenDate}`;
  })
  .catch((error) => {
    console.error(error);
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
