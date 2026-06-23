import express from "express";
var router = express.Router();

import { conexion } from '../../conexion.mjs';



router.get("/", async (req, res) => {
  var q1
  if (req.query.tipolist === 'C') {
    q1 = `
 SELECT
    original.idStkMov AS id,
    DATE_FORMAT(original.StkMovFecha, "%d-%m-%Y") AS StkMovFecha,
    original.StkMovLargo,
    original.StkMovAncho,
    original.StkMovTotal,
    original.StkMovRubroAbr,
    original.StkMovItemDesc,

    -- AQUÍ LA LÓGICA: Si no hay proveedor y la referencia es numérica (mayor a 0),
    -- muestra el cliente del movimiento referenciado; si no, el cliente original.
    CASE
        WHEN (prov.ProveedoresDesc IS NULL OR prov.ProveedoresDesc = '')
             AND original.StkMovNroRef REGEXP '^[0-9]+$'
        THEN ref.StkMovCliente
        ELSE original.StkMovCliente
    END AS StkMovCliente,

    prov.ProveedoresDesc AS Proveedor,
    original.StkMovNroRef
FROM BaseStock.StkMov AS original

-- Tu JOIN original para los proveedores
LEFT JOIN BasesGenerales.Proveedores AS prov
    ON original.StkMovProv = prov.idProveedores

-- NUEVO JOIN: Conectamos la tabla consigo misma usando la referencia
LEFT JOIN BaseStock.StkMov AS ref
    ON original.StkMovNroRef = ref.idStkMov

WHERE original.StkMovFecha BETWEEN  ? AND ?`;
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




