
import express from 'express';
var router = express.Router();
import { conexion } from '../conexion.mjs';

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en otarmatabla");
    } else {
        console.log("no se conecto en otarmatabla");
    }
});


router.get('/', async function (req, res) {
    let datosrec = (req.query.datoselegidoa)


})

conexion.end
export default router;