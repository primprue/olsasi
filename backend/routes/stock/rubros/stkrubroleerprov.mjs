import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';


router.get("/", async (req, res) => {
  const indice = req.query.idStkGrupo;
  try {
    const q = `Select idStkRubro, StkRubroDesc, StkRubroAbr, StkRubroProv,
  Proveedores.ProveedoresDesc, StkRubroAncho, StkRubroPresDes, StkRubroPres, StkRubroUM, StkRubroCosto,
  StkRubroConf, StkRubroTM, 
  date_format(StkRubroFecha, "%d-%m-%Y") as StkRubroFecha
  from StkRubro JOIN BasesGenerales.Proveedores
  where StkRubroCodGrp = ? and StkRubroProv = idProveedores order by StkRubroDesc
  `
    const [result] = await conexionpool.query(q, [indice]);
    res.json(result);
  } catch (err) {
    console.error("Error en la DB:", err);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});

export default router;
