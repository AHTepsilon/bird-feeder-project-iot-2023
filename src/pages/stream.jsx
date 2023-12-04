import React, {useEffect, useState, useRef} from 'react';
import { db, storage } from '../functions/firebase';
import { uploadBytes, ref } from 'firebase/storage';
import "./stream.css";

const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

}

const Stream = () => {

  const [streamUrl, setStreamUrl] = useState("http://172.20.10.4:81/stream"); /*Poner IP entre las comillas*/

  const referenceImgView = useRef(null);
  
  const getData = () => {
    const view = referenceImgView.current;
    const filePath = `data/photo.jpg`;
    const fileRef = ref(storage, filePath);

    var canvas = document.createElement("canvas");
      canvas.width = view.width;
      canvas.height = view.height;
      document.body.appendChild(canvas);
      var context = canvas.getContext('2d');
      context.drawImage(view,0,0);
      try {
        var dataURL = canvas.toDataURL('image/jpeg');
        var saveButton = document.createElement("a");

        saveButton.href = dataURL;
        var d = new Date();
        saveButton.download = d.getFullYear() + ("0"+(d.getMonth()+1)).slice(-2) + ("0" + d.getDate()).slice(-2) + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2) + ("0" + d.getSeconds()).slice(-2) + ".jpg";
        uploadBytes(fileRef, dataURItoBlob(dataURL));
        saveButton.click();
      } catch (e) {
        console.error(e);
      }
      canvas.parentNode.removeChild(canvas);
  }

  return (
    <>
      <h1>Bird feeder</h1>
      <figure>
        <div id="stream-container" className="image-container">
          <img id="stream" className="feed" ref={referenceImgView} src={streamUrl} crossOrigin="anonymous"/>
          <button onClick={getData}>Jopla</button>
        </div>
      </figure>
    </>
  )
}

export default Stream;