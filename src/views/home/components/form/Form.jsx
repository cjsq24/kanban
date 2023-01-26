import React, { useState } from "react";
import Close from "../../../../assets/close.png";

const Form = ({ closeModal, onSave }) => {
  const [task, setTask] = useState("");
  return (
    <article className="form-container">
      <header className="form-header">
        <span className="form-title">Add Task</span>
        <button onClick={closeModal} className="form-close-btn">
          <img src={Close} style={{ width: 30, height: 30 }} />
        </button>
      </header>
      <main className="form-content">
        <label>Task name</label>
        <input type="text" onChange={(e) => setTask(e.target.value)} />
      </main>
      <footer className="form-footer">
        <button onClick={closeModal}>Cancel</button>
        <button
          className="form-add-button"
          onClick={() => onSave(task)}
          disabled={task === ""}
        >
          Add
        </button>
      </footer>
    </article>
  );
};

export default Form;
