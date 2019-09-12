import React from "react";
import Formulario from "../Formulario/Formulario";

const CreateNoteBoard = ({ title, subtitle, onChange, createNote }) => {
  return (
    <div className="column is-4">
      <section className="section">
        <h1 className="title">{title}</h1>
        <h3 className="subtitle">{subtitle}</h3>

        <div className="box">
          <article className="media">
            <div className="media-content">
              <div className="content">
                <Formulario onChange={onChange} createNote={createNote} />
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default CreateNoteBoard;
