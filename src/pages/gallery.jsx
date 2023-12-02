import React, { useState } from 'react';
import {app, db, storage, auth} from '../functions/firebase';
import { query, collection, getDocs, doc} from 'firebase/firestore';

const Gallery = () => {

  const [data, setData] = useState([]);

  const q = query(collection(db, "pictures"));

  const querySnapshot = getDocs(q);
  querySnapshot.forEach((doc) => {
    setData(prevState => [...prevState, doc]);
  });

  return (
    <div>
      gallery
      <p>{data}</p>
    </div>

  )
}

export default Gallery