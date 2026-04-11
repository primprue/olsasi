import express from "express";
var router = express.Router();

import { conexionpool } from '../../conexion.mjs';

router.delete("/:id", async (req, res) => {
  try {
    const indice = req.params.id;
    const q = `delete from BasePresup.PresupConfTipo where idPresupConfTipo = ?`;
    await conexionpool.query(q, [indice])
    return res.status(200).json({
      leyenda: 'PresupConfTipo eliminado correctamente',
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

//   var q = ["delete", ' from BasePresup.PresupConfTipo where idPresupConfTipo = "', indice, '"'].join(
//     " "
//   );
//   conexion.query(q, function (err, result) {
//     if (err) {
//       if (err.errno == 1451) {
//         return res
//           .status(411)
//           .send({ message: "error Código de Confeccion Tipo usado en otra tabla" });
//       }
//       {
//         console.log(err);
//       }
//     } else {
//       res.json(result.rows);
//     }
//   });
// });
// conexion.end;
// export default router;