import React from "react";
import "./Modals.css";

type Props = {};

const ConfirmModal = ({ title, message, confirmModal, closeModal }) => {
  return (
    <div className="modal-bgr" onClick={() => closeModal(false)}>
      <div className="modal-container">
        <div className="modal-close-btn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>

        <div className="modal-title">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={confirmModal}>Tak</button>
          <button onClick={() => closeModal(false)}>Nie</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
