// import React from 'react';
import React, { Component } from 'react';


class Formulario extends Component {
    constructor() {
        super()
        this.state = {
            id: "",
            fecha: "",
            hora: "",
            empresa: "",
            contacto: "",
            email: "",
            telefono: "",
            concepto: "",
            estado:""
        }
    }

    createNote = (e) => {
        e.preventDefault();
        //const fecha = new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear();
        const hora = new Date().getHours() + ":" + new Date().getMinutes();


        const newNote = {
            id: Date.now().toString(),
            fecha: new Date().toISOString().slice(0, 10).replace('T', ' '),
            hora: new Date().toISOString().slice(11, 19).replace('T', ' '),
            empresa: this.state.empresa,
            contacto: this.state.contacto,
            email: this.state.email,
            telefono: this.state.telefono,
            concepto: this.state.concepto,
            estado:0
        }

        this.props.createNote(newNote)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form onSubmit={this.createNote}>
                <div className="field">
                    <label className="label">Empresa</label>

                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Text input"
                            name="empresa"
                            onChange={this.onChange}

                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Persona de contacto</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            type="text"
                            placeholder="Nombre de la persona"
                            name="contacto"
                            onChange={this.onChange}

                        />

                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={this.onChange}

                        />

                    </div>
                </div>

                <div className="field">
                    <label className="label">Teléfono</label>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input"
                            type="tel"
                            placeholder="Teléfono"
                            name="telefono"
                            onChange={this.onChange}

                        />
                    </div>

                </div>

                <div className="field">
                    <label className="label">Concepto</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Textarea"
                            name="concepto"
                            onChange={this.onChange}

                        >
                        </textarea>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type="submit" >Guardar</button>
                    </div>
                    <div className="control">
                        <button className="button is-text">Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default Formulario;