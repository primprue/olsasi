import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import estilotabla from "../../Styles/Tabla.module.css";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import PrintIcon from '@mui/icons-material/Print';
import { MedCliLeeMed } from './MedCliLeeMed';
const SERVIDOR_URL = import.meta.env.VITE_API_URL_MEDIDAS;
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import { RecargaIcon, BorrarIcono, AgregarIcon, ImpresionEsp, ActividadEsp } from "../../components/comppropios/CustomIcons.jsx";

//https://www.youtube.com/watch?v=1zYf4Yw1jqs usa custom hooks y en el ejemplo maneja promesas y errores
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbar,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { esES } from '@mui/x-data-grid/locales';

function MedCliTablaMedidas(clienteeleg) {
    // 1. Estado para controlar la imagen que se agranda
    const [imagenExpandida, setImagenExpandida] = useState(null);
    const [rows, setRows] = React.useState([]);


    const frentedorso = [
        { value: "F", label: "F" },
        { value: "D", label: "D" },
    ];
    // 2. Definición de las columnas del DataGrid
    const columns = [
        // {
        // 	headerName: "id",
        // 	field: "id",
        // 	editable: "never",
        // 	order: true,
        // 	headerClassName: estilotabla.encabcolumns,
        // },
        {
            headerName: "Nro.Cliente",
            field: "NroClienteMC",
            order: true,
            width: 200,
            editable: false,
            required: false,
            maxLength: 45,
            pattern: /^/,
            xs: 8,
            placeholder: "______",
            headerClassName: estilotabla.encabcolumns,
        },
        {
            headerName: "Nro.Orden",
            field: "NroOrdenTrabajoMC",
            order: true,
            width: 200,
            editable: false,
            required: false,
            maxLength: 45,
            pattern: /^/,
            xs: 8,
            placeholder: "______",
            headerClassName: estilotabla.encabcolumns,
        },
        {
            headerName: "Fecha",
            field: "FechaMedidaMC",
            order: true,
            type: "date",
            width: 100,
            required: false,
            editable: true,
            maxLength: 10,
            valueFormatter: (value) => {
                if (!value) return '';
                const date = value instanceof Date ? value : new Date(value);
                return date.toLocaleDateString('es-ES');
            },
            headerClassName: estilotabla.encabcolumns,
        },
        {
            headerName: "Detalle",
            field: "DetalleMC",
            order: true,
            width: 200,
            editable: true,
            required: false,
            maxLength: 45,
            pattern: /^/,
            xs: 8,
            placeholder: "______",
            headerClassName: estilotabla.encabcolumns,
        },
        {
            headerName: "F / D",
            field: "FrenteDorsoMC",
            type: "singleSelect",
            required: true,
            valueOptions: frentedorso,
            editable: true,
            xs: 4,
            headerClassName: estilotabla.encabcolumns,
        },
        {
            headerName: "Patente",
            field: "PatenteMC",
            order: true,
            width: 200,
            editable: true,
            required: false,
            maxLength: 45,
            pattern: /^/,
            xs: 8,
            placeholder: "______",
            headerClassName: estilotabla.encabcolumns,
        },
        {
            headerName: "Identificación",
            field: "IdentificacionMC",
            order: true,
            width: 200,
            editable: true,
            required: false,
            maxLength: 45,
            pattern: /^/,
            xs: 8,
            placeholder: "______",
            headerClassName: estilotabla.encabcolumns,
        },

        // COLUMNA DE LA IMAGEN
        {
            field: 'NombreArchivo', // El nombre del campo que viene de Node/MySQL
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
                            width: '70px',
                            height: '70px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            cursor: 'pointer', // Cambia el cursor a una mano para indicar que es clickeable
                            marginTop: '5px'
                        }}
                        // onError={(e) => {
                        //     // Por si la imagen no existe en el servidor, pones una por defecto
                        //     e.target.src = "/imagen-no-disponible.jpg";
                        // }}
                        // Al hacer clic, guardamos la URL en el estado para abrir el modal
                        onClick={() => setImagenExpandida(urlImagen)}
                    />
                );
            }
        }
    ];

    async function dataFetch() {
        const data = await MedCliLeeMed(clienteeleg.clienteeleg);
        setRows(data);
    }
    async function initialFetch() {
        dataFetch();
    }

    useEffect(() => {
        initialFetch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function CustomToolbar() {
        return (
            <GridToolbarContainer
            >
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport
                    slotProps={{
                        tooltip: {
                            title: "Cuando se exporta, en LibreCalc, las columnas con números, en Campos Tipo de Columna, elegir Inglés (US)",
                            arrow: true
                            // Aquí MUI se encarga de que el tooltip se cierre automáticamente al abrir el menú
                        }
                    }}
                />

            </GridToolbarContainer>
        );
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
            {/* El DataGrid de React */}
            <DataGrid rows={rows} columns={columns} pageSize={5}
                slots={{
                    toolbar: CustomToolbar,
                    csvOptions: {
                        fileName: 'datos_exportados',
                        delimiter: ';', // Cambiar separador CSV
                        includeHeaders: true,
                        utf8WithBom: true,
                    },
                }} />
            {/* 4. MODAL / DIALOG */}

            <Dialog
                open={Boolean(imagenExpandida)}
                onClose={() => setImagenExpandida(null)}
                maxWidth="md"
                PaperProps={{
                    style: {
                        margin: 0,
                        padding: 0,
                        width: '100%',
                        height: '100%',
                    },
                }}
            >
                {/* Añadimos el id aquí para identificarlo en el CSS de impresión */}
                <div id="root-impresion" className="modal-impresion" style={{ position: 'relative', textAlign: 'center', backgroundColor: '#000', padding: '20px' }}>

                    {/* BOTÓN PARA CERRAR */}
                    <IconButton
                        onClick={() => setImagenExpandida(null)}
                        style={{ position: 'absolute', right: 10, top: 10, color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10 }}
                        className="ocultar-al-imprimir"
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* BOTÓN PARA IMPRIMIR */}
                    <IconButton
                        onClick={() => window.print()}
                        style={{ position: 'absolute', right: 60, top: 10, color: '#fff', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10 }}
                        className="ocultar-al-imprimir"
                    >
                        <PrintIcon />
                    </IconButton>

                    {/* IMAGEN EN TAMAÑO GRANDE */}
                    <img
                        src={imagenExpandida}
                        alt="Visualización ampliada"
                        style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto' }}
                        className="imagen-imprimir"
                    ></img>

                    {/* Estilos de impresión corregidos */}
                    <style>{`
            @media print {
                @page {
                    size: A4 portrait; 
                    margin: 0mm; 
                }

                /* 1. Ocultamos el contenedor principal de tu app (asumiendo que es #root o .App) 
                   y cualquier contenedor de Dialogs de Material-UI que no sea el nuestro */
                #root, 
                .MuiDialog-root:not(:has(#root-impresion)) {
                    display: none !important;
                }

                /* 2. Aseguramos que el Dialog actual y sus padres directos sean visibles */
                body, html, .MuiDialog-root:has(#root-impresion), .MuiDialog-container {
                    display: block !important;
                    width: 100% !important;
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    overflow: hidden !important;
                }

                /* 3. Forzamos al contenedor del modal a ocupar la hoja completa */
                #root-impresion {
                    position: fixed !important;
                    left: 0 !important;
                    top: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    background-color: white !important; /* Cambiado a blanco para no gastar tinta negra */
                    padding: 0 !important;
                    margin: 0 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }

                /* 4. Ajustamos la imagen para que use todo el espacio A4 disponible */
                #root-impresion .imagen-imprimir {
                    display: block !important;
                    max-width: 100% !important;
                    max-height: 100% !important;
                    width: auto !important;
                    height: auto !important;
                    object-fit: contain !important;
                }

                /* 5. Ocultamos los botones permanentemente en el papel */
                .ocultar-al-imprimir {
                    display: none !important;
                }
            }
        `}</style>
                </div>
            </Dialog>

        </div>
    );
}

export default MedCliTablaMedidas;