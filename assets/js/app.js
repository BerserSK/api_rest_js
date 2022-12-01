const express = require('express')
const mysql = require('mysql');
const cors = require('cors')

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;
const app = express();

app.use(bodyParser.json());

app.use(cors()) // :D Todo el mundo! (*)

//const whitelist = ['http://localhost:3050', '']
//app.use(cors({ origin: whitelist }))

//Conexion Mysql
const conexion = mysql.createConnection({
    host:'localhost',
    database:'pokimon',
    user:'root',
    password:''
})

//Rutas
app.get('/', (req, res) => {

    res.send('Retorno de mi API');
});

//<Todos los entrenadores>
app.get('/entrenadores', (req, res) => {

    //resp.send('Retorno de mi API')
    const sql = `SELECT * FROM entrenador`;
    conexion.query(sql, (err, resutl) => {
        if(err) throw error;

        if(resutl.length > 0){
            res.json(resutl);
        }else{
            res.send('No result')
        }
    })
})

//Entrenador por id y password
app.get('/entrenadores/:id/:password', (req, res) => {

    //resp.send('Retorno de mi API')
    const {id} = req.params;
    const {password} = req.params;
    const sql = `SELECT * FROM entrenador WHERE id = ${id} and password = ${password}`;
    conexion.query(sql, (err, resutl) => {
        if(err) throw error;

        if(resutl.length > 0){
            res.json(resutl);
        }else{
            res.send('No result')
        }
    })

})





//Agregar un entrenador
app.post('/entrenadores/add', (req, res) => {


    const sql = `INSERT INTO entrenador SET ? `;

    const entrenadorObj = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        pueblo: req.body.pueblo,
        password: req.body.password
    }

    conexion.query(sql, entrenadorObj, error => {
        if(error) throw error;
        res.send('Customer Created!');
    })
})
/*app.post('/entrenadores/add', (req, res) => {
    const nuevoEntrenador = req.body:

    const entrenadorObj = {
        name: req.body.nombre,
        age: req.body.edad
    }

    conexion.query(sql, entrenadorObj, error => {
        if(error) throw error;
        res.send('Customer Created!');
    })
})*/

//Actualizar Entrenador
app.put('/update/:id', (req, res) => {
    const {id } = req.params;
    const {nombre, edad} = req.body;
    const sql = `UPDATE entrenador SET nombre = '${nombre}', edad = '${edad}' WHERE id = ${id}`;

    conexion.query(sql, error => {
        if(error) throw error;
        res.send('Customer updated!');
    })
})

//Eliminar Entrenador
app.delete('/delete/:id', (req, res) => {
    const {id } = req.params;
    const sql = `DELETE FROM entrenador WHERE id = ${id}`;

    conexion.query(sql, error => {
        if(error) throw error;
        res.send('Customer Deleted!');
    })
})

//Check Conexion
conexion.connect(error =>{
    if(error) throw console.error;
    
    console.log('DataBase conexion')
})

app.listen(PORT, ()=> console.log(`Server Running PORT ${PORT}`))

function login(){

    let entrenador = $('#entrenador').val();

    let password = $('#password').val();

    let nombre = $('#nombre').val();

    //console.log(entrenador + password)

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3050/entrenadores/'+ ''+''+entrenador+'/'+''+password+'',
        dataType: 'json',
        success: function(result){
            if(result != 'No result'){
                alert(`Bienvenido ${entrenador} ${nombre} ${password}`)
                console.log(`${entrenador} ${nombre} ${password}`)
                // redirigir la pestaña actual a otra URL
                window.location.href = '../Views/index.html';
            }else{
                alert('Nonoes way')
                console.log("Hello World!")
            }
        }
    })

}

function registerss(){

    let nombre = $('#nombre').val();

    let edad = $('#edad').val();

    let pueblo = $('#pueblo').val();

    let password = $('#password').val();

    //console.log(entrenador + password)

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3050/entrenadores/add',
        dataType: 'json',
        /*data: JSON.stringify(nombre,edad,pueblo,password),*/
        data: {
            nombre: nombre,
		    edad: edad,
		    pueblo: pueblo,
		    password: password
        },
        /*data: 'nombre=' + nombre, */
        success: function(result, data){
            if(result != 'No result'){
                alert(`Bienvenido ${entrenador} ${nombre} ${password}`)
                console.log(`${entrenador} ${nombre} ${password}`)
                // redirigir la pestaña actual a otra URL
                window.location.href = '../Views/index.html';
            }else{
                alert('Nonoes way')
                console.log("Hello World!")
            }
        }
    })

}