import express from "express";
var router = express.Router();
import moment from "moment";
import conexion from "../../conexion.mjs";

moment.locale("es");

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en movstockagregar");
    } else {
        console.log("no se conecto en movstockagregar");
    }
});

router.all("/", async function (req, res) {
    var movareg = req.body.movareg
    var d = new Date();
    let finalDate = d.toISOString().split("T")[0];



    var registro = {
        StkMovFecha: finalDate,
        StkMovLargo: movareg[0].StkLargo,
        StkMovAncho: movareg[0].StkAncho,
        StkMovTotal: movareg[0].StkMovTotal,
        StkMovRubroAbr: movareg[0].StkMovRubroAbr,
        StkMovItemDesc: movareg[0].StkMovItemDesc,
        StkMovCliente: movareg[0].StkMovCliente,
        StkMovProv: movareg[0].StkMovProv,
        StkMovNroRef: movareg[0].StkMovNroRef,

    };

    conexion.query("INSERT INTO BaseStock.StkMov SET ?", registro, function (err, result) {
        if (err) {
            if (err.errno == 1062) {
                return res.status(460).send({ message: "error clave duplicada" });
            } else if (err.errno == 1406 || err.errno == 1264) {
                console.log(err.errno);
                return res
                    .status(410)
                    .send({ message: "Abreviatura con más de cinco letras" });
            }
            {
                console.log(err.errno);
            }
        } else {
            res.json(result);

        }
    })

});

conexion.end;
export default router;
