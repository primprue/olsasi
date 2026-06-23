import React, { useRef } from 'react'
import { OTDatosLee } from "./OTDatosLee.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { use } from "react";
import PresupPant from "../../../context/PresupPant.jsx";
import FilaUnoIzq from "../../Presupuesto/LayoutPresupuesto/FilaUno/FilaUnoIzq.jsx";
import { Box, Button, Dialog, TextField } from '@mui/material';
import formdata from "./formdata.js";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import OTDatosAgregarForm from './OTDatosAgregarForm.jsx';
// import { OTDatosAgregar } from './OTDatosAgregar.jsx';
import FitbitIcon from "@mui/icons-material/Fitbit";
import { deepOrange, red, blue, green, purple } from "@mui/material/colors";
import OTDatosAgrOpc from './OTDatosAgrOpc.jsx';
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import estilotabla from "../../../Styles/Tabla.module.css";
import { DialogoDatos } from '../../../components/DialogoDatos.jsx';
import TablasContexto from '../../../context/TablasContext.jsx';
import OrdTrabajo from '../../../context/OrdTrabajo.jsx';
// import { OTDatosModificar } from './OTDatosModificar.jsx';
import { DatosModificar } from '../../../components/DatosModificar.jsx';
import { llenarcolumns } from './colreorden.jsx';
// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function OTDatosReorden(props) {
    const { open, handleClose, datosreorden } = props;
    const { formdatos, setFormdatos } = use(TablasContexto);
    const { otdatos, setOTdatos } = use(OrdTrabajo);
    const { state, setState } = use(PresupPant);
    const [abreagregar, setAbreagregar] = useState(false);
    const [datosacargar, setDatosaCargar] = useState('');
    const [params, setParams] = useState();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const arrayModificado = datosreorden.map(({ idOTDatos, ...resto }) => ({
        id: idOTDatos,
        ...resto
    }));
    const estiloBoton = {
        backgroundColor: formdatos.color,
        '& .MuiButton-root': {
            color: 'rgb(10, 0, 0)',
            transition: 'all 0.2s ease-in-out', // hace que el agrandamiento sea suave
            fontSize: '0.9rem', // tamaño base
            '&:hover': {
                fontStyle: 'italic',
                fontSize: '1.05rem', // más grande al pasar el mouse
                backgroundColor: formdatos.color,
            },
        }
    }

    async function columnsFetch() {
        var col = await llenarcolumns();
        setColumns(col);
    }

    async function initialFetch() {
        columnsFetch();
        // setRows(datosreorden);
    }

    useEffect(() => {
        initialFetch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps





    const handleProcessRowUpdate = (updatedRow) => {
        setRows(rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
        return updatedRow;
    };
    const handleChange = (id, key, value) => {
        setDatosaCargar((prevData) =>
            prevData.map((item) =>
                item.idOTDatos === id
                    ? {
                        ...item,
                        OTDatosOpciones: {
                            ...item.OTDatosOpciones,
                            [key]: value,
                        },
                    }
                    : item
            )
        );
    };

    const useFakeMutation = () => {
        return React.useCallback(
            (user) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (user.name?.trim() === "") {
                            reject(new Error("Error el campo no puede estar vacío"));
                        } else {
                            resolve({ ...user, name: user.name?.toUpperCase() });
                        }
                    }, 200);
                }),
            []
        );
    };
    const [rowv, setRowv] = useState();
    const [rown, setRown] = useState();
    const [rowsel, setRowSel] = useState();
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: "error" });
    }, []);
    const mutateRow = useFakeMutation();
    const processRowUpdate = React.useCallback(
        async (newRow, oldRow) => {
            setRown(newRow);
            setRowv(oldRow);
            const response = await mutateRow(newRow);
            setSnackbar({
                children: "Modificado no confirmado",
                severity: "success",
            });
            return response;
        },
        [mutateRow]
    );
    const handleRowSelect = ({ row }) => {
        setRowSel(row);
    };

    const handleModifica = (params) => {
        DatosModificar(params, formdata.nombackmodificar);
        relee();
    };
    async function relee() {
        const data = await OTDatosLee();
        setRows(data);
    }


    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={estiloBoton}>

                <CheckCircleTwoToneIcon
                    variant="contained"
                    titleAccess="Confirma Modificación"
                    className={estilotabla.iconomodificar}
                    onClick={() => handleModifica(rown)}
                />


                <Button onClick={reordenar}>Reordenar</Button>
            </GridToolbarContainer>
        );
    }
    // const DraggableRow = (props) => {
    //     const { id, index } = props;
    //     console.log('props.id ', id)
    //     console.log('indexo ', index)
    //     return (
    //         <Draggable draggableId={String(id)} index={index}>
    //             {(provided, snapshot) => (
    //                 <div
    //                     ref={provided.innerRef}
    //                     {...provided.draggableProps}
    //                     {...provided.dragHandleProps}
    //                     style={{
    //                         ...provided.draggableProps.style,
    //                         backgroundColor: snapshot.isDragging ? '#e3f2fd' : 'transparent',
    //                     }}
    //                 >
    //                     <GridRow {...props} />
    //                 </div>
    //             )}
    //         </Draggable>
    //     );
    // };
    const moveRow = (id, direction) => {
        const currentIndex = rows.findIndex((row) => row.id === id);
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

        // Evita salirte de los límites del arreglo
        if (targetIndex < 0 || targetIndex >= rows.length) return;

        const updatedRows = [...rows];
        // Intercambia las posiciones de las filas
        const temp = updatedRows[currentIndex];
        updatedRows[currentIndex] = updatedRows[targetIndex];
        updatedRows[targetIndex] = temp;

        setRows(updatedRows);
    };

    const reordenar = () => {
        console.log('rows en reordenar ', rows)
    };
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
                fullWidth={true}

            >

                {/* {rows.length > 0 && */}
                <DataGrid
                    rows={arrayModificado}
                    columns={columns}
                    processRowUpdate={processRowUpdate}
                    className={estilotabla.tablasotdatos}
                    // onRowClick={handleRowSelect}
                    disableRowSelectionOnClick
                    pageSize={5}
                    slots={{
                        toolbar: CustomToolbar,
                        // row: (props) => {
                        //     // Buscamos el índice real de la fila para pasárselo a Draggable
                        //     const index = rows.findIndex((r) => r.id_campo === props.id);
                        //     return <DraggableRow {...props} index={index} />;
                        // },
                    }}
                    columnHeaderHeight={35}
                    pageSizeOptions={[15]}
                />
                {/* } */}


            </Dialog>
        </>
    )
}

