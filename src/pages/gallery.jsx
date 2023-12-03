import React, { useState, useEffect } from 'react';
import { app, db, storage, auth } from '../functions/firebase';
import { collection, query, getDocs } from "firebase/firestore";
import './gallery.css';

const Gallery = () => {
  const [picturesList, setPicturesList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "pictures"));
      const list = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      })

      setPicturesList(list); 
    }

    getData();
  }, []); 

  return (
    <div className='container'>
      <h1 className='title'>Galería de fotos</h1>
      <ul className='list'>
        {picturesList.map((picture, index) => (
          <li className='list-item' key={index}>
            <img className='list-item-img' src={picture.url} alt={`Picture ${index}`} />
            <p className='list-item-img-p'>Tomada el {(picture.date)} a las {(picture.time)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Gallery;