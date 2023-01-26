import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <article className="flow-container" ref={setNodeRef}>
      <header className="flow-header">
        <span className="flow-title">{props.label}</span>
      </header>
      <main className="flow-content">{props.children}</main>
    </article>
  );
}
