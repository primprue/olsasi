import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';


router.post("/", async (req, res) => {

  const ordenIds = req.body;

  let i;
  try {
    for (i = 0; i < ordenIds.length; i++) {
      const id = ordenIds[i].id;
      const nuevo_orden = ordenIds[i].nuevo_orden;
      console.log('id  ', id)
      console.log('nuevo_orden  ', nuevo_orden)
      const q = `UPDATE BasesOrdenes.OTDatos SET  
        OTDatosOrdenAparicion =  ? 
        WHERE idOTDatos  = ?`;

      conexionpool.query(q, [nuevo_orden, id], (err, result) => {
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
    }
  } catch (err) {
    console.log(err);
  }

});

export default router;
