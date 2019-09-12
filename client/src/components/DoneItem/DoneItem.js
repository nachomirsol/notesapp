import React from 'react';

function DoneItem(props) {

    const {fecha, hora, empresa, contacto, email, telefono, concepto, estado=0} = props.doneList;

    return (

        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    <small>{fecha.slice(0,10)} {hora} <br/>{empresa}</small>
                </p>

                <button type="button" className="button is-warning" onClick={() => props.toPending(props.doneList.id,estado)}>P</button>
                <button type="button" className="button is-info" onClick = {() => props.editDone(props.doneList.id, props.doneList.empresa, props.doneList.contacto, props.doneList.email, props.doneList.telefono, props.doneList.concepto)}>Edit</button>
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