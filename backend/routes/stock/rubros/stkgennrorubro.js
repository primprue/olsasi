var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require("../../conexion");

var codrubro = 0;
moment.locale("es");

conexion.connect(function(err) {
  if (!err) {
    console.log("base de datos conectada en stkgennrorubro ");
  } else {
    console.log("no se conecto en stkgennrorubro");
  }
});

function buscacodigo(codgrupo) {
  var q = [
    "UPDATE StkGrupo ",
    " SET StkGrupoContRubro = StkGrupoContRubro + ",
    1,
    " where idStkGrupo = ",
    codgrupo
  ].join(" ");

  conexion.query(q, function(err, result) {
    if (err) {
      console.log("Error en UPDATE StkGrupo");
      console.log(err);
    } else {
      console.log("actualizado en grupo el codigo de rubros");
    }
  });
}

exports.buscacodigo = buscacodigo;
