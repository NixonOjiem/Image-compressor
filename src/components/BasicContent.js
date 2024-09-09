import React, { useState } from 'react';
import picture from '../Pics/icons8-picture-64.png';
import imageCompression from 'browser-image-compression';

function BasicContent() {
  const [fileNames, setFileNames] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFileNames = [...fileNames];

    for (let i = 0; i < files.length; i++) {
      newFileNames.push(files[i].name);
    }

    setFileNames(newFileNames);
  };

  const handleCompress = async () => {
    setLoading(true);
    const compressedFilesList = [];

    for (let i = 0; i < fileNames.length; i++) {
      const file = await fetchFile(fileNames[i]);
      const compressedFile = await compressImage(file);
      compressedFilesList.push(compressedFile);
    }

    setCompressedFiles(compressedFilesList);
    setLoading(false);
  };

  const fetchFile = (fileName) => {
    return new Promise((resolve, reject) => {
      const fileInput = document.getElementById('imageInput');
      const file = Array.from(fileInput.files).find((file) => file.name === fileName);
      resolve(file);
    });
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };

      imageCompression(file, options)
        .then((compressedFile) => {
          resolve(compressedFile);
        })
        .catch((error) => {
          reject(error);
        });
    });
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
        <img src={picture} />
      </div>
      <div id="file-names">Files uploaded: {fileNames.join(', ')}</div>
      <button className='Compress-Button' onClick={handleCompress} disabled={loading}>
        {loading ? 'Compressing...' : 'Compress Image'}
      </button>
      {compressedFiles.length > 0 && (
        <div>
          <h3>Compressed Files:</h3>
          <ul>
            {compressedFiles.map((file, index) => (
              <li key={index} className='My-compressed-list'>
                <a href={URL.createObjectURL(file)} download={file.name}>
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BasicContent;