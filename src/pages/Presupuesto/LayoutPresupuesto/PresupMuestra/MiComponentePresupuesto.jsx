import { useState } from 'react';
import request from 'superagent';

const MiComponentePresupuesto = () => {
    // 1. Definimos el estado para la URL del iFrame
    const [urlParaVista, setUrlParaVista] = useState('');

    // 2. La función que "hace el trabajo"
    const prepararVisor = async (nombreArchivo) => {
        try {
            const nombreLimpio = nombreArchivo.replaceAll(" ", "_");
            const host = window.location.hostname;

            // Llamamos al backend (puerto 3001)
            // const res = await request.get(`http://${host}:3001/api/preparar-vista-previa/${nombreLimpio}`);
            const res = await request.get(`http://${host}:4001/api/preparar-vista-previa/${nombreLimpio}`);
            console.log('estoy en MiComponentePresupuesto res ', res)
            // 3. ACTUALIZAMOS EL ESTADO
            // Esto es lo que hace que React "re-renderice" y muestre el iFrame
            // setUrlParaVista(`http://${host}:3001${res.body.urlFinal}`);
            setUrlParaVista(`http://${host}:4001${res.body.urlFinal}`);

        } catch (err) {
            console.error("Error:", err);
            alert("No se pudo cargar el presupuesto");
        }
    };

    return (
        <div>
            {/* Supongamos que tenés tu lista de presupuestos aquí */}
            <button onClick={() => prepararVisor("Presupuesto_Sandra_01")}>
                Ver Presupuesto 01
            </button>

            <hr />

            {/* 4. EL VISOR: Solo se muestra si urlParaVista tiene algo */}
            {urlParaVista ? (
                <div style={{ width: '100%', height: '500px' }}>
                    <iframe
                        src={urlParaVista}
                        width="100%"
                        height="100%"
                        style={{ border: '1px solid #ccc' }}
                        title="Visor de PDF"
                    />
                </div>
            ) : (
                <p>Seleccione un presupuesto para visualizarlo.</p>
            )}
        </div>
    );
};

export default MiComponentePresupuesto;