import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';


export default function CanvasFormBuilder() {
    const [campos, setCampos] = useState([]);

    // Al hacer clic en un botón, insertamos el campo en la primera posición disponible
    const agregarCampoAlLienzo = (tipo) => {
        const nuevoCampo = {
            id: `input_${Date.now()}`,
            tipo: tipo,
            label: `Nuevo ${tipo}`,
            // Propiedades de posición requeridas por react-grid-layout
            x: 0,
            y: Infinity, // Lo manda al fondo automáticamente
            w: 4,  // Ocupa un tercio del ancho por defecto (4 de 12)
            h: 1   // Alto estándar
        };
        setCampos([...campos, nuevoCampo]);
    };

    // Cada vez que el usuario arrastra o cambia el tamaño de un bloque, la librería nos avisa
    const alCambiarDiseno = (nuevoLayout) => {
        // nuevoLayout contiene las nuevas coordenadas x, y, w, h de cada ID
        const camposActualizados = campos.map(campo => {
            const coordenadasActualizadas = nuevoLayout.find(l => l.i === campo.id);
            if (coordenadasActualizadas) {
                return {
                    ...campo,
                    x: coordenadasActualizadas.x,
                    y: coordenadasActualizadas.y,
                    w: coordenadasActualizadas.w,
                    h: coordenadasActualizadas.h
                };
            }
            return campo;
        });
        setCampos(camposActualizados);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', background: '#f0f2f5', minHeight: '100vh' }}>

            {/* Barra de herramientas superior */}
            <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <button onClick={() => agregarCampoAlLienzo('text')}>+ Texto</button>
                <button onClick={() => agregarCampoAlLienzo('select')} style={{ marginLeft: '10px' }}>+ Selector</button>
            </div>

            {/* La "Hoja en Blanco" (El Lienzo) */}
            <div style={{ background: '#fff', minHeight: '600px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px' }}>

                {/* Mapeamos nuestro estado al formato 'layout' que espera la librería */}
                <GridLayout
                    className="layout"
                    layout={campos.map(c => ({ i: c.id, x: c.x, y: c.y, w: c.w, h: c.h }))}
                    cols={12}
                    rowHeight={80}
                    width={1200}
                    onLayoutChange={alCambiarDiseno}
                    isDraggable={true}
                    isResizable={true}
                >
                    {campos.map((campo) => (
                        <div key={campo.id} style={{ background: '#fafafa', border: '1px solid #1890ff', borderRadius: '4px', padding: '10px', cursor: 'move' }}>
                            <span style={{ fontSize: '12px', color: '#999' }}>{campo.label}</span>
                            {campo.tipo === 'text' && <input type="text" style={{ width: '100%', marginTop: '5px' }} disabled />}
                            {campo.tipo === 'select' && <select style={{ width: '100%', marginTop: '5px' }} disabled><option>Opción...</option></select>}
                        </div>
                    ))}
                </GridLayout>

            </div>
        </div>
    );
}