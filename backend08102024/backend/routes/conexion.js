var mysql = require("mysql");
var express = require("express");

var conexion = mysql.createConnection({
  // user: "root",
  // host: "192.168.2.11",
  // password: "drasan",
  user: "sandra",
  password: "drasan141",
  host: "localhost",
  database: "BaseStock",
  port: 3306
});
//var ip = 'localhost';

module.exports = conexion;

// ignorado
