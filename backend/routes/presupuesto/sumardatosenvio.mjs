export function sumarDatosEnvio(datosenvio) {
    let total = 0;

    datosenvio.forEach(item => {
        // Si item es un array, tomamos su primer elemento; si no, usamos el mismo item
        const obj = Array.isArray(item) ? item[0] : item;

        if (!obj || typeof obj !== 'object') return;

        // Sumar todos los valores numéricos del objeto
        Object.values(obj).forEach(val => {
            if (val == null) return;

            const str = String(val).trim().replace(',', '.');
            const num = parseFloat(str);

            if (!Number.isNaN(num)) {
                total += num;
            }
        });
    });

    return total;
}
