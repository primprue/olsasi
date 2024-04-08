var express = require("express");
var router = express.Router();

var fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};
const PDFDocument = require('pdfkit');
const doc = new PDFDocument;
//var PdfPrinter = require('../../node_modules/pdfmake/src/printer');
//var printer = new PdfPrinter(fonts);
var fs = require('fs');


var router = express();

// router.post("/", function (req, res, next) {
console.log('ingrese a immpresup')
// var docDefinition = {
//     content: [
//         'First paragraph',
//         'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
//     ]
// };
doc.text('Hello world!')
console.log('ingrese a immpresup 2')

doc.pipe(fs.createWriteStream('basics.pdf'));

console.log('ingrese a immpresup 3')
// doc.pipe(res);
doc.end();

// })
// module.exports = router;