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
/*
'Select idStkRubro, StkRubroCodGrp, StkGrupo.StkGrupoDesc, StkRubroDesc, StkRubroCosto, StkRubroTM, ' +
                     '(StkRubroCosto * StkMonedasCotizacion * 2.15) as PPub, (StkRubroCosto * StkMonedasCotizacion * 1.77) as PMay, '+ 
                    '((StkRubroCosto * StkMonedasCotizacion * 1.77) + (REPValorMOT/60*1.3)) as PMayPU, ' + 
                    '((StkRubroCosto * StkMonedasCotizacion * 1.77) + (REPValorMOT/60*1.3*2)) as PMayPUR ' + 
                     'from StkRubro JOIN StkGrupo, BasesGenerales.Proveedores, StkMonedas, ' + 
                     'reparacion.parametrosrep where StkRubroCodGrp = idStkGrupo and StkRubroProv = idProveedores ' + 
                     'and StkRubroTM = idStkMonedas order by StkRubroCodGrp',
*/

router.get('/', function (req, res, next) {
    q1 = ['select * from BasePresup.PresupParam'].join(' ')
    conexion.query(q1,
        function (err, result) {
            if (err) {
                console.log(err);
            }
            var coefmay = result[0].coeficientemay
            var coefmin = result[0].coeficientemin
            // var coefmay = param.coeficientemay
            // var coefmin = param.coeficientemin
            // var q = ['Select idStkRubro, StkRubroCodGrp, StkGrupo.StkGrupoDesc,',
            //         ' StkRubroDesc, StkRubroCosto, StkRubroTM, ',
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
});

module.exports = router;