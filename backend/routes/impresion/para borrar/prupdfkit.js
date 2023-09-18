// var fonts = {
//     Roboto: {
//         normal: 'fonts/Roboto-Regular.ttf',
//         bold: 'fonts/Roboto-Medium.ttf',
//         italics: 'fonts/Roboto-Italic.ttf',
//         bolditalics: 'fonts/Roboto-MediumItalic.ttf'
//     }
// };

// var PdfPrinter = require('../src/printer');


// var fonts = {
//     Roboto: {
//         normal: 'Courier',
//         bold: 'Courier-Bold',
//         italics: 'Courier-Oblique',
//         bolditalics: 'Courier-BoldOblique'
//     }
// };
var pdfmake = require('../../node_modules/pdfmake')

var Roboto = require('../../node_modules/pdfmake/fonts/Roboto');
pdfmake.addFonts

var fonts = {
    Roboto: {
        normal: '../../node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf',
        bold: '../../node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf',
        italics: '../../node_modules/pdfmake/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: '../../node_modules/pdfmake/fonts/Roboto/Roboto-MediumItalic.ttf'
    }
};
var PdfPrinter = require('../../node_modules/pdfmake/src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
    content: [
        {
            image: 'encabezado.jpg',
            width: 490,
            height: 350,
            absolutePosition: { x: 100, y: 100 }
        },
        {
            text: 'Empiezo a hacer pruebas para entender el tema del pdfmake',
            style: 'header'
        },

    ],
    styles: {
        header: {
            fontSize: 18,
            bold: true
        },
        subheader: {
            fontSize: 15,
            bold: true
        },
        quote: {
            italics: true
        },
        small: {
            fontSize: 8
        }
    }

};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('basics.pdf'));
pdfDoc.end();
