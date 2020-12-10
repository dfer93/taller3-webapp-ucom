
var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('app.properties');

var _ = require('lodash');
//conexion a la base de datos Postgres
const {
    Pool,
    Client
} = require('pg');

const Router = require('express-promise-router')


const pool = new Pool({
    host: properties.get('db.host'),
    database: properties.get('db.database'),
    port: properties.get('db.port'),
    user: properties.get('db.username'),
    password: properties.get('db.password'),
});

//CATEGORIA
const SQL_GET_ALL_CATEGORIA = "SELECT * FROM categoria";
const SQL_GET_CATEGORIA_ID = "SELECT * FROM categoria WHERE id = $1";

//TIPO SERVICIO
const SQL_GET_ALL_SERVICIO = "SELECT * FROM tipo_servicio";
const SQL_GET_SERVICIO_ID = "SELECT * FROM tipo_servicio WHERE id_tipo_servicio = $1";
const SQL_TIPO_SERVICIO_CLIENTE = `select
                                    s.id_cliente ,
                                    c.nombre ,
                                    c.apellido ,
                                    s.fecha_servicio ,
                                    s.estado
                                    from servicio s
                                    left join cliente c on c.id_cliente =s.id_cliente
                                    left join tipo_servicio ts on ts.id_tipo_servicio =s.id_tipo_servicio
                                    where 1=1
                                    and c.id_cliente =$1
                                    and ts.id_tipo_servicio =$2
                                    order by s.id_cliente asc, s.fecha_servicio desc, s.estado desc`;

//CLIENTES
const SQL_GET_ALL_CLIENTE = "SELECT * FROM cliente";
const SQL_GET_CLIENTE_ID = "SELECT * FROM cliente WHERE id_cliente = $1";

//MASCOTAS
const SQL_GET_ALL_PET =`SELECT categoria.nombre categoria, 
                            mascota.nombre, 
                            mascota.id_categoria, 
                            mascota.foto, 
                            mascota.id_mascota 
                        FROM mascota 
                        JOIN categoria ON mascota.id_categoria = categoria.id`;
const SQL_OBTENER_LISTA_MASCOTA_POR_ID="SELECT categoria.nombre categoria, mascota.nombre, mascota.id_categoria, mascota.foto, mascota.id_mascota FROM mascota INNER JOIN categoria ON mascota.id_categoria = categoria.id where id_mascota=$1";
const SQL_INSERTAR_MASCOTA="insert into mascota(nombre,id_categoria, foto) values($1,$2, $3) RETURNING id_mascota";
const SQL_UPDATE_MASCOTA = "UPDATA mascota SET nombre = $2, id_categoria = $3, foto = $4 WHERE id_mascota = $1 RETURNING id_mascota";

function insertarMascota(datos){
    console.log("db => insertarMascota ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_MASCOTA,[datos.nombre,datos.id_categoria]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

const updateMascota = mascota => {
    try{
        const res = pool.query(SQL_UPDATE_MASCOTA, [mascota.nombre, mascota.id_categoria]);
        return res;
    }catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

module.exports = {
    obtenerMascotaPorID: (id)=>pool.query(SQL_OBTENER_LISTA_MASCOTA_POR_ID,[id]),
    getAllPet: ()=>pool.query(SQL_GET_ALL_PET),
    insertarMascota: insertarMascota,
    updateMascota: updateMascota,
    categorias: ()=>pool.query(SQL_GET_ALL_CATEGORIA),
    categoriaId: (id)=>pool.query(SQL_GET_CATEGORIA_ID, [id]),
    clientes: ()=>pool.query(SQL_GET_ALL_CLIENTE),
    clienteId: (id)=>pool.query(SQL_GET_CLIENTE_ID, [id]),
    servicios: ()=> pool.query(SQL_GET_ALL_SERVICIO),
    tservicio: (parametros) =>pool.query(SQL_TIPO_SERVICIO_CLIENTE, [parametros.cliente, parametros.servicio]),
}
