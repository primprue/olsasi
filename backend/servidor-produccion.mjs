
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import app from './backend.mjs'; // Aquí ya viene el app con todas las rutas /clientes, /proveedores, etc.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Definimos la ruta de DIST (donde está tu React build)
const rutaDist = path.resolve(__dirname, 'dist');
const PORT = process.env.PORT || 8080;

console.log('📂 Intentando servir Front desde:', rutaDist);

// 2. Servir archivos estáticos de React
app.use(express.static(rutaDist));

// 3. Servir documentos externos (si existen)
const RUTA_PUBLICOS = process.env.RUTA_INTERNA_DOC ? path.join(process.env.RUTA_INTERNA_DOC, 'archivos-pdf') : null;
if (RUTA_PUBLICOS && !fs.existsSync(RUTA_PUBLICOS)) {
    fs.mkdirSync(RUTA_PUBLICOS, { recursive: true });
}
if (RUTA_PUBLICOS) {
    app.use('/archivos-pdf', express.static(RUTA_PUBLICOS));
}

// 4. El COMODÍN (Catch-all) - DEBE IR AL FINAL DE TODO
app.get('*', (req, res) => {
    // Si es una ruta que debería ser de API pero no existe, 404
    if (req.path.startsWith('/api') || req.path.startsWith('/proveedores')) {
        return res.status(404).json({ error: "Ruta de API no encontrada" });
    }

    const archivoIndex = path.join(rutaDist, 'index.html');

    // Log para confirmar que la petición entró aquí
    console.log('✅ Sirviendo index.html para la ruta:', req.path);

    res.sendFile(archivoIndex, (err) => {
        if (err) {
            console.error("❌ Error enviando index.html:", err);
            res.status(404).send("Error: No se encuentra la carpeta dist o el index.html de SistOLSA");
        }
    });
});

// 5. Arrancar el motor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SistOLSA activo en puerto ${PORT} (0.0.0.0)`);
});
