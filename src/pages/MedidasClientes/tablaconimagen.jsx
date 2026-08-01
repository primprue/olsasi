import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const SERVIDOR_URL = import.meta.env.VITE_API_URL_MEDIDAS;
// const SERVIDOR_URL = "https://miservidor.com/imagenes/";

function ListaProductos() {
    // 1. Estado para controlar la imagen que se agranda
    const [imagenExpandida, setImagenExpandida] = useState(null);

    // 2. Definición de las columnas del DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nombre', headerName: 'Producto', width: 200 },

        // COLUMNA DE LA IMAGEN
        {
            field: 'nombreArchivoImagen', // El nombre del campo que viene de Node/MySQL
            headerName: 'Imagen',
            width: 120,
            renderCell: (params) => {
                // params.value contiene el nombre del archivo (ej: "producto_42.jpg")
                if (!params.value) return <span>Sin imagen</span>;

                const urlImagen = `${SERVIDOR_URL}${params.value}`;

                return (
                    <img
                        src={urlImagen}
                        alt="Miniatura"
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            cursor: 'pointer', // Cambia el cursor a una mano para indicar que es clickeable
                            marginTop: '5px'
                        }}
                        // Al hacer clic, guardamos la URL en el estado para abrir el modal
                        onClick={() => setImagenExpandida(urlImagen)}
                    />
                );
            }
        }
    ];

    // 3. Datos de ejemplo (lo que traerías de tu consulta MySQL vía Node)
    const rows = [
        { id: 1, nombre: 'Teclado Mecánico', nombreArchivoImagen: 'teclado.jpg' },
        { id: 2, nombre: 'Mouse Gamer', nombreArchivoImagen: 'mouse.jpg' },
        { id: 3, nombre: 'Monitor 24"', nombreArchivoImagen: 'monitor.jpg' },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            {/* El DataGrid de React */}
            <DataGrid rows={rows} columns={columns} pageSize={5} />

            {/* 4. MODAL / DIALOG (Solo se muestra si imagenExpandida tiene una URL) */}
            <Dialog
                open={Boolean(imagenExpandida)}
                onClose={() => setImagenExpandida(null)} // Cierra el modal si hacen clic fuera
                maxWidth="md"
            >
                <div style={{ position: 'relative', textAlign: 'center', backgroundColor: '#000' }}>
                    {/* Botón para cerrar */}
                    <IconButton
                        onClick={() => setImagenExpandida(null)}
                        style={{ position: 'absolute', right: 10, top: 10, color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Imagen en tamaño grande */}
                    <img
                        src={imagenExpandida}
                        alt="Visualización ampliada"
                        style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto' }}
                    />
                </div>
            </Dialog>
        </div>
    );
}

export default ListaProductos;