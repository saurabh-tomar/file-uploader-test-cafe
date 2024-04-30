import React, {DragEvent, useRef, useState} from 'react';
import './App.css';

const FileUploader = () => {

  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    inputRef.current?.click();
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragActive(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { files: droppedFileList } = event.dataTransfer;

    console.log(droppedFileList);

    setIsDragActive(false);
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files && event.target.files;
    if (fileList) {
      console.log(fileList);
    }
  };

  return (
      <div>
        <div
            className="DropZone"
            onClick={handleFileUpload}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
          {isDragActive ? 'Drop them here' : 'Drop files here'}
        </div>
        <input
            ref={inputRef}
            style={{display: 'none'}}
            type="file"
            multiple={true}
            onChange={onFileInputChange}
        />
      </div>
  )
}

export default FileUploader;
