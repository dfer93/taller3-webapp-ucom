var express = require('express');
var cors = require('cors');
var router = express.Router();
const axios = require('axios');

const jwt = require('express-jwt')

var PropertiesReader = require('properties-reader');

const db = require('../../db');

var _ = require('lodash');

const Router = require('express-promise-router')
const {
  Pool,
  Client
} = require('pg');


/********************************
 * OBTENER TODAS LAS MASCOTAS
 *****************************/
router.get('/list/', cors(), async (req, res, next) => {
  console.log("OBTENER TODAS LAS CATEGORIAS");
  let mascotas = await db.categorias();
  console.log("CATEGORIAS", mascotas[0]);
  res.send(mascotas.rows);
});

/********************************
 * OBTENER MASCOTA POR ID
 *****************************/
router.get('/list/:id', cors(), async (req, res, next) => {
  console.log("obtener mascota por ID ", req.params.id);
  let mascota = await db.categoriaId(req.params.id);
  console.log("mascotas", mascota);
  res.send(mascota.rows);
});

/********************************
 * OBTENER MASCOTA POR ID
 *****************************/
router.get('/edit/:id', cors(), async (req, res, next) => {
  console.log("obtener mascota por ID ", req.params.id);
  let mascota = await db.obtenerMascotaPorID(req.params.id);
  console.log("mascotas", mascota);
  res.send(mascota.rows);
});


/********************************
 * INSERTAR MASCOTA
 *****************************/
router.post('/insertar',cors(),async(req,res,next)=>{
  console.log("insertar mascota")
  var result={};
  console.log("params", req.body);

  var mascota=req.body;
  result= await db.insertarMascota(mascota);

  if(result.rows){
      res.send(result.rows[0]);
  }else{
      res.send("No se pudo insertar");
  }

});




module.exports = router;
