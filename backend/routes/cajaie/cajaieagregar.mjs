import express from "express";
import moment from "moment";
import conexion from "../conexion.mjs";

moment.locale("es");

const router = express.Router();

conexion.connect(function (err) {
    if (!err) {
        console.log("Base de datos conectada en cajaieagregar");
    } else {
        console.log("No se conectó en cajaieagregar");
    }
});

router.post("/", async function (req, res) {

    const registros = await Promise.all(req.body.rows.map(async (row) => {
        return new Promise((resolve, reject) => {
            const q1 = `SELECT CajaCPSumaResta FROM BaseCaja.CajaCP WHERE idCajaCP = ${row.CajaIEConcepto}`;

            conexion.query(q1, function (err, result) {
                if (err) {
                    console.log(err);
                    return reject(err);
                }

                if (result[0]?.CajaCPSumaResta === 'S') {
                    row.CajaIEImporte = parseFloat(row.CajaIEImporte) || 0;
                } else {
                    if (parseFloat(row.CajaIEImporte) > 0)
                        row.CajaIEImporte = parseFloat(row.CajaIEImporte) * -1 || 0;
                }

                const nuevoRegistro = {
                    idCajaIE: row.id,
                    CajaIEFecha: new Date().toISOString().split("T")[0],
                    CajaIECliente: row.CajaIECliente.toUpperCase(),
                    CajaIEConcepto: row.CajaIEConcepto,
                    CajaIEPunto: row.CajaIEPunto,
                    CajaIEMoneda: row.CajaIEMoneda,
                    CajaIEImporte: row.CajaIEImporte,
                    CajaIECodIP: row.CajaIECodIP,
                    CajaIEImpIP: parseFloat(row.CajaIEImpIP) || 0,
                    CajaIEGrabado: 'S'
                };

                resolve(nuevoRegistro);
            });
        });
    }));


    const resultados = [];

    for (const registro of registros) {
        try {
            const resultado = await new Promise((resolve, reject) => {
                conexion.query("INSERT INTO BaseCaja.CajaIE SET ?", registro, (err, result) => {
                    if (err) {
                        if (err.errno === 1062) {
                            var q = ['UPDATE BaseCaja.CajaIE SET',
                                ' CajaIEFecha = "',
                                registro.CajaIEFecha,
                                '", CajaIECliente = "',
                                registro.CajaIECliente,
                                '", CajaIEConcepto = "',
                                registro.CajaIEConcepto,
                                '", CajaIEPunto = "',
                                registro.CajaIEPunto,
                                '", CajaIEMoneda = "',
                                registro.CajaIEMoneda,
                                '", CajaIEImporte = ',
                                registro.CajaIEImporte,
                                ', CajaIECodIP = "',
                                registro.CajaIECodIP,
                                '", CajaIEImpIP = "',
                                registro.CajaIEImpIP,
                                '", CajaIEGrabado = "S"',
                                ' WHERE idCajaIE = ',
                                registro.idCajaIE,
                            ].join('')
                            conexion.query(q, function (err, result) {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                } else {
                                    console.log("registro actualizado: ", registro.idCajaIE);
                                    resolve({ success: true, id: registro.idCajaIE });
                                }
                            });

                            console.log("Clave duplicada para:", registro.idCajaIE);
                            resolve({ error: "duplicado", id: registro.idCajaIE });

                        } else {
                            reject(err);
                        }
                    } else {
                        resolve({ success: true, id: registro.idCajaIE });
                    }
                });
            });
            resultados.push(resultado);
        } catch (error) {
            console.error("Error al insertar registro:", error);
            return res.status(500).json({ message: "Error en el servidor", error });
        }
    }

    res.json({ resultados });
});

export default router;


