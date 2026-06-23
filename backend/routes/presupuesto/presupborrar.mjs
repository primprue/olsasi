import express from "express";
const router = express.Router();

import fs from 'fs/promises';
import path from 'path';
import { conexionpool } from '../conexion.mjs';
import variables from '../../public/variables.mjs';

router.delete("/", async (req, res) => {
  const indice = req.query.id;
  if (!indice) return res.status(400).json({ leyenda: "Falta el ID" });

  // 1. Pedimos una conexión "prestada" al Pool
  const connection = await conexionpool.getConnection();

  try {
    // 2. Iniciamos la transacción
    await connection.beginTransaction();

    // 3. Borrar Renglones
    await connection.query(
      `DELETE FROM BasePresup.PresupRenglon WHERE PresupRenglonNroPresup = ?`,
      [indice]
    );

    // 4. Borrar Encabezado
    const [resultEncab] = await connection.query(
      `DELETE FROM BasePresup.PresupEncab WHERE idPresupEncab = ?`,
      [indice]
    );

    if (resultEncab.affectedRows === 0) {
      // Si no existe, no hay nada que borrar, hacemos rollback y salimos
      await connection.rollback();
      return res.status(404).json({ leyenda: 'No se encontró el presupuesto.' });
    }

    // 5. Borrado de Archivos
    try {
      // const directorio = variables.dirpresupdocumento;
      const RUTA_PUBLICOS = path.join(process.env.RUTA_EXTRENA_PRESUP) + '/';
      // const todosLosArchivos = await fs.readdir(directorio);
      const todosLosArchivos = await fs.readdir(RUTA_PUBLICOS);
      const archivosABorrar = todosLosArchivos.filter(n => n.startsWith(`Presupuesto nro ${indice}`));

      for (const archivo of archivosABorrar) {
        await fs.unlink(path.join(RUTA_PUBLICOS, archivo));
      }
    } catch (fileErr) {
      console.warn("Aviso: No se encontraron archivos físicos, pero se borró de la DB.");
    }

    // 6. Si llegamos aquí, todo OK. Confirmamos cambios.
    await connection.commit();
    return res.status(200).json({ leyenda: 'Presupuesto eliminado con éxito.' });

  } catch (err) {
    // 7. Si algo falló en el proceso, deshacemos los cambios de SQL
    await connection.rollback();
    console.error('Error en el proceso:', err);
    return res.status(500).json({ leyenda: 'Error interno', detalle: err.message });

  } finally {
    // 8. ¡CRUCIAL! Devolvemos la conexión al Pool. 
    // Si no haces esto, tu servidor se colgará después de unos 10 borrados.
    connection.release();
  }
});

export default router;