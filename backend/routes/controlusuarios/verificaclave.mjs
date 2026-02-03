// import express from "express";
// import {conexion} from '../conexion.mjs';
// import argon2 from "argon2";

// const router = express.Router();

// router.get("/", (req, res) => {
//     const { usuario, password } = req.query;
//     let q1 = `SELECT password_hash FROM Usuarios.usuarios WHERE usuario = "${usuario}"`


//     conexion.query(q1, async function (err, result) {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({ error: "Error en la base de datos" });
//         }
//         else {
//             if (result.length !== 0) {
//                 const hashGuardado = result[0].password_hash;
//                 const esValida = await argon2.verify(hashGuardado, password);
//                 res.json(esValida)
//             }
//             else {
//                 res.json(false)
//             }
//         }
//     });
// });

// export default router;




import express from "express";
import { conexion } from "../conexion.mjs";
import argon2 from "argon2";

const router = express.Router();

router.get("/", async (req, res) => {
    const { usuario, password } = req.query;

    const q1 = `SELECT password_hash FROM Usuarios.usuarios WHERE usuario = ?`;

    conexion.query(q1, [usuario], async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error en base de datos" });
        }

        if (result.length === 0) {
            return res.json(false);
        }

        const hashGuardado = result[0].password_hash;

        try {
            const esValida = await argon2.verify(hashGuardado, password);
            return res.json(esValida);
        } catch (e) {
            console.log("Error verificando hash:", e);
            return res.status(500).json({ error: "Error verificando contraseña" });
        }
    });
});

export default router;

