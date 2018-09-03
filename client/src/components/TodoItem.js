import React from 'react';

function TodoItem(props) {

    const { fecha, hora, empresa, contacto, email, telefono, concepto, estado=1 } = props.todoList;

    return (

        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    <small>{fecha} {hora} <br/>{empresa}</small>
                </p>
                <button type="button" className="button is-info" onClick={() => props.editNote(props.todoList.id, props.todoList.empresa, props.todoList.contacto, props.todoList.email, props.todoList.telefono, props.todoList.concepto)}>Edit</button>
                <button type="button" className="button is-success" onClick={() => props.removeNote(props.todoList.id,props.todoList.estado)}>&#10004;</button>

                <a href="/" className="card-header-icon" aria-label="more options">
                    <span className="icon">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </a>
            </header>
            <div className="card-content">
                <div className="content">
                    Contacto: {contacto} <br />
                    Email:  <a href="/">{email}</a> <br />
                    Teléfono: <a href="/">{telefono}</a><br />
                    Concepto: {concepto}

                </div>
            </div>
        </div>
    )

}

export default TodoItem