import express from "express";
const router = express.Router();
import { conexionpool } from '../../conexion.mjs';

router.get("/", async (req, res) => {
  const cuallee = req.query.cuallee;

  // 1. Definimos la lógica de la query
  let q = "SELECT StkRubroDesc, StkRubroAbr FROM StkRubro";
  let params = [];

  if (cuallee !== 'T') {
    q += " WHERE StkRubroConf = ?";
    params.push(cuallee);
  }

  q += " ORDER BY StkRubroDesc";

  // 2. Ejecutamos con try/catch para manejar errores de forma limpia
  try {
    // Usamos await para esperar el resultado sin bloquear el servidor
    // Nota: mysql2 retorna un array donde el primer elemento [0] son las filas
    const [rows] = await conexionpool.query(q, params);

    res.json(rows);
  } catch (err) {
    console.error("Error en la DB:", err);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});

export default router;
