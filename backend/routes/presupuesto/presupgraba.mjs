import express from "express";
import moment from "moment";
import conexion from "../conexion.mjs";

const router = express.Router();
moment.locale("es");

router.use(express.json());

router.all("/", async function (req, res) {
  try {
    const d = new Date();
    const finalDate = d.toISOString().split("T")[0];

    const cliente =
      req.body.idClientes != 0
        ? req.body.idClientes
        : req.body.nomCliente;

    const registroEncab = {
      PresupEncabFecha: finalDate,
      PresupEncabCliente: cliente,
      PresupEncabTotal: req.body.DatosPresup.suma,
      PresupEncabMayMin: req.body.maymin,
      PresupEncabExplic: req.body.explicacionPresup,
    };

    // ⭐ INSERT ENCABEZADO (async/await)
    const [resEncab] = await conexion
      .promise()
      .query("INSERT INTO BasePresup.PresupEncab SET ?", registroEncab);

    const nropresup = resEncab.insertId;

    // ⭐ PREPARAR ARRAY DE PROMESAS PARA TODOS LOS RENGLONES
    const promesasRenglones = req.body.DatosPresup.datos.map((renglon, i) => {
      const registroReng = {
        idPresupRenglon: i + 1,
        PresupRenglonNroPresup: nropresup,
        PresupRenglonCant: renglon.PresupCantidad,
        PresupRenglonDesc: renglon.StkRubroDesc,
        PresupRenglonLargo: renglon.PresupLargo,
        PresupRenglonAncho: renglon.PresupAncho,
        PresupRenglonImpUnit: Number(renglon.ImpUnitario).toFixed(2),
        PresupRenglonImpItem: Number(renglon.ImpItem).toFixed(2),
        PresupRenglonParamInt: JSON.stringify(renglon.dcalculo[0])
      };
      return conexion
        .promise()
        .query("INSERT INTO BasePresup.PresupRenglon SET ?", registroReng);
    });

    // ⭐ ESPERAR A QUE SE INSERTE TODO
    await Promise.all(promesasRenglones);
    console.log('nropresup ', nropresup)
    // ⭐ RESPUESTA ÚNICA CUANDO TODO TERMINÓ
    res.json({
      ok: true,
      message: "Presupuesto grabado correctamente",
      nropresup,
    });

  } catch (err) {
    console.error("Error al grabar el presupuesto:", err);
    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});

export default router;
