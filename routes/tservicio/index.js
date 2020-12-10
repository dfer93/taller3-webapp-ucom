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
  console.log("OBTENER TODAS TIPO SERVICIO");
  let mascotas = await db.servicios();
  console.log("CATEGORIAS", mascotas[0]);
  res.send(mascotas.rows);
});

/********************************
 * OBTENER MASCOTA POR ID
 *****************************/
/*
router.get('/list/:id', cors(), async (req, res, next) => {
  console.log("obtener SERVICIO por ID ", req.params.id);
  let mascota = await db.categoriaId(req.params.id);
  console.log("mascotas", mascota);
  res.send(mascota.rows);
});
*/
/********************************
 * OBTENER MASCOTA POR ID
 *****************************/
router.get('/tservis/:cliente/:servicio', cors(), async (req, res, next) => {
    console.log("obtener SERVICIO por ID ", req.params);
    let parametros = req.params;
    let mascota = await db.tservicio(parametros);
    console.log("mascotas", mascota);
    res.send(mascota.rows);
  });



module.exports = router;
