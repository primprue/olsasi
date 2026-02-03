import express from "express";
import moment from "moment";
import { conexion } from '../conexion.mjs';

const router = express.Router();
moment.locale("es");

router.use(express.json());

router.all("/", async function (req, res) {
  const conn = await conexion.promise().getConnection();

  try {
    // ⭐ INICIAR TRANSACCIÓN
    await conn.beginTransaction();

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

    // ⭐ INSERT ENCABEZADO
    const [resEncab] = await conn.query(
      "INSERT INTO BasePresup.PresupEncab SET ?",
      registroEncab
    );

    const nropresup = resEncab.insertId;

    // ⭐ INSERT RENGLONES
    for (let i = 0; i < req.body.DatosPresup.datos.length; i++) {
      const renglon = req.body.DatosPresup.datos[i];

      const registroReng = {
        idPresupRenglon: i + 1,
        PresupRenglonNroPresup: nropresup,
        PresupRenglonCant: renglon.PresupCantidad,
        PresupRenglonDesc: renglon.StkRubroDesc,
        PresupRenglonLargo: renglon.PresupLargo,
        PresupRenglonAncho: renglon.PresupAncho,
        PresupRenglonImpUnit: Number(renglon.ImpUnitario).toFixed(2),
        PresupRenglonImpItem: Number(renglon.ImpItem).toFixed(2),
        PresupRenglonParamInt: JSON.stringify(renglon.dcalculo[0]),
      };

      await conn.query(
        "INSERT INTO BasePresup.PresupRenglon SET ?",
        registroReng
      );
    }

    // ⭐ CONFIRMAR TODO
    await conn.commit();

    res.json({
      ok: true,
      message: "Presupuesto grabado correctamente",
      nropresup,
    });

  } catch (err) {
    // ❌ DESHACER TODO SI FALLA ALGO
    await conn.rollback();

    console.error("Error al grabar el presupuesto:", err);
    res.status(500).json({
      ok: false,
      error: err.message,
    });

  } finally {
    // ⭐ LIBERAR CONEXIÓN
    conn.release();
  }
});

export default router;
