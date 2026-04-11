import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';



router.post("/", async (req, res) => {
  const indice = req.query.id;
  const descr = req.body.StkGrupoDesc.toUpperCase();
  const abrev = req.body.StkGrupoAbr;
  const contRubro = req.body.StkGrupoContRubro;
  try {
    const q = `UPDATE StkGrupo SET StkGrupoDesc = ?, StkGrupoAbr = ?, StkGrupoContRubro = ? WHERE idStkGrupo = ?`;
    await conexionpool.query(q, [descr, abrev, contRubro, indice]);
    return res.status(200).json({
      leyenda: 'Grupo actualizado correctamente',
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
//   var q = [
//     'UPDATE StkGrupo SET StkGrupoDesc = "' +
//     descr +
//     '", StkGrupoAbr = "' +
//     abrev +
//     '", StkGrupoContRubro = ' +
//     contRubro +
//     ' WHERE idStkGrupo = "' +
//     indice +
//     '"',
//   ];
//   conexion.query(q[0], function (err, result) {
//     if (err) {
//       if (err.errno == 1062) {
//         return res
//           .status(409)
//           .send({ message: "Abreviatura de Grupo existente" });
//       } else console.log(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

// conexion.end;
export default router;
