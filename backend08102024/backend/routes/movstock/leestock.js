var express = require('express');
var router = express.Router();
var path = require('path');
var conexion = require('../conexion');
//var param = require('../parametros')

conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en leestock");
    } else {
        console.log("no se conecto en leestock");
    }
});

var router = express();


router.get('/', function (req, res, next) {
    var q = ['Select idStkRubro, StkRubroCodGrp, StkRubroDesc, StkGrupo.StkGrupoDesc as GrupoDesc, ',
        'StkRubroAncho, StkRubroPres, ',
        'date_format(StkRubroFecha, "%d-%m-%Y") as StkRubroFecha,  ',
        'round((StkRubroCosto * StkMonedasCotizacion * ' + coefmin + ' ),0) as PPub, ',
        'round((StkRubroCosto * StkMonedasCotizacion * ' + coefmay + ' ),0) as PMay ',
        // '((StkRubroCosto * StkMonedasCotizacion * ' + coefmay + ' ) + (REPValorMOT/60*' + minunion + ')) as PMayPU, ',
        // '((StkRubroCosto * StkMonedasCotizacion * ' + coefmay + ') + (REPValorMOT/60*' + minunion + '*2)) as PMayPUR ',
        'from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas ',
        //     'reparacion.parametrosrep 
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

module.exports = router;