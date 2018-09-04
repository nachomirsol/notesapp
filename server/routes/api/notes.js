
const express = require('express');
const router = express.Router();

const conexionDB = require('../../models/connection'); 


router.get('/todo',(request,response) => {
    
    conexionDB.query('SELECT * FROM presupuestos.notas WHERE estado="0"', (error,result) =>{
        if(error) throw error;
        response.json(result);
        console.log(result);
    });
});

router.get('/done',(request,response) => {
    
    conexionDB.query('SELECT * FROM presupuestos.notas WHERE estado="1"', (error,result) =>{
        response.json(result);
        
    });
});


router.post('/todo',(request,response) => {

    let body = request.body;

    conexionDB.query('INSERT INTO notas set ?',body, (error, result) => {
        if(error) throw error;
         response.status(201).send(JSON.stringify(result));
         //response.send(JSON.stringify(result));
    });

});


router.put('/todo/:id', (request,response) => {
    const id = request.params.id;

    conexionDB.query('UPDATE notas SET estado = ? WHERE id= ?', [1,id], (error,result) => {
        if(error) throw error;
        response.send('Note passed to done');
    })
})

module.exports = router;