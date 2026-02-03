import express from "express";
import dateFormat from "dateformat";
import { conexion } from '../conexion.mjs';

const router = express.Router();

async function queryAsync(sql, params = []) {
  const [rows] = await conexion.promise().query(sql, params);
  return rows;
}

router.get("/", async (req, res) => {
  try {
    const fechaRecibida = req.query.id;
    const day = dateFormat(new Date(fechaRecibida), "yyyy-mm-dd");

    const query = `
      SELECT
        p.idPresupEncab AS id,
        DATE_FORMAT(p.PresupEncabFecha, "%d-%m-%Y") AS PresupEncabFecha,
        CASE
          WHEN p.PresupEncabCliente > 0 AND p.PresupEncabCliente < 99999
            THEN c.ClientesDesc
          ELSE p.PresupEncabCliente
        END AS NombreCliente,
        p.PresupEncabTotal,
        p.PresupEncabMayMin,
        p.PresupEncabExplic
      FROM BasePresup.PresupEncab p
      LEFT JOIN BasesGenerales.Clientes c
        ON p.PresupEncabCliente = c.idClientes
        OR p.PresupEncabCliente = c.ClientesDesc
      WHERE p.PresupEncabFecha >= ?
      ORDER BY p.PresupEncabFecha DESC
    `;

    const rows = await queryAsync(query, [day]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la consulta presupencableer" });
  }
});

export default router;

