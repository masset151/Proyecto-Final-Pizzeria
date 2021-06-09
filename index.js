const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path')
const app = express();
const {mongoose} = require("./database")


//Configuracion
app.set('port',process.env.PORT || 3000)
//Directorio de la Aplicacion
app.use(express.static('public'));
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin:'http://devproyecto.herokuapp.com/'}));
app.use(cors({origin:'https://pizzeriasan-andres.herokuapp.com/'}))
app.use(cors({origin:'http://localhost:4200'}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Routes


app.use('/api/pizzas',require('./routes/pizzas.routes'));
app.use('/api/users',require('./routes/auth.routes'));


app.get('*',(req,res) =>{
    res.sendFile(path.resolve(__dirname,'public/index.html'));
})
//Iniciar el Servidor
app.listen(app.get(`port`),() =>{
    console.log(`El Servidor escucha en el puerto 3000`);
})