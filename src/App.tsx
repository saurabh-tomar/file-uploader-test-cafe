import React, {DragEvent, useEffect, useRef, useState} from 'react';
import './App.css';
import PopupModal from "./Popup";

const FileUploader = () => {

  const [isDragActive, setIsDragActive] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [fileList, setFileList] = useState<FileList | null>(null);

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

    setFileList(droppedFileList);

    setIsDragActive(false);
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files && event.target.files;
    if (fileList) {
      setFileList(fileList)
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setFileList(null);
  }

  useEffect(() => {
    if (fileList && fileList.length > 0) setIsOpen(true);
  }, [fileList]);

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
        <PopupModal showModal={modalIsOpen}  closeModal={closeModal} fileList={fileList} />
      </div>
  )
}

export default FileUploader;
