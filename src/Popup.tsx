import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '400px',
        minHeight: '200px',
    },
};

interface ModalProps {
    showModal: boolean;
    closeModal: () => void;
    fileList: FileList | null;
}

const PopupModal = ({showModal, closeModal, fileList}:ModalProps) => {

    const display = (files: FileList | null) => {
        if (files) {
            return Object.entries(files).map(([string, file], idx) => {
                return (
                    <div key={idx}>
                        <span>{file.name} - </span>
                        <span>{file.type} </span>
                    </div>
                )
            })
        }
    }

    return (
        <div>
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <h3>File List</h3>
                <div>
                    { fileList ? display(fileList) : 'No files' }
                </div>
            </Modal>
        </div>
    );
}

export default PopupModal;