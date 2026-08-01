import os from 'os';
export default function obtenerIpLocal() {

    const interfaces = os.networkInterfaces();

    for (const nombreInterfaz in interfaces) {
        for (const interfaz of interfaces[nombreInterfaz]) {
            // Buscamos una dirección IPv4 que no sea la interna (loopback)
            if (interfaz.family === 'IPv4' && !interfaz.internal) {
                return interfaz.address;
            }
        }
    }
    return '127.0.0.1'; // Si no encuentra ninguna, devuelve localhost
}

const miIp = obtenerIpLocal();
console.log("La IP de esta máquina es:", miIp);