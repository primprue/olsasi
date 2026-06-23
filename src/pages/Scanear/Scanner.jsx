import React, { useState } from 'react';

export default function Scanner() {
    const [imagenUrl, setImagenUrl] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    function manejarEscaneo() {
        // Iniciamos la carga y limpiamos errores o imágenes previas
        setCargando(true);
        setError('');
        setImagenUrl('');

        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4000/api/scans');

        xhr.onload = function () {
            // Finaliza la carga de la petición
            setCargando(false);

            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    console.log('¡Escaneo exitoso!', data);
                    console.log('(data.urlPantalla  ', data.urlPantalla)
                    // Actualizamos el estado con la URL que manda el backend
                    setImagenUrl(data.urlPantalla);
                } catch (e) {
                    setError('Error al procesar la respuesta del servidor.');
                }
            } else {
                // Manejo de errores que vienen del backend (Ej: No se detectó escáner)
                try {
                    const errorData = JSON.parse(xhr.responseText);
                    setError(errorData.detalle || errorData.error || 'Error en el servidor');
                } catch {
                    setError('Hubo un problema con el escáner (Código ' + xhr.status + ').');
                }
            }
        };

        xhr.onerror = function () {
            setCargando(false);
            setError('No se pudo conectar con el servidor de escaneo. ¿Está el backend encendido?');
        };

        xhr.send();
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
            <h2>Escanear Documento (Brother)</h2>

            <button
                onClick={manejarEscaneo}
                disabled={cargando}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: cargando ? '#ccc' : '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: cargando ? 'not-allowed' : 'pointer'
                }}
            >
                {cargando ? 'Escaneando... Por favor espere' : 'Iniciar Escaneo'}
            </button>

            {error && (
                <p style={{ color: 'red', marginTop: '15px' }}>
                    <strong>Error:</strong> {error}
                </p>
            )}

            {imagenUrl && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Vista previa del documento:</h3>
                    <img
                        src={imagenUrl}
                        alt="Documento escaneado"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '600px',
                            border: '1px solid #ddd',
                            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)'
                        }}
                    />
                </div>
            )}
        </div>
    );
}
