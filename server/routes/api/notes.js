
const express = require('express');
const router = express.Router();

const conexionDB = require('../../models/connection'); 


router.get('/todo',(request,response) => {
    
    conexionDB.query('SELECT * FROM notas WHERE estado="0"', (error,result) =>{
        if(error) throw error;
        response.json(result);
    });
});

router.get('/done',(request,response) => {
    
    conexionDB.query('SELECT * FROM notas WHERE estado="1"', (error,result) =>{
        response.json(result);
        
    });
});


router.post('/todo',(request,response) => {

    let {body} = request;

    conexionDB.query('INSERT INTO notas set ?',body, (error, result) => {
        if(error) throw error;
         response.status(201).send(JSON.stringify(result));
         //response.send(JSON.stringify(result));
    });

});


router.put('/todo/:id', (request,response) => {
    const {id} = request.params;

    conexionDB.query('UPDATE notas SET estado = ? WHERE id= ?', [1,id], (error,result) => {
        if(error) throw error;
        response.send('Note passed to done');
    })
})


router.put('/done/:id', (request,response) => {
    const {id} = request.params;

    conexionDB.query('UPDATE notas SET estado = ? WHERE id= ?', [0,id], (error,result) => {
        if(error) throw error;
        response.send('Note passed to pending todo');
    })
})

router.delete('/delete/:id', (request,response) => {
    const {id} = request.params;
    conexionDB.query('DELETE FROM notas WHERE id = ?', id, (error, result) => {
        if(error) throw error;
        response.send('Note deleted')
    })
})

router.put('/todo/edit/:id' , (request,response) => {
    const {id} = request.params;
    const {body} = request
    conexionDB.query('UPDATE notas SET empresa = ? , contacto = ?, email = ?, telefono = ?, concepto = ? , fecha = ? , hora = ? WHERE id = ?',[body.empresa,body.contacto,body.email,body.telefono,body.concepto,body.fecha,body.hora,id], (error,result) => {
        if(error) throw error;
        response.send('Note updated successfully');
    })
})

router.put('/done/edit/:id' , (request,response) => {
    const {id} = request.params;
    const {body} = request
    conexionDB.query('UPDATE notas SET empresa = ? , contacto = ?, email = ?, telefono = ?, concepto = ? WHERE id = ?',[body.empresa,body.contacto,body.email,body.telefono,body.concepto,id], (error,result) => {
        if(error) throw error;
        response.send('Note done updated successfully');
    })
})

module.exports = router;