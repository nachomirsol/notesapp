import React from "react";
import TodoItem from "../TodoItem/TodoItem";

const NotesBoard = ({
  title,
  subtitle,
  removeItem,
  editNote,
  todoList,
  toPending,
  border
}) => (
  <div className="column is-4">
    <section className="section">
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">{subtitle}</h2>

      <div className={`box ${border}`}>
        <article className="media">
          <div className="media-content">
            {todoList.length
              ? todoList.map((element, index) => (
                  <TodoItem
                    key={index}
                    todoList={todoList[index]}
                    removeNote={removeItem}
                    editNote={editNote}
                  />
                ))
              : "No hay resultados"}
          </div>
        </article>
      </div>
    </section>
  </div>
);

export default NotesBoard;
