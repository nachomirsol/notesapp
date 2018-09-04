import React, { Component } from 'react';
import swal from 'sweetalert2';
import axios from 'axios';
import 'bulma/css/bulma.css';
import './App.css';
import Header from './components/Header';
import Formulario from './components/Formulario';
import TodoItem from './components/TodoItem';
import DoneItem from './components/DoneItem';

class App extends Component {

  constructor(){
    super()
    this.state = {
      todoList:[],
      doneList:[]
    }
  }

  componentDidMount(){
    // Get data from the local storage
    /* LOCAL STORAGE
    // Get data from the local storage
    const todoListLS = localStorage.getItem('todoList');
    const doneListLS = localStorage.getItem('doneList');
    if(todoListLS){
      this.setState({
        todoList:JSON.parse(todoListLS)
      })
    }

    if(doneListLS){
      this.setState({
        doneList:JSON.parse(doneListLS)
      })
    }
  */
 
    axios.get('/api/notes/todo')
      .then(res => this.setState({todoList:res.data}))
      .catch(err => err)

    axios.get('/api/notes/done')
    .then(res => this.setState({doneList:res.data}))
    .catch(err => err)
  
  }

  componentDidUpdate(){
    // Keep data to local storage
    // Set item to create and keep to storage
    // localStorage.setItem('todoList',JSON.stringify(this.state.todoList))
    // localStorage.setItem('doneList',JSON.stringify(this.state.doneList))

  }

  onChange = (e) => {
    this.setState({[e.target.name] : e.target.value});
  }

  createNote = (newNote) => {

   console.log(newNote);
    axios.post('http://localhost:5000/api/notes/todo', {
      empresa:newNote.empresa,
      contacto:newNote.contacto,
      email:newNote.email,
      telefono:newNote.telefono,
      concepto:newNote.concepto
    })
      .then(res => console.log(res.data))

      this.setState({
        // todoList: this.state.todoList.concat(newNote)
        todoList: [...this.state.todoList,newNote]
      })

  }

  removeItem = (id,estado) => {

    axios.put('http://localhost:5000/api/notes/todo/'+id,{
      estado:estado
    })
      .then(res => res.data)

    const findTask = this.state.todoList.find(elm => elm.id === id);
    
    this.setState({
      todoList: this.state.todoList.filter(elm => elm.id !== id ),
      doneList: this.state.doneList.concat(findTask)
    })
  }

  removeDone = (id) => {
    const taskDone = this.state.doneList.filter(elm => elm.id !== id )
    this.setState({
      doneList: taskDone
    })
  }

  toPending = (id) => {
    const findTask = this.state.doneList.find(elm => elm.id === id);
    this.setState({
      todoList: this.state.todoList.concat(findTask),
      doneList: this.state.doneList.filter(elm => elm.id !== id )
    })
  }

  removeSwalDone = (id) => {
    swal({
      title: '¿Está seguro de eliminar la nota?',
      text: "Ya no podrá recuperearla",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    })
    .then((result) => {
      if (result.value) {
        swal(
          'Nota eliminada correctamente!',
        )
        this.removeDone(id)
      } else {
        swal(
          'Operación cancelada',
        )
      }
    })
  }

  updateNote = (id,empresa,contacto,email,telefono,concepto) => {

   // const findTaskToUpdate = this.state.listTodo.find(elm => elm.id === id );
    const fecha = new Date().getDate()+"-"+(new Date().getMonth() + 1)+"-"+new Date().getFullYear();
    const hora = new Date().getHours()+":"+new Date().getMinutes();

    const updatedNote = {
      id:id,
      fecha: fecha,
      hora:hora,
      empresa: empresa,
      contacto:contacto,
      email:email,
      telefono:telefono,
      concepto:concepto
    }

    console.log(updatedNote);

  }
      
  editNote = (id,empresa,contacto,email,telefono,concepto) => { 

    swal({
       title: 'Actualizar nota',
       
       html:
           `<input id="empresa" class="swal2-input" value="${empresa}" placeholder="empresa">` +
           `<input id="contacto" class="swal2-input" value="${contacto}" placeholder="contacto">` +
           `<input id="email" class="swal2-input" value="${email}" placeholder="email">` +
           `<input id="telefono" class="swal2-input" value="${telefono}" placeholder = "telefono">` +
           `<input id="concepto" class="swal2-input" value="${concepto}" placeholder = "concepto">`,
       focusConfirm: false,
       preConfirm: () => {
           return {
               empresa: document.getElementById('empresa').value,
               contacto: document.getElementById('contacto').value,
               email: document.getElementById('email').value,
               telefono: document.getElementById('telefono').value,
               concepto: document.getElementById('concepto').value,
           }
       }
   }).then(res => {
       this.updateNote(
           id,
           res.value.empresa,
           res.value.contacto,
           res.value.email,
           res.value.telefono,
           res.value.concepto
       )
   })
   .catch(err => {
       console.log('horror')
   })
}

  render() {
 
    return (
      <div className="App">
        <div className="container">
        <Header />
         <div className="columns">
            <div className="column is-4">
              <section className="section">
                  <h1 className="title">Crear Nota</h1>
                  <h3 className="subtitle">
                    Rellena los datos
                  </h3>

                  <div className="box">
                    <article className="media">
                      <div className="media-content">
                        <div className="content">
                          <Formulario 
                            onChange = {this.onChange}
                            createNote = {this.createNote}
                          />
                        </div>
                      </div>
                    </article>
                  </div>
              </section>
            </div>

            <div className="column is-4">
            <section className="section">     
                <h1 className="title">Notas</h1>
                <h2 className="subtitle">
                  Notas Pendientes
                </h2>

                <div className="box todo">
                    <article className="media">
                      <div className="media-content">

                      {this.state.todoList.length ? this.state.todoList.map((element,index) => ( 
                          <TodoItem  
                            key = {index}
                            todoList = {this.state.todoList[index]}
                            removeNote = {this.removeItem}
                            editNote = {this.editNote}
                          />
                      )) : "No hay resultados"}
                      
                      </div>
                    </article>
                </div>
            </section>
            </div>

            <div className="column is-4">
            <section className="section">   
                <h1 className="title">Notas</h1>
                <h2 className="subtitle">
                  Atendidas
                </h2>
                <div className="box done ">
                    <article className="media">
                      <div className="media-content">

                      {this.state.todoList.length ? this.state.doneList.map((element,index) => ( 
                          <DoneItem  
                            key = {index}
                            doneList = {this.state.doneList[index]}
                            removeDone = {this.removeSwalDone}
                            toPending = {this.toPending}
                          />
                      )): "Sin resultados"}       
                      </div>
                    </article>
                </div>      
            </section>
            </div>
        </div>
        </div>
      </div>
    );
  }
}
export default App;