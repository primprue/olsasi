import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';



router.get("/", async (req, res) => {
  var q1
  if (req.query.tipolist === 'C') {
    q1 = `
  SELECT 
    idStkMov AS id, 
    DATE_FORMAT(StkMovFecha, "%d-%m-%Y") AS StkMovFecha,
    StkMovLargo, 
    StkMovAncho, 
    StkMovTotal, 
    StkMovRubroAbr, 
    StkMovItemDesc,
    StkMovCliente, 
    BasesGenerales.Proveedores.ProveedoresDesc AS Proveedor, 
    StkMovNroRef
  FROM BaseStock.StkMov 
  LEFT JOIN BasesGenerales.Proveedores 
    ON StkMovProv = idProveedores
  WHERE StkMovFecha BETWEEN ? AND ?`;
  }
  else {
    q1 = ` SELECT
    idStkMov AS id,
      DATE_FORMAT(StkMovFecha, "%d-%m-%Y") AS StkMovFecha,
        StkMovLargo,
        StkMovAncho,
        StkMovTotal,
        StkMovRubroAbr,
        StkMovItemDesc,
        StkMovCliente,
        BasesGenerales.Proveedores.ProveedoresDesc AS Proveedor,
          StkMovNroRef
    FROM BaseStock.StkMov 
    LEFT JOIN BasesGenerales.Proveedores 
    ON StkMovProv = idProveedores
    WHERE StkMovFecha BETWEEN ? AND ?
    AND StkMovCliente NOT LIKE \'%Cambio%'
    AND StkMovCliente NOT LIKE \'%Confirma'
    AND StkMovLargo != 0
    AND StkMovAncho != 0`;
  }

  try {
    conexion.query(q1, [req.query.FechaDesde, req.query.FechaHasta], function (err, result) {
      if (err) console.log(err);
      else res.json(result);
    });
  } catch (err) {
    console.error("Error en el proceso:", err);
    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }

});

export default router;




