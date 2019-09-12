import React from "react";
import Item from "../Item/Item";

const NotesBoard = ({
  title,
  subtitle,
  removeItem,
  edit,
  list,
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
            {list.length
              ? list.map((element, index) => (
                  <Item
                    key={index}
                    list={list[index]}
                    remove={removeItem}
                    edit={edit}
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
