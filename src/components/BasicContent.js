import React, { useState } from 'react';
import picture from '../Pics/icons8-picture-64.png';

function BasicContent() {

    const [fileNames, setFileNames] = useState([]);

    const handleFileChange = (event) => {
      const files = event.target.files;
      const newFileNames = [...fileNames]; // create a copy of the existing file names
    
      for (let i = 0; i < files.length; i++) {
        newFileNames.push(files[i].name);
      }
    
      setFileNames(newFileNames);
    };

  return (
    <div className='Introduction-content'>
      <h2 className='Heading'>An image compressor app</h2>
      <p className='Paragraph'>
        This app compresses images to reduce their
        file size while maintaining their quality. <br />
        You can upload multiple images at once.
      </p>
      <div className='triangle-input'>
        <input type="file" id="imageInput" accept="image/*" multiple onChange={handleFileChange} />
        <img src={picture}></img>
      </div>
      <div id="file-names">Uploaded: {fileNames.join(', ')}</div>
    </div>
  );
}

export default BasicContent;