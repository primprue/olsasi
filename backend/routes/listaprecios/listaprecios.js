var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en listaprecios");
    } else {
        console.log("no se conecto en listaprecios");
    }
});

var router = express();

router.get('/', function (req, res, next) {
    q1 = ['select * from BasePresup.PresupParam'].join(' ')
    console.log('q1  ', q1)
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            var coefmay = result[0].coeficientemay
            var coefmin = result[0].coeficientemin
            var q = ['Select  concat(idStkRubro, StkRubroCodGrp, StkRubroAbr ) as id, idStkRubro, StkRubroCodGrp, StkRubroDesc, StkGrupo.StkGrupoDesc as GrupoDesc, ',
                'StkRubroAncho, StkRubroPres, ',
                'date_format(StkRubroFecha, "%d-%m-%Y") as StkRubroFecha,  ',
                'round((StkRubroCosto * StkMonedasCotizacion * ' + coefmin + ' ),0) as PPub, ',
                'round((StkRubroCosto * StkMonedasCotizacion * ' + coefmay + ' ),0) as PMay ',
                'from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas ',
                'where StkRubroCodGrp = idStkGrupo',
                'and StkRubroProv = idProveedores ',
                'and StkRubroTM = idStkMonedas ',
                'and StkRubroCodGrp = idStkGrupo ',
                'order by StkRubroCodGrp, idStkRubro',].join(' ')

            conexion.query(q,
                function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(result);
                    }
                });
        });
});

module.exports = router;