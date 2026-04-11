import express from "express";
var router = express.Router();
import { conexionpool } from '../conexion.mjs';

router.use(express.json()); // Asegúrate de que esto está habilitado para que `req.body` no sea vacío
router.post("/", async (req, res) => {
  const indice = req.query.id;
  const provdesc = req.body.ProveedoresDesc.toUpperCase();
  const provtipo = req.body.ProveedoresTipo;
  const provcuit = req.body.ProveedoresCUIT;
  const provcalle = req.body.ProveedoresCalle.toUpperCase();

  const provnrocalle = req.body.ProveedoresNroCalle;
  const provpiso = req.body.ProveedoresPiso;
  const provdto = req.body.ProveedoresDto;
  const provcodpostal = req.body.ProveedoresCodPos;
  const provlocalidad = req.body.ProveedoresLoc.toUpperCase();
  const provprovincia = req.body.ProveedoresPcia.toUpperCase();
  const provtelefono = req.body.ProveedoresTel;
  const provcontacto = req.body.ProveedoresContacto.toUpperCase();
  const provmail = req.body.ProveedoresMail;
  const provpagweb = req.body.ProveedoresWeb;
  const provcodmon = req.body.ProveedoresCodMon;
  try {
    const q = `update BasesGenerales.Proveedores set ProveedoresDesc = ?,
              ProveedoresTipo = ? ,  ProveedoresCUIT = ? , ProveedoresCalle = ? ,
              ProveedoresNroCalle = ? , ProveedoresPiso = ? , ProveedoresDto = ? ,
              ProveedoresCodPos = ? , ProveedoresLoc = ? , ProveedoresPcia = ? ,
              ProveedoresTel = ? , ProveedoresContacto = ? , ProveedoresMail = ? ,
              ProveedoresWeb = ? , ProveedoresCodMon = ? where idProveedores = ?`;
    await conexionpool.query(q, [provdesc, provtipo, provcuit, provcalle,
      provnrocalle, provpiso, provdto,
      provcodpostal, provlocalidad, provprovincia,
      provtelefono, provcontacto, provmail,
      provpagweb, provcodmon, indice]);
    return res.status(200).json({
      leyenda: 'Proveedor modificado correctamente',
    });
  } catch (err) {
    console.error("Error en el proceso:", err);
    // Manejo de errores específicos de SQL
    if (err.errno === 1062) {
      return res.status(460).json({ message: "Clave duplicada" });
    }
    if (err.errno === 1406) {
      return res.status(410).json({ message: "Dato demasiado largo para una columna" });
    }
    return res.status(500).json({
      leyenda: "Error interno del servidor",
      error: err.message
    });
  }

});

export default router;
