import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {app, db, storage} from "./functions/firebase.js"
import './App.css'

function GetPicture(){
  // Reference to Picture Storage Path
const storageRef = ref(storage);
var imgRef = storageRef.child('data/photo.jpg');

firebase.auth().signInAnonymously().then(function() {

  imgRef.getDownloadURL().then(function(url){
    // `url` is the download URL for 'data/photo.jpg'
    document.querySelector('img').src = url;
    
  }).catch(function(error) {
    console.error(error);
  });
});

imgRef.getMetadata()
  .then((metadata) => {
    console.log(metadata);
    date = new Date(metadata.timeCreated);
    console.log(date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    var time = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    var writtenDate = (date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    document.getElementById("date-time").innerHTML = time + " at " + writtenDate;
  })
  .catch((error)=> {
    console.error(error);
  });
}

function App() {
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
