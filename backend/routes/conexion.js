var mysql = require("mysql");
var express = require("express");

var conexion = mysql.createConnection({
  // user: "root",
  // password: "drasan",
  //cuando tuve el problema que no me podía conectar, era que el usuario root en esta máquina no tiene
  //los permisos suficientes y debo entrar con sandra
  user: "sandra",
  password: "drasan141",
  host: "localhost",
  database: "BaseStock",
  port: 3306
});
console.log('esta en conexion  ', conexion)
//var ip = 'localhost';

module.exports = conexion;

// ignorado
