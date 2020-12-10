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
 * OBTENER TODAS LOS CLIENTES
 *****************************/
router.get('/list/', cors(), async (req, res, next) => {
  console.log("OBTENER TODAS LOS CLIENTES");
  let clientes = await db.clientes();
  console.log("CATEGORIAS", clientes[0]);
  res.send(clientes.rows);
});

/********************************
 * OBTENER CLIENTES POR ID
 *****************************/
router.get('/list/:id', cors(), async (req, res, next) => {
  console.log("obtener cliente por ID ", req.params.id);
  let cliente = await db.clienteId(req.params.id);
  console.log("cliente", cliente);
  res.send(cliente.rows);
});






module.exports = router;
