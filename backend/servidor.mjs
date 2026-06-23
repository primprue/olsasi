import 'dotenv/config';
import path from 'path';
import express from 'express';
import app from './backend.mjs'; // Tu lógica de API está aquí

const PORT = process.env.PORT || 4001;

app.get('/', (req, res) => {
    res.send("¡Servidor Funcionando!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);

});