// Importamos las librerias necesarias para correr nuestro frontend

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3005;
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

const expressSwagger = require('express-swagger-generator')(app);
const mascotasRoutes = require('./routes/mascota');
const categoriasRoutes = require('./routes/categoria');
const clientesRoutes = require('./routes/cliente');
const serviciosRoutes = require('./routes/tservicio');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));



var cors = require('cors')

var whitelist = ['*']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.options('*', cors()) 
app.use(cors())


// Configuramos nuestro api para que genere la documentación de las apis en formato Swagger
let optionsExpressSwagger = {
    swaggerDefinition: {
        info: {
            description: 'Api PETSTORE',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: 'localhost:'+port,
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/**/*.js'] //Path to the API handle folder
};
expressSwagger(optionsExpressSwagger)


// routes ======================================================================
app.use(express.static(__dirname + '/public'));
//masctoas
app.use('/mascotaslist', express.static(__dirname + '/public/mascota/mascotaslist.html'));
app.use('/mascotaedit', express.static(__dirname + '/public/mascota/mascotasedit.html'));
app.use('/mascotaview', express.static(__dirname + '/public/mascota/mascotasview.html'));
app.use('/mascotas', mascotasRoutes);
//categorias
app.use('/categorialist', express.static(__dirname + '/public/categoria/categorialist.html'));
app.use('/categoriaedit', express.static(__dirname + '/public/categoria/categoriaedit.html'));
app.use('/categoriaview', express.static(__dirname + '/public/categoria/categoriaview.html'));
app.use('/categorias', categoriasRoutes);
//categorias
app.use('/clientelist', express.static(__dirname + '/public/cliente/clientelist.html'));
app.use('/clienteedit', express.static(__dirname + '/public/cliente/clienteedit.html'));
app.use('/clienteview', express.static(__dirname + '/public/cliente/clienteview.html'));
app.use('/clientes', clientesRoutes);
//SERVICIOS
app.use('/tservicios', serviciosRoutes);
// launch ======================================================================

app.listen(port);
console.log('Servidor iniciado, go to http://localhost:' + port);


