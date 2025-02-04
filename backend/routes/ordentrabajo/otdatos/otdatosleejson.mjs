const mysql = require('mysql2/promise');

async function fetchData() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'tu_usuario',
        password: 'tu_contraseña',
        database: 'tu_base_de_datos'
    });

    const [rows] = await connection.execute(`
    SELECT idOTDatos, OTDatosDesc, JSON_KEYS(OTDatosOpciones) AS claves, OTDatosOpciones 
    FROM tu_tabla
  `);

    rows.forEach(row => {
        const opciones = JSON.parse(row.OTDatosOpciones);  // Convertir JSON de MySQL a objeto JS
        console.log(`ID: ${row.idOTDatos}, Descripción: ${row.OTDatosDesc}`);
        Object.entries(opciones).forEach(([key, value]) => {
            console.log(`  ${key}: ${value}`);
        });
    });

    await connection.end();
}

fetchData();
