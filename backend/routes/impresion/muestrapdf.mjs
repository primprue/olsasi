import express from 'express';
import fs from 'fs';
import variables from '../../public/variables.mjs';
const app = express();

app.get('/', (req, res) => {
    const pdfPath = variables.caminoynombrearch + 'basics.pdf';
    fs.readFile(pdfPath, (error, data) => {
        if (error) {
            res.status(500).send('Error al leer el archivo PDF');
            return;
        }
        res.contentType('application/pdf');
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Servidor en funcionamiento en el puerto 3000');
});