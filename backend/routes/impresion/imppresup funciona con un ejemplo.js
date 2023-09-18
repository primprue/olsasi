var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");


//var conexion = require('../conexion');
var PdfPrinter = require('pdfmake');
var dateFormat = require('dateformat');
var url = require('url');

// /SistOLSA/OlsaSG/backend/node_modules/pdfmake/examples

var fonts = {
    Roboto: {
        normal: '/home/sandra/SistOLSA/OlsaSG/backend/node_modules/pdfmake/examples/fonts/Roboto-Regular.ttf',
        bold: '/home/sandra/SistOLSA/OlsaSG//backend/node_modules/pdfmake/examples/fonts/Roboto-Medium.ttf',
        italics: '/home/sandra/SistOLSA/OlsaSG/backend/node_modules/pdfmake/examples/fonts/Roboto-Italic.ttf',
        bolditalics: '/home/sandra/SistOLSA/OlsaSG/backend/node_modules/pdfmake/examples/fonts/Roboto-MediumItalic.ttf'
    }
};

var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
    content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ]
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('/home/sandra/Documentos/OLSAFrecuentes/PresupSistema/basics.pdf'));
pdfDoc.end();
// const { ControlPointDuplicate } = require("@material-ui/icons");

// conexion.connect(function (err) {
//     if (!err) {
//         console.log("base de datos conectada en imppresup");
//     } else {
//         console.log("no se conecto en imppresup");
//     }
// });

var router = express();

var TotalPresup = 0
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})



router.post("/", function (req, res, next) {

    var printer = new PdfPrinter(fonts);
    var fs = require('fs');

    var docDefinition = {
        content: [
            'First paragraph',
            'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
        ]
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('basics.pdf'));
    pdfDoc.end();

});

//conexion.end;
module.exports = router;


// function horizontalLine(x, y, length) {
//     return { type: 'line', x1: x, y1: y, x2: x + length, y2: y };
// }

// function verticalLine(x, y, height) {
//     return { type: 'line', x1: x, y1: y, x2: x, y2: y + height };
// }
