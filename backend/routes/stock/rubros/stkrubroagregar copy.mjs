// import express from "express";
// var router = express.Router();
// import moment from "moment";
// import {conexion} from '../../conexion.mjs';
// import { buscacodigo } from './stkgennrorubro.mjs';

// moment.locale("es");



// router.all("/", async function (req, res) {
//   // let codgrupo
//   let codgrupo = req.body.StkRubroCodGrp;
//   var d = new Date();
//   let finalDate = d.toISOString().split("T")[0];
//   var RubroDesc = req.body.StkRubroDesc === undefined ? '' : req.body.StkRubroDesc.toUpperCase()
//   var RubroPresDes = req.body.StkRubroPresDes === undefined ? '' : req.body.StkRubroPresDes.toUpperCase()

//   var registro = {
//     idStkRubro: req.body.idStkRubro,
//     StkRubroCodGrp: Number(codgrupo),
//     StkRubroDesc: RubroDesc,
//     StkRubroAbr: req.body.StkRubroAbr.toUpperCase(),
//     StkRubroProv: Number(req.body.StkRubroProv),
//     StkRubroAncho: Number(req.body.StkRubroAncho),
//     StkRubroPresDes: RubroPresDes,
//     StkRubroPres: Number(req.body.StkRubroPres),
//     StkRubroUM: req.body.StkRubroUM,
//     StkRubroCosto: Number(req.body.StkRubroCosto),
//     StkRubroTM: req.body.StkRubroTM,
//     StkRubroConf: req.body.StkRubroConf,
//     StkRubroFecha: finalDate,
//   };
//   console.log('registro  ', registro)
//   conexion.query("INSERT INTO StkRubro SET ?", registro, function (err, result) {
//     if (err) {
//       if (err.errno == 1062) {
//         return res.status(460).send({ message: "error clave duplicada" });
//       } else if (err.errno == 1406 || err.errno == 1264) {
//         console.log(err.errno);
//         return res
//           .status(410)
//           .send({ message: "Abreviatura con más de cinco letras" });
//       }
//       {
//         console.log("en stkrubroagregar err.errno");
//         console.log(err.errno);
//       }
//     } else {
//       res.json(result);

//     }
//     var registro1 = {
//       idStkItems: 1,
//       StkItemsGrupo: req.body.StkRubroCodGrp,
//       StkItemsRubro: req.body.idStkRubro,
//       StkItemsRubroAbr: req.body.StkRubroAbr.toUpperCase(),
//       StkItemsDesc: '',
//       StkItemsCantidad: 0,
//       StkItemsCantDisp: 0,
//       StkItemsFAct: finalDate,
//       StkItemsMin: 1,
//       StkItemsMax: 2
//     };
//     conexion.query("INSERT INTO StkItems SET ?", registro1, function (
//       err,
//       result
//     ) {
//       if (err) {
//         console.log("ERROR ");
//         console.log(err.errno);
//       } else {
//         res.json(result.rows);
//       }
//     });
//     //}
//   });
//   // gencodrubro.buscacodigo(codgrupo);
//   console.log("codgrupo", codgrupo);
//   buscacodigo(codgrupo);
// });

// conexion.end;
// export default router;
import express from "express";
const router = express.Router();
import { conexion } from '../../conexion.mjs';
import { buscacodigo } from './stkgennrorubro.mjs';

function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

router.post("/", async (req, res) => {
  const codgrupo = Number(req.body.StkRubroCodGrp);
  const finalDate = new Date().toISOString().slice(0, 10);
  try {
    // PASO 1: Generar el nuevo ID de Rubro primero
    const nuevoIdRubro = await buscacodigo(codgrupo);

    // PASO 2: Insertar en StkRubro usando el nuevo ID
    const registroRubro = {
      idStkRubro: nuevoIdRubro, // <-- Usamos el ID generado
      StkRubroCodGrp: codgrupo,
      StkRubroDesc: (req.body.StkRubroDesc || '').toUpperCase(),
      StkRubroAbr: (req.body.StkRubroAbr || '').toUpperCase(),
      StkRubroProv: Number(req.body.StkRubroProv || 0),
      StkRubroAncho: Number(req.body.StkRubroAncho || 0),
      StkRubroPresDes: (req.body.StkRubroPresDes || '').toUpperCase(),
      StkRubroPres: Number(req.body.StkRubroPres || 0),
      StkRubroUM: req.body.StkRubroUM,
      StkRubroCosto: Number(req.body.StkRubroCosto || 0),
      StkRubroTM: req.body.StkRubroTM,
      StkRubroConf: req.body.StkRubroConf,
      StkRubroFecha: finalDate,
    };

    await queryAsync("INSERT INTO StkRubro SET ?", [registroRubro]);

    // PASO 3: Insertar en StkItems
    const registroItems = {
      idStkItems: 1,
      StkItemsGrupo: Number(req.body.StkRubroCodGrp),
      StkItemsRubro: nuevoIdRubro,
      StkItemsRubroAbr: (req.body.StkRubroAbr || '').toUpperCase(),
      StkItemsDesc: '',
      StkItemsOTD: 'S',
      StkItemsCantidad: 0,
      StkItemsCantDisp: 0,
      StkItemsFAct: finalDate,
      StkItemsMin: 1,
      StkItemsMax: 2
    };
    await queryAsync("INSERT INTO StkItems SET ?", [registroItems]);

    // Respuesta final exitosa
    return res.status(201).json({
      leyenda: 'Rubro e Item creados correctamente',
      idGenerado: req.body.idStkRubro
    });

  } catch (err) {
    console.error("Error en el proceso:", err);

    // Manejo de errores de duplicados o longitud
    if (err.errno === 1062) return res.status(460).json({ message: "Clave duplicada" });
    if (err.errno === 1406) return res.status(410).json({ message: "Dato demasiado largo" });

    return res.status(500).json({ leyenda: "Error interno del servidor" });
  }
});
export default router;