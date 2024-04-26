import React from "react";

const Modal = ({ setShowModal, showModal, title, children, paddingRight }) => {
  const modalRef = React.useRef(null);
  if (showModal) {
    return (
      <>
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onClick={(e) => {
            if (modalRef.current.contains(e.target)) {
              return;
            }
            setShowModal(false);
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "white",
            transform: "translate(-50%, -50%)",
            padding: "20px",
          }}
          ref={modalRef}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ paddingRight: paddingRight || "50px" }}>
              {title || "Modal title"}
            </p>
            <button
              onClick={() => {
                setShowModal(false);
              }}
            >
              &times;
            </button>
          </div>
          {children}
        </div>
      </>
    );
  } else return null;
};

export default Modal;
