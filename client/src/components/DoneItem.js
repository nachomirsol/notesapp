import React from 'react';

function DoneItem(props) {

    const { empresa, contacto, email, telefono, concepto } = props.doneList;

    return (

        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {empresa}
                </p>

                <button type="button" className="button is-warning" onClick={() => props.toPending(props.doneList.id)}>P</button>
                <button type="button" className="button is-info">Edit</button>
                <button type="button" className="button is-danger" onClick={() => props.removeDone(props.doneList.id)}>X</button>
                

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

                    <br />
                </div>
            </div>
            
        </div>
    )

}

export default DoneItem