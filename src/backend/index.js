//=======[ Settings, Imports & Data ]==========================================

const cors = require('cors');

var PORT    = 3000;

var express = require('express');
var app     = express();
//var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
//app.use(express.static('/home/node/app/static/'));
//config CORS
var corsConfig = {
   origin: '*',
   optionSuccessStatus: 200
};
//Middleware CORS
app.use(cors(corsConfig));

//ruteo dispositivo
var routerDisp = require('./routes/dispositivo');
const routerLogs = require('./routes/Logs');
//ruteo dispositivo
var routerMedicion = require('./routes/medicion');

app.use('/api/dispositivo', routerDisp);

app.use('/api/medicion', routerMedicion);
app.use('/api/logs', routerLogs);
app.use(cors(corsConfig));

app.listen(PORT, function(req, res) {
    console.log("API Funcionando ");
});

//=======[ Main module code ]==================================================

/*
app.get('/dispositivos/', function(req, res, next) {
    console.log("Get list devices!");
    utils.query('SELECT dispositivoId, nombre, ubicacion, electrovalvulaId from Dispositivos',(err,rows) => {
        if(err){
            throw err;
            res.send(err).status(400);
            return
        }
        res.send(JSON.stringify(rows)).status(200);
    });
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});
*/
//=======[ End of file ]=======================================================
