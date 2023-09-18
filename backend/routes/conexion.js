var mysql = require("mysql");
var express = require("express");

var conexion = mysql.createConnection({
  // user: "root",
  // password: "drasan",
  // host: "192.168.2.11",
  user: "root",
  password: "drasan141",
  host: "localhost",
  database: "BaseStock",
  port: 3306
});

//var ip = 'localhost';

module.exports = conexion;

// ignorado
