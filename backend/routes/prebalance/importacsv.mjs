const fs = require('fs');
const mysql = require('mysql2/promise');
const csv = require('csv-parser');

const archivoCSV = '/home/sandra/Descargas/comprec/comprec.csv'; // tu archivo
const nombreTabla = 'movingarca';    // nombre de la tabla a crear

async function importarCSV() {
    const connection = await mysql.createConnection({
        user: "sandra",
        password: "drasan141",
        host: "localhost",
        database: "BasePreBalance",
        port: 3306
    });

    const filas = [];

    // 1. Leer CSV y guardar filas
    fs.createReadStream(archivoCSV)
        .pipe(csv())
        .on('data', (data) => filas.push(data))
        .on('end', async () => {
            if (filas.length === 0) {
                console.log('El archivo está vacío.');
                return;
            }

            // 2. Crear tabla dinámicamente
            const columnas = Object.keys(filas[0]);
            const definiciones = columnas.map(col => `\`${col}\` VARCHAR(255)`).join(', ');

            const dropQuery = `DROP TABLE IF EXISTS \`${nombreTabla}\``;
            const createQuery = `CREATE TABLE \`${nombreTabla}\` (${definiciones})`;

            await connection.execute(dropQuery);
            await connection.execute(createQuery);

            // 3. Insertar datos
            const placeholders = columnas.map(() => '?').join(', ');
            const insertQuery = `INSERT INTO \`${nombreTabla}\` (${columnas.map(col => `\`${col}\``).join(', ')}) VALUES (${placeholders})`;

            for (const fila of filas) {
                const valores = columnas.map(col => fila[col]);
                await connection.execute(insertQuery, valores);
            }

            console.log(`Importación completada: ${filas.length} filas insertadas.`);
            await connection.end();
        });
}

importarCSV().catch(err => {
    console.error('Error:', err);
});
