import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import Droppable from "./components/droppable";
import Draggable from "./components/draggable";
import { containers, customStyles, list } from "../../utils/constants";
import Add from "../../assets/add.png";
import Modal from "react-modal";
import Form from "./components/form";

function Home() {
  const [taskList, setTaskList] = useState(list);

  const [showModal, setShowModal] = useState(false);

  function handleDragEnd(event) {
    const { over, active } = event;
    setTaskList((list) =>
      list.map((task) => {
        return active.id === task.id ? { ...task, draggedIn: over?.id } : task;
      })
    );
  }

  const onSave = (task) => {
    setTaskList((tasks) => [{ id: tasks.length, title: task }, ...tasks]);
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1 className="title">Kanban</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="content">
          <aside className="draggable-list">
            {taskList.map((task, idx) => {
              if (!task?.draggedIn) {
                return (
                  <Draggable id={task.id} key={idx}>
                    {task.title}
                  </Draggable>
                );
              }
            })}
            <button className="add-task" onClick={() => setShowModal(true)}>
              <img src={Add} style={{ width: 20, height: 20 }} />
              Add new task
            </button>
          </aside>
          <main className="droppable-section">
            {containers.map(({ id, label }) => (
              <Droppable key={id} id={id} label={label}>
                {taskList.map((task, idx) => {
                  if (id === task.draggedIn) {
                    return (
                      <Draggable id={task.id} key={idx}>
                        {task.title}
                      </Draggable>
                    );
                  }
                })}
              </Droppable>
            ))}
          </main>
        </div>
      </DndContext>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        <Form closeModal={() => setShowModal(false)} onSave={onSave} />
      </Modal>
    </div>
  );
}

export default Home;
