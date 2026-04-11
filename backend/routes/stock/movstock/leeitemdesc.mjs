
import { conexion } from '../../conexion.mjs';

function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        conexion.query(sql, values, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

async function itemdescripcion(rubroabr, itemcod) {
    try {

        const selectQ = `SELECT StkItemsDesc FROM BaseStock.StkItems 
      WHERE StkItemsRubroAbr = ? and idStkItems = ?`;
        const rows = await queryAsync(selectQ, [rubroabr, itemcod]);

        if (rows.length === 0) throw new Error("Item no encontrado");

        // Devolvemos el nuevo ID
        return rows[0].StkItemsDesc;
    } catch (err) {
        console.error("Error al obtener descripcion de item:", err);
        throw err;
    }
}
export { itemdescripcion };