import Modal from "./components/modal";
import "./styles.css";
import React from "react";

export default function App() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button onClick={() => setShowModal(!showModal)}>Open Modal</button>
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        title="Random title"
      >
        <p style={{ margin: 0 }}>
          Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Autem rem sed ducimus est commodi perspiciatis hic dolorum dolorem
          doloribus dolore facere officia, eveniet ut cumque inventore ex unde
          aliquam deleniti.
        </p>
      </Modal>
    </div>
  );
}
