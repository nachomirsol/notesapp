import React from "react";

const Item = ({ list, remove, edit }) => {
  const {
    fecha,
    hora,
    empresa,
    contacto,
    email,
    telefono,
    concepto,
    estado = 1
  } = list;

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <small>
            {fecha.slice(0, 10)} {hora} <br />
            {empresa}
          </small>
        </p>
        <button
          type="button"
          className="button is-info"
          onClick={() =>
            edit(
              list.id,
              list.empresa,
              list.contacto,
              list.email,
              list.telefono,
              list.concepto
            )
          }
        >
          Edit
        </button>
        <button
          type="button"
          className="button is-success"
          onClick={() => remove(list.id, list.estado)}
        >
          &#10004;
        </button>

        <a href="/" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          Contacto: {contacto} <br />
          Email: <a href="/">{email}</a> <br />
          Teléfono: <a href="/">{telefono}</a>
          <br />
          Concepto: {concepto}
        </div>
      </div>
    </div>
  );
};

export default Item;
