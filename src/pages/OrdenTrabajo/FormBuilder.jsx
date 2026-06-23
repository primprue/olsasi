import React, { useState } from 'react';

export default function FormBuilder() {
    // Aquí se guarda la estructura del formulario que diseña el usuario
    const [campos, setCampos] = useState([]);
    const [nombreFormulario, setNombreFormulario] = useState('');

    // Función para añadir un nuevo campo al diseño
    const agregarCampo = (tipo) => {
        const nuevoCampo = {
            id: `campo_${Date.now()}`, // ID único temporal para el input
            tipo: tipo,
            label: `Nuevo Campo ${tipo.toUpperCase()}`,
            requerido: false,
            opciones: tipo === 'select' ? ['Opción 1', 'Opción 2'] : [] // Solo si es un select
        };
        setCampos([...campos, nuevoCampo]);
    };

    // Función para actualizar las propiedades de un campo específico (ej: cambiar el Label)
    const modificarCampo = (id, propiedad, valor) => {
        const camposActualizados = campos.map((campo) => {
            if (campo.id === id) {
                return { ...campo, [propiedad]: valor };
            }
            return campo;
        });
        setCampos(camposActualizados);
    };

    // Función para eliminar un campo del diseño
    const eliminarCampo = (id) => {
        setCampos(campos.filter((campo) => campo.id !== id));
    };

    // Guardar la estructura en el backend
    const guardarEstructura = async () => {
        const payload = {
            nombre: nombreFormulario,
            estructura: campos // Este array va directo a la columna JSON
        };

        try {
            // Reemplazar por tu lógica de envío/comunicación habitual con Node
            console.log("Enviando al backend:", payload);
            // Ejemplo: miServicio.post('/formularios/crear', payload);
        } catch (error) {
            console.error("Error al guardar el formulario", error);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>

            {/* PANEL LATERAL: Herramientas para agregar */}
            <div style={{ width: '250px', border: '1px solid #ccc', padding: '15px' }}>
                <h3>Herramientas</h3>
                <button onClick={() => agregarCampo('text')} style={{ display: 'block', margin: '10px 0', width: '100%' }}>
                    + Campo de Texto
                </button>
                <button onClick={() => agregarCampo('number')} style={{ display: 'block', margin: '10px 0', width: '100%' }}>
                    + Campo Numérico
                </button>
                <button onClick={() => agregarCampo('select')} style={{ display: 'block', margin: '10px 0', width: '100%' }}>
                    + Selector (Select)
                </button>
            </div>

            {/* PANEL CENTRAL: El formulario en construcción */}
            <div style={{ flex: 1, border: '1px solid #ccc', padding: '15px' }}>
                <input
                    type="text"
                    placeholder="Nombre del Formulario (ej: Alta de Proveedores)"
                    value={nombreFormulario}
                    onChange={(e) => setNombreFormulario(e.target.value)}
                    style={{ width: '100%', marginBottom: '20px', fontSize: '18px', padding: '5px' }}
                />

                <h3>Vista Previa / Configuración de Campos</h3>
                {campos.length === 0 && <p>El formulario está vacío. Agregá campos desde el panel lateral.</p>}

                {campos.map((campo, index) => (
                    <div key={campo.id} style={{ border: '1px dashed #aaa', padding: '10px', marginBottom: '10px', background: '#f9f9f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <strong>Campo #{index + 1} ({campo.tipo})</strong>
                            <button onClick={() => eliminarCampo(campo.id)} style={{ color: 'red' }}>Eliminar</button>
                        </div>

                        {/* Configurar el Label de este campo en tiempo real */}
                        <label style={{ display: 'block', marginBottom: '5px' }}>
                            Etiqueta del campo:
                            <input
                                type="text"
                                value={campo.label}
                                onChange={(e) => modificarCampo(campo.id, 'label', e.target.value)}
                                style={{ marginLeft: '10px', width: '60%' }}
                            />
                        </label>

                        {/* Configurar si es obligatorio */}
                        <label style={{ display: 'block', marginTop: '5px' }}>
                            <input
                                type="checkbox"
                                checked={campo.requerido}
                                onChange={(e) => modificarCampo(campo.id, 'requerido', e.target.checked)}
                            /> Obligatorio
                        </label>

                        {/* Si es un select, permitir configurar las opciones separadas por coma */}
                        {campo.tipo === 'select' && (
                            <label style={{ display: 'block', marginTop: '5px' }}>
                                Opciones (separadas por coma):
                                <input
                                    type="text"
                                    value={campo.opciones.join(', ')}
                                    onChange={(e) => modificarCampo(campo.id, 'opciones', e.target.value.split(',').map(o => o.trim()))}
                                    style={{ marginLeft: '10px', width: '60%' }}
                                />
                            </label>
                        )}
                    </div>
                ))}

                {campos.length > 0 && (
                    <button onClick={guardarEstructura} style={{ marginTop: '20px', padding: '10px 20px', background: 'green', color: 'white' }}>
                        Guardar Estructura del Formulario
                    </button>
                )}
            </div>

        </div>
    );
}