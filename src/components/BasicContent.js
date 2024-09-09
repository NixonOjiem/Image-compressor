import React, { useState } from 'react';

function BasicContent() {
  const [fileNames, setFileNames] = useState('');

  const handleFileChange = (event) => {
    const files = event.target.files;
    let fileNamesList = '';

    for (let i = 0; i < files.length; i++) {
      fileNamesList += `${files[i].name} `;
    }

    setFileNames(fileNamesList);
  };

  return (
    <div className='Introduction-content'>
      <h2>An image compressor app</h2>
      <p>
        This app compresses images to reduce their
        file size while maintaining their quality.
      </p>
      <div className='triangle-input'>
        <input type="file" id="imageInput" accept="image/*" multiple onChange={handleFileChange} />
      </div>
      <div id="file-names">You've added: {fileNames}</div>
    </div>
  );
}

export default BasicContent;