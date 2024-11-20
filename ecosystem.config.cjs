module.exports = {
    apps: [
        {
            name: "backend-server", // Nombre del proceso principal
            script: "/home/sandra/SistOLSA/olsasi/backend/node_modules/.bin/gulp",
            // Comando para ejecutar el servicio
            args: "debug", // Argumentos adicionales para Gulp
            cwd: "/home/sandra/SistOLSA/olsasi/backend",
            watch: false, // Opcional: desactiva watc
            env: {
                NODE_ENV: "production",
            },
        },
        {
            name: "backend-service", // Nombre del segundo proceso
            script: "servidor.mjs", // Script para iniciar el servidor principal
            cwd: "/home/sandra/SistOLSA/olsasi/backend/",
            watch: false, // Opcional: desactiva watch en producción
            env: {
                NODE_ENV: "production", // Configuración para producción
            },
        },
        {
            name: "frontend", // Frontend con Vite
            script: "npm",
            args: "run dev", // Usa el comando para servir el frontend
            cwd: "/home/sandra/SistOLSA/olsasi/dist/",
            watch: false,
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
