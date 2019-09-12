import React, { Component } from "react";
import swal from "sweetalert2";
import axios from "axios";
import "bulma/css/bulma.css";
import "../../App.css";
import Header from "../../components/Header/Header";
import NotesBoard from "../../components/NotesBoard/NotesBoard";
import CreateNoteBoard from "../../components/CreateNoteBoard/CreateNoteBoard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      doneList: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/notes/todo")
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => err);

    axios
      .get("/api/notes/done")
      .then(res => this.setState({ doneList: res.data }))
      .catch(err => err);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createNote = newNote => {
    console.log(newNote);
    axios
      .post("http://localhost:5000/api/notes/todo", {
        empresa: newNote.empresa,
        contacto: newNote.contacto,
        email: newNote.email,
        telefono: newNote.telefono,
        concepto: newNote.concepto,
        fecha: newNote.fecha,
        hora: newNote.hora
      })
      .then(res => console.log(res.data));

    this.setState({
      // todoList: this.state.todoList.concat(newNote)
      todoList: [...this.state.todoList, newNote]
    });
  };

  removeItem = (id, estado) => {
    axios
      .put("http://localhost:5000/api/notes/todo/" + id, { estado: estado })
      .then(res => console.log(res.data));

    const findTask = this.state.todoList.find(elm => elm.id === id);

    this.setState({
      todoList: this.state.todoList.filter(elm => elm.id !== id),
      doneList: this.state.doneList.concat(findTask)
    });
  };

  removeDone = id => {
    axios
      .delete("http://localhost:5000/api/notes/delete/" + id)
      .then(res => console.log(res.data));

    const taskDone = this.state.doneList.filter(elm => elm.id !== id);
    this.setState({
      doneList: taskDone
    });
  };

  toPending = (id, estado) => {
    axios
      .put("http://localhost:5000/api/notes/done/" + id, { estado: estado })
      .then(res => console.log(res.data));

    const findTask = this.state.doneList.find(elm => elm.id === id);
    this.setState({
      todoList: this.state.todoList.concat(findTask),
      doneList: this.state.doneList.filter(elm => elm.id !== id)
    });
  };

  removeSwalDone = id => {
    swal({
      title: "¿Está seguro de eliminar la nota?",
      text: "Ya no podrá recuperearla",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        swal("Nota eliminada correctamente!");
        this.removeDone(id);
      } else {
        swal("No se ha podido eliminar");
      }
    });
  };

  updateNote = (
    id,
    empresa,
    contacto,
    email,
    telefono,
    concepto,
    fecha,
    hora
  ) => {
    const updatedNote = {
      id: id,
      empresa: empresa,
      contacto: contacto,
      email: email,
      telefono: telefono,
      concepto: concepto,
      fecha: new Date()
        .toISOString()
        .slice(0, 10)
        .replace("T", " "),
      hora: new Date()
        .toISOString()
        .slice(11, 19)
        .replace("T", " ")
    };
    const findIndex = this.state.todoList.findIndex(elm => elm.id === id);

    const newList = this.state.todoList;
    newList[findIndex] = updatedNote;

    axios
      .put("http://localhost:5000/api/notes/todo/edit/" + id, {
        id,
        empresa,
        contacto,
        email,
        telefono,
        concepto,
        fecha,
        hora
      })
      .then(res => console.log(res.data));

    console.log(updatedNote);

    this.setState({
      todoList: newList
    });
  };

  editNote = (id, empresa, contacto, email, telefono, concepto) => {
    swal({
      title: "Actualizar nota",

      html:
        `<input id="empresa" class="swal2-input" value="${empresa}" placeholder="empresa">` +
        `<input id="contacto" class="swal2-input" value="${contacto}" placeholder="contacto">` +
        `<input id="email" class="swal2-input" value="${email}" placeholder="email">` +
        `<input id="telefono" class="swal2-input" value="${telefono}" placeholder = "telefono">` +
        `<input id="concepto" class="swal2-input" value="${concepto}" placeholder = "concepto">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          empresa: document.getElementById("empresa").value,
          contacto: document.getElementById("contacto").value,
          email: document.getElementById("email").value,
          telefono: document.getElementById("telefono").value,
          concepto: document.getElementById("concepto").value,
          fecha: new Date()
            .toISOString()
            .slice(0, 10)
            .replace("T", " "),
          hora: new Date()
            .toISOString()
            .slice(11, 19)
            .replace("T", " ")
        };
      }
    })
      .then(res => {
        if (res.value) {
          swal("Nota actualizada correctamente!");

          this.updateNote(
            id,
            res.value.empresa,
            res.value.contacto,
            res.value.email,
            res.value.telefono,
            res.value.concepto,
            res.value.fecha,
            res.value
          );
        } else {
          swal("No se ha actualizado");
        }
      })
      .catch(err => {
        console.log("horror");
      });
  };

  updateDone = (id, empresa, contacto, email, telefono, concepto) => {
    const updatedDone = {
      id: id,
      empresa: empresa,
      contacto: contacto,
      email: email,
      telefono: telefono,
      concepto: concepto,
      fecha: new Date()
        .toISOString()
        .slice(0, 10)
        .replace("T", " "),
      hora: new Date()
        .toISOString()
        .slice(11, 19)
        .replace("T", " ")
    };

    const findIndex = this.state.doneList.findIndex(elm => elm.id === id);

    const newList = this.state.doneList;
    newList[findIndex] = updatedDone;

    axios
      .put("http://localhost:5000/api/notes/done/edit/" + id, {
        id,
        empresa,
        contacto,
        email,
        telefono,
        concepto
      })
      .then(res => console.log(res.data));

    console.log(updatedDone);

    this.setState({
      doneList: newList
    });
  };

  editDone = (id, empresa, contacto, email, telefono, concepto) => {
    swal({
      title: "Actualizar nota",

      html:
        `<input id="empresa" class="swal2-input" value="${empresa}" placeholder="empresa">` +
        `<input id="contacto" class="swal2-input" value="${contacto}" placeholder="contacto">` +
        `<input id="email" class="swal2-input" value="${email}" placeholder="email">` +
        `<input id="telefono" class="swal2-input" value="${telefono}" placeholder = "telefono">` +
        `<input id="concepto" class="swal2-input" value="${concepto}" placeholder = "concepto">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          empresa: document.getElementById("empresa").value,
          contacto: document.getElementById("contacto").value,
          email: document.getElementById("email").value,
          telefono: document.getElementById("telefono").value,
          concepto: document.getElementById("concepto").value
        };
      }
    })
      .then(res => {
        if (res.value) {
          swal("Nota actualizada correctamente!");

          this.updateDone(
            id,
            res.value.empresa,
            res.value.contacto,
            res.value.email,
            res.value.telefono,
            res.value.concepto
          );
        } else {
          swal("No se ha actualizado");
        }
      })
      .catch(err => {
        console.log("horror");
      });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <div className="columns">
            <CreateNoteBoard
              title={"Crear Nota"}
              subtitle={"Rellena los datos"}
              onChange={this.onChange}
              createNote={this.createNote}
            />

            <NotesBoard
              title={"Notas"}
              subtitle={"Notas Pendientes"}
              removeItem={this.removeItem}
              editNote={this.editNote}
              todoList={this.state.todoList}
              border={"todo"}
            />

            <NotesBoard
              title={"Notas"}
              subtitle={"Notas Realizadas"}
              removeItem={this.removeSwalDone}
              editNote={this.editDone}
              todoList={this.state.doneList}
              toPending={this.toPending}
              border={"done"}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
