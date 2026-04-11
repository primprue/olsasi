import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';


router.post("/", async (req, res) => {

  const OTDatosDesc = req.body.OTDatosDesc;
  const OTDatosOpciones = req.body.OTDatosOpciones;
  const OTDatosTipoPed = req.body.OTDatosTipoPed;
  const OTDatosRequerido = req.body.OTDatosRequerido;
  const OTDatosOrdenAparicion = req.body.OTDatosOrdenAparicion;
  const OTDatosAncho = req.body.OTDatosAncho;
  const idOTDatos = req.query.id;

  const q = `UPDATE BasesOrdenes.OTDatos SET  
    OTDatosDesc =  ?, 
    OTDatosOpciones = ?, 
    OTDatosTipoPed = ?, 
    OTDatosRequerido = ?, 
    OTDatosOrdenAparicion = ?, 
    OTDatosAncho = ? 
    WHERE idOTDatos  = ?`;

  conexionpool.query(q, [OTDatosDesc, OTDatosOpciones, OTDatosTipoPed, OTDatosRequerido, OTDatosOrdenAparicion, OTDatosAncho, idOTDatos], (err, result) => {
    if (err) {
      if (err.errno == 1062) {
        return res.status(409).send({ message: "error clave duplicada" });
      } else {
        console.log(err.errno);
      }
    } else {
      res.json(result.rows);
    }
  });


});

export default router;
