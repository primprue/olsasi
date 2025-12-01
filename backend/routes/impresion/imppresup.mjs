import express from "express";
var router = express.Router();
import path from "path";
import variables from '../../public/variables.mjs';
import PdfPrinter from 'pdfmake';
import dateFormat from 'dateformat';
import fs from 'fs';



var TotalPresup = 0
const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
})


var fonts = {
    Roboto: {
        normal: '/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf',
        bold: '/usr/share/fonts/truetype/ubuntu/UbuntuMono-RI.ttf',
        italics: '/usr/share/fonts/truetype/ubuntu/Ubuntu-LI.ttf ',
        bolditalics: '/usr/share/fonts/truetype/ubuntu/Ubuntu-RI.ttf',
    }
};
router.post("/", function (req, res, next) {

    var datospresup = req.body.datospresup
    var descrip = req.body.descrip
    var Presupuestonro = req.body.nroPresupuesto
    var TipoPresup = ''

    datospresup.forEach(item => {
        if (item.dcalculo[0].tipopresup === 'BOLSON PARA TANQUE') {
            TipoPresup = 'BOLSON PARA TANQUE'

        }
    });

    var maymin = req.body.PresupMnMy
    var d = new Date();
    var Fecha = dateFormat(d, "dd-mm-yyyy");
    var condicionpago1 = []
    var tipoleygral = 0
    var operador = ''
    var i = 0
    var condicionesvs = req.body.condpagoeleg
    var index = 0
    condicionesvs.forEach(element => {
        if (element[0].PresupDetPieLeyenda.search('Operador') === 0) {
            // operador = req.body.condpagoeleg[i].PresupDetPieLeyenda
            operador = element[0].PresupDetPieLeyenda
        }
        else {
            condicionpago1.push(element[0].PresupDetPieLeyenda)
            tipoleygral = tipoleygral + element[0].PresupDetPieLeyenda.search('seña')
        }
    });

    condicionpago1.push(req.body.otraCondicion)
    TotalPresup = req.body.suma

    var Cliente = req.body.nomCliente
    // var Telefono = req.body.otraCondicion
    var largocli = Cliente.length
    while ((Cliente.substr(largocli, 1) == ' ' || Cliente.substr(largocli, 1) == '') && largocli >= 0) {
        largocli--
    }

    Cliente = Cliente.substr(0, largocli + 1)

    var nombrepresup = 'Presupuesto nro ' + Presupuestonro + ' ' + Cliente + ' ' + Fecha + '.pdf'
    var rows = [];
    var condpag = [];
    var condpaggral = [];
    var notatanque = [];
    var encabcolum = [];
    var ac1 = 0, ac2 = 0, ac3 = 0, ac4 = 0, ac5 = 0, ac6 = 0, ac7 = 0
    var opciones = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']

    var a = 'N'

    if (TotalPresup === 0) {
        if (descrip === '') {
            rows.push([{ text: 'Opc.', style: 'header' }, { text: 'Cant', style: 'header' }, { text: 'Descripción', style: 'header' }, { text: 'Largo', style: 'header' }, { text: 'Ancho', style: 'header' }, { text: 'Imp. Unit.', style: 'header' }, { text: 'Imp. Item.', style: 'header' }]);
            datospresup.map(reng => {
                var Opcion = { text: opciones[i], style: 'tableDatosD' }
                var Cantidad = { text: reng.PresupCantidad.toString(), style: 'tableDatosD' }
                var Descripcion = { text: reng.StkRubroDesc, style: 'tableDatosI' }
                var Largo = { text: reng.PresupLargo.toString(), style: 'tableDatosD' }
                var Ancho = { text: reng.PresupAncho.toString(), style: 'tableDatosD' }
                var ImpUnit = { text: formatter.format(reng.ImpUnitario).toString(), style: 'tableDatosD' }
                //var ImpUnit = { text: (reng.ImpUnitario).toString(), style: 'tableDatosD' }
                var ImpItem = { text: formatter.format(reng.ImpItem).toString(), style: 'tableDatosD' }
                rows.push([Opcion, Cantidad, Descripcion, Largo, Ancho, ImpUnit, ImpItem])
                i++
            })
            ac1 = 25, ac2 = 25, ac3 = 200, ac4 = '*', ac5 = '*', ac6 = 70, ac7 = 70

        }



        else {
            rows.push([{ text: 'Opc.', style: 'header' }, { text: 'Cant', style: 'header' }, { text: 'Descripción', style: 'header' }, { text: 'Imp. Unit.', style: 'header' }, { text: 'Imp. Item.', style: 'header' }]);
            datospresup.map(reng => {
                var Opcion = { text: opciones[i], style: 'tableDatosD' }
                var Cantidad = { text: reng.PresupCantidad.toString(), style: 'tableDatosD' }
                var Descripcion = { text: reng.StkRubroDesc, style: 'tableDatosI' }
                var ImpUnit = { text: formatter.format(reng.ImpUnitario).toString(), style: 'tableDatosD' }
                var ImpItem = { text: formatter.format(reng.ImpItem).toString(), style: 'tableDatosD' }
                rows.push([Opcion, Cantidad, Descripcion, ImpUnit, ImpItem])
                i++
            })
            ac1 = 25, ac2 = 25, ac3 = 200, ac4 = '*', ac5 = '*', ac6 = 70, ac7 = 70
        }
    }
    else {
        if (descrip === '') {
            rows.push([{ text: 'Cant', style: 'header' }, { text: 'Descripción', style: 'header' }, { text: 'Largo', style: 'header' }, { text: 'Ancho', style: 'header' }, { text: 'Imp. Unit.', style: 'header' }, { text: 'Imp. Item.', style: 'header' }]);

            datospresup.map(reng => {
                var Cantidad = { text: reng.PresupCantidad.toString(), style: 'tableDatosD' }
                var Descripcion = { text: reng.StkRubroDesc, style: 'tableDatosI' }
                var Largo = { text: reng.PresupLargo.toString(), style: 'tableDatosD' }
                var Ancho = { text: reng.PresupAncho.toString(), style: 'tableDatosD' }
                var ImpUnit = { text: formatter.format(reng.ImpUnitario).toString(), style: 'tableDatosD' }
                var ImpItem = { text: formatter.format(reng.ImpItem).toString(), style: 'tableDatosD' }
                rows.push([Cantidad, Descripcion, Largo, Ancho, ImpUnit, ImpItem])
            })
            var Descripcion = { text: 'Total', colSpan: 5, style: 'tableDatosTot' }
            var ImpItem = { text: formatter.format(TotalPresup).toString(), style: 'textoDTot' }
            rows.push([Descripcion, '', '', '', '', ImpItem])
            ac1 = 25, ac2 = 200, ac3 = 40, ac4 = 40, ac5 = 70, ac6 = 70, ac7 = '*'

        }
        else {
            rows.push([{ text: 'Cant', style: 'header' }, { text: 'Descripción', style: 'header' }, { text: 'Imp. Unit.', style: 'header' }, { text: 'Imp. Item.', style: 'header' }]);

            datospresup.map(reng => {
                var Cantidad = { text: reng.PresupCantidad.toString(), style: 'tableDatosD' }
                var Descripcion = { text: reng.StkRubroDesc, style: 'tableDatosI' }
                var ImpUnit = { text: formatter.format(reng.ImpUnitario).toString(), style: 'tableDatosD' }
                var ImpItem = { text: formatter.format(reng.ImpItem).toString(), style: 'tableDatosD' }
                rows.push([Cantidad, Descripcion, ImpUnit, ImpItem])
            })
            Descripcion = { text: 'Total', colSpan: 3, style: 'tableDatosTot' }
            ImpItem = { text: formatter.format(TotalPresup).toString(), style: 'textoDTot' }
            rows.push([Descripcion, '', '', ImpItem])
            ac1 = 25, ac2 = 200, ac3 = 70, ac4 = 70, ac5 = '*', ac6 = '*', ac7 = '*'

        }
    }
    if (condicionpago1.length > 0) {
        condpag.push([{ text: 'Condiciones de presupuesto', style: 'resaltado' }])
        condpag.push(condicionpago1)
        if (maymin === 'mn') {
            if (tipoleygral < 0) {
                condpaggral.push([{ text: 'El precio acordado, se mantiene, hasta 5 días posteriores a la fecha de entrega establecida.', style: 'resaltado' }])
                condpaggral.push([{ text: 'Pasados los 5 días SE ACTUALIZARÁ A LA FECHA DE RETIRO', style: 'resaltado' }])
                condpaggral.push([{ text: 'Si la mercadería no se retira dentro de los 60 días posteriores a la fecha establecida para la entrega, se considerará abandonada y nuestra empresa dispondrá de ella, incluso para su destrucción, tomando la seña como indemnización del trabajo realizado', style: 'resaltado' }])
            }
            else {
                condpaggral.push([{ text: 'La seña, confirma el precio acordado hasta 5 días posteriores a la fecha de entrega establecida', style: 'resaltado' }])
                condpaggral.push([{ text: 'Pasados los 5 días el SALDO SE ACTUALIZARÁ A LA FECHA DE RETIRO', style: 'resaltado' }])
                condpaggral.push([{ text: 'Si la mercadería no se retira dentro de los 60 días posteriores a la fecha establecida para la entrega, se considerará abandonada y nuestra empresa dispondrá de ella, incluso para su destrucción, tomando la seña como indemnización del trabajo realizado', style: 'resaltado' }])
            }
        }
    }
    if (TipoPresup === 'BOLSON PARA TANQUE') {
        notatanque.push([{ text: 'NOTA :', style: 'resaltado' }])
        notatanque.push([{
            text: '	El bolsón cotizado es una lámina impermeable, no es, un contenedor de líquido. ' +
                'Por tal motivo, debe quedar apoyado sobre una superficie lisa que no tenga porosidad o rugosidad ya que ese tipo de superficie lo perforaría.' +
                ' El agua en el fondo del tanque, una vez lleno, ejerce un peso mayor en la parte más profunda (piso y pared), y van disminuyendo ' +
                'los kilos de presión hacia la parte superior.', style: 'resaltado'
        }])

    }


    var printer = new PdfPrinter(fonts);
    var docDefinition = {
        pageMargins: [40, 130, 40, 40],
        header: {
            margin: 20,
            columns: [
                {
                    image: path.resolve('.') + '/routes/impresion/encabpresup.png',
                    width: 550,
                    height: 100,
                },
            ],
        },
        content: [

            {
                text: 'Bahía Blanca, ' + Fecha,
                style: 'textoD',
            },

            {
                text: ' ',
                style: 'textoD',
            },
            {
                text: ' ',
                style: 'textoD',
            },
            {
                text: 'Sr. ',
                style: 'textoI',
            },
            {
                text: Cliente,
                style: 'textoI',
            },
            // {
            //     text: Telefono,
            //     style: 'textoI',
            // },

            {
                text: ' ',
                style: 'textoD',
            },

            {
                text: 'La aceptación de esta cotización Nro. : ' + Presupuestonro + ', incluye las condiciones al pie de la misma',
                style: 'textoCI',
            },
            {
                text: ' ',
                style: 'textoD',
            },
            {
                style: 'tableDatos',
                table: {
                    headerRows: 1,
                    widths: [ac1, ac2, ac3, ac4, ac5, ac6, ac7],
                    body: rows,
                }
            },
            {
                text: ' ',
                style: 'textoD',
            },
            {
                text: ' ',
                style: 'textoD',
            },
            {
                style: 'tableCond',

                ul: [
                    condpag,
                ]
            },
            {
                text: ' ',
                style: 'textoD',
            },
            {
                text: ' ',
                style: 'textoD',
            },
            {

                style: 'tableCondGral',
                table: {
                    body: [
                        [
                            {
                                ul: [
                                    condpaggral[0],
                                    condpaggral[1],
                                    condpaggral[2],
                                ]
                            }],
                    ]
                }
            },
            {
                text: ' ',
                style: 'textoD',
            },
            {

                style: 'NotaAcTanque',
                table: {
                    body: [

                        notatanque[0],
                        notatanque[1],
                    ]
                }
            },
            {
                text: operador,
                style: 'textoOperador',
            },
        ],

        styles: {
            header: {
                fontSize: 12,
                italics: true,
                alignment: 'center',
                bold: true
            },
            resaltado: {
                fontSize: 12,
                italics: true,
                alignment: 'left',
                bold: true
            },
            subheader: {
                fontSize: 15,
                bold: true,
                italics: true,
                alignment: 'center',

            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            textoCI: {
                fontSize: 12,
                alignment: 'center',
                color: 'red',
                bold: true,
            },
            textoCP: {
                fontSize: 14,
                alignment: 'center',
                color: 'red',
                bold: true,
            },
            textoD: {
                fontSize: 12,
                alignment: 'right',
            },
            textoI: {
                fontSize: 12,
                alignment: 'left',

            },
            tableEncabColumn: {
                margin: [0, 0, 0, 0],
                alignment: 'center',
                bold: true
            },
            tableDatos: {
                fontSize: 11,
                margin: [0, 0, 30, 0],
                alignment: 'center',
            },
            tableDatosI: {
                margin: [0, 0, 0, 15],
                alignment: 'left',
            },
            tableDatosD: {
                margin: [0, 0, 0, 15],
                alignment: 'right',
            },
            tableDatosTot: {
                margin: [0, 0, 0, 15],
                alignment: 'right',
                bold: true
            },
            textoDTot: {
                fontSize: 9,
                alignment: 'right',
                bold: true
            },
            tableCond: {
                fontSize: 11,
                margin: [0, 0, 30, 0],
                alignment: 'left',
            },
            tableCondGral: {
                fontSize: 11,
                margin: [0, 0, 30, 0],
                bold: true,
                color: 'blue',
                markerColor: 'red',
                alignment: 'left',
                fillColor: '#ffff38',
            },
            NotaAcTanque: {
                fontSize: 11,
                margin: [0, 0, 30, 0],
                bold: true,
                color: 'black',
                // markerColor: 'red',
                alignment: 'left',
                fillColor: '#38ff8b',
            },
            textoOperador: {
                fontSize: 8,
                margin: [0, 0, 30, 0],
                bold: false,
                color: 'black',
                //  markerColor: 'red',
                alignment: 'right',
                //fillColor: '#ffff38',
            },

        }

    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream((variables.caminoynombrearch + '/basics.pdf')));
    pdfDoc.pipe(fs.createWriteStream((variables.dirpresupdocumento + nombrepresup)));

    pdfDoc.end();


});

export default router;
