import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import swal from "sweetalert2";
import axios from "axios";
import "bulma/css/bulma.css";
import "../../App.css";
import Header from "../../components/Header/Header";
import NotesBoard from "../../components/NotesBoard/NotesBoard";
import CreateNoteBoard from "../../components/CreateNoteBoard/CreateNoteBoard";

const Home = () => {
  const [name, setName] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/notes/todo")
      .then(res => setTodoList(res.data))
      .catch(err => err);

    axios
      .get("/api/notes/done")
      .then(res => setDoneList(res.data))
      .catch(err => err);
  }, []);

  const createNote = newNote => {
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

    setTodoList([...todoList, newNote]);
  };

  const removeItem = (id, estado) => {
    axios
      .put("http://localhost:5000/api/notes/todo/" + id, { estado: estado })
      .then(res => console.log(res.data));

    const findTask = todoList.find(elm => elm.id === id);

    setTodoList(todoList.filter(elm => elm.id !== id));
    setDoneList(doneList.concat(findTask));
  };

  const removeDone = id => {
    axios
      .delete("http://localhost:5000/api/notes/delete/" + id)
      .then(res => console.log(res.data));

    const taskDone = doneList.filter(elm => elm.id !== id);

    setDoneList(taskDone);
  };

  const toPending = (id, estado) => {
    axios
      .put("http://localhost:5000/api/notes/done/" + id, { estado: estado })
      .then(res => console.log(res.data));

    const findTask = doneList.find(elm => elm.id === id);

    setTodoList(todoList.concat(findTask));
    setDoneList(doneList.filter(elm => elm.id !== id));
  };

  const removeSwalDone = id => {
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
        removeDone(id);
      } else {
        swal("No se ha podido eliminar");
      }
    });
  };

  const edit = (id, empresa, contacto, email, telefono, concepto) => {
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

          update(
            id,
            res.value.empresa,
            res.value.contacto,
            res.value.email,
            res.value.telefono,
            res.value.concepto,
            res.value.fecha,
            res.value,
            todoList
          );
        } else {
          swal("No se ha actualizado");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const update = (
    id,
    empresa,
    contacto,
    email,
    telefono,
    concepto,
    fecha,
    hora,
    list
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
    const findIndex = list.findIndex(elm => elm.id === id);

    const newList = list;
    newList[findIndex] = updatedNote;

    console.log("newList");

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
    setTodoList(newList);
  };

  return (
    <div className="home">
      <div className="container">
        <Header />
        <div className="columns">
          <CreateNoteBoard
            title={"Crear Nota"}
            subtitle={"Rellena los datos"}
            onChange={e => setName(e.target.value)}
            createNote={createNote}
          />

          <NotesBoard
            title={"Notas"}
            subtitle={"Notas Pendientes"}
            removeItem={removeItem}
            edit={edit}
            list={todoList}
            border={"todo"}
          />

          <NotesBoard
            title={"Notas"}
            subtitle={"Notas Realizadas"}
            removeItem={removeSwalDone}
            edit={edit}
            list={doneList}
            toPending={toPending}
            border={"done"}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
