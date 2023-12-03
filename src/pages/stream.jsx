import React, {useEffect, useState} from 'react';

const Stream = () => {

  const [streamUrl, setStreamUrl] = useState(""); /*Poner IP entre las comillas*/

  return (
    <>
      <h1>Bird feeder</h1>
      <div className='container'>
        <img src={streamUrl}></img>
        {streamUrl == "" && <p>Video no disponible</p>}
      </div>
    </>
  )
}

export default Stream