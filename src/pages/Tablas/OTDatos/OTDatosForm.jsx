import React from 'react'
import { OTDatosLee } from "./OTDatosLee.jsx";
import { llenarcolumns } from "./columns.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { use } from "react";
import PresupPant from "../../../context/PresupPant.jsx";
import FilaUnoIzq from "../../Presupuesto/LayoutPresupuesto/FilaUno/FilaUnoIzq.jsx";
import { Box, Button, TextField } from '@mui/material';
import { formdata } from "./formdata.js";
import TablaMuestra from '../../../components/TablaMuestra.jsx';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { set } from 'date-fns';
import OTDatosAgregarForm from './OTDatosAgregarForm.jsx';
import FitbitIcon from "@mui/icons-material/Fitbit";
import { deepOrange, red, blue, green, purple } from "@mui/material/colors";
import OTDatosAgrOpc from './OTDatosAgrOpc.jsx';
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import estilotabla from "../../../Styles/Tabla.module.css";
import { DialogoDatos } from '../../../components/DialogoDatos.jsx';
export default function OTDatosForm() {
    const { state, setState } = use(PresupPant);
    const [abreagregar, setAbreagregar] = useState(false);
    const [abreagregaritem, setAbreagregarItem] = useState(false);
    const [formdatos, setFormdatos] = useState(formdata);
    const [datosacargar, setDatosaCargar] = useState('');
    const [params, setParams] = useState();
    const [rows, setRows] = useState([]);

    async function leeotdatos(descripcion) {
        const result = await OTDatosLee(descripcion);
        setRows(procesarDatos(result));
    }

    useEffect(() => {
        if (state.PresupConfTipoDesc !== '') {
            leeotdatos(state.PresupConfTipoDesc);
            setFormdatos(formdata);
        }

    }, [state.PresupConfTipoDesc]); // eslint-disable-line react-hooks/exhaustive-deps


    const procesarDatos = (data) => {
        if (data !== '') {
            return data.flatMap((item) =>
                Object.entries(JSON.parse(item.OTDatosOpciones)).map(([clave, valor]) => ({
                    id: `${item.idOTDatos}-${clave}`, // ID único
                    descripcion: item.OTDatosDesc,
                    codconf: item.OTDatosConfCod,
                    opcion: clave,
                    valor: valor,
                    aparicion: item.OTDatosOrdenAparicion,
                    tipo: item.OTDatosTipoPed,
                    requerido: item.OTDatosRequerido
                }))

            );
        }
    };




    const columns = [
        { field: "id", headerName: "id", width: 200 },
        { field: "aparicion", headerName: "OTDatosOrdenAparicion", width: 200 },
        {
            field: "descripcion", headerName: "descripcion", width: 200,
            renderCell: (params) => {
                const rowIndex = params.api.getAllRowIds().indexOf(params.id);
                // Si no es la primera vez que aparece la categoría, la celda queda vacía
                if (rowIndex > 0 && rows[rowIndex - 1].descripcion === params.value) {
                    return null; // Celda vacía para las filas repetidas
                }
                return <strong>{params.value}</strong>;
            },
        },
        { field: "opcion", headerName: "opcion", width: 150, editable: true },
        { field: "valor", headerName: "valor", width: 100, editable: true },
        // {
        //     field: "tipo", headerName: "tipo", width: 100,
        //     renderCell: (paramtipo) => {
        //         const rowIndex = paramtipo.api.getAllRowIds().indexOf(paramtipo.id);
        //         // Si no es la primera vez que aparece la categoría, la celda queda vacía
        //         if (rowIndex > 0 && rows[rowIndex - 1].tipo === paramtipo.value) {
        //             return null; // Celda vacía para las filas repetidas
        //         }
        //         return <strong>{paramtipo.value}</strong>;
        //     },
        // },
        { field: "tipo", headerName: "tipo", width: 100, editable: true },
        { field: "requerido", headerName: "requerido", width: 100, editable: true },
        {
            field: "actions",
            headerName: "+ Opciones",
            width: 100,
            headerClassName: "encabcolumns",
            renderCell: (params) => (
                <Button
                    variant="text"
                    style={{ color: deepOrange[800] }}
                    placeholder="Ver Stock"
                    fontSize="large"
                    onClick={() => openApp(params)}
                    // (<OTDatosAgrOpc open={setAbreagregarItem(true)} params={params} handleClose={() => setAbreagregarItem(false)) /> }
                    // openApp(params)

                    startIcon={<FitbitIcon />}
                />
            ),
        }

    ];

    const openApp = (params) => {
        setParams(params.row)
        setAbreagregarItem(true)
    };
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
    const handleClickOpen = () => {
        setAbreagregar(true);
    };
    function CustomToolbar() {
        return (
            <GridToolbarContainer className={estilotabla.tablasgenerales}>
                <Box
                    sx={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'left',
                        padding: '8px 0px 8px 0px'
                    }}
                >
                    <Box
                        sx={{
                            width: "80%",
                            display: 'flex',
                            justifyContent: 'right',
                            alignItems: 'right',
                            padding: '8px'
                        }}
                    >

                        <GridToolbarColumnsButton className={estilotabla.coloropcioncol} />
                        <GridToolbarFilterButton className={estilotabla.coloropcioncol} />
                        <GridToolbarDensitySelector className={estilotabla.coloropcioncol} />
                        <GridToolbarExport className={estilotabla.coloropcioncol} />
                        <AddToPhotosTwoToneIcon
                            className={estilotabla.iconoagregar}
                            size="large"
                            titleAccess="Agregar"
                            onClick={() => handleAlta()}
                        />
                        <CheckCircleTwoToneIcon
                            variant="contained"
                            titleAccess="Confirma Modificación"
                            className={estilotabla.iconomodificar}
                            onClick={() => handleModifica(rown)}
                        />

                        <LocalPrintshopRoundedIcon
                            onClick={() => setImprimirTF(true)}
                            className={estilotabla.iconoimpresora}
                            titleAccess="Imprimir"
                        />
                        <DeleteSharpIcon
                            variant="contained"
                            titleAccess="Borrar"
                            className={estilotabla.iconoborrar}
                            onClick={() => handleDelete(rowsel)}
                        />
                    </Box>
                </Box>
            </GridToolbarContainer>
        );
    }

    return (
        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
            <FilaUnoIzq />
            {rows && rows.length > 0 &&
                <DataGrid
                    rows={rows}
                    columns={columns}
                    processRowUpdate={handleProcessRowUpdate}
                    pageSize={5}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                />
            }
            {/* <DialogoDatos
                open={open}
                columns={columns}
                handleClose={handleClose}
                nombrebtn={nombreboton}
                paramsbor={paramsbor}
                titulodial={titulodial}
            /> */}

            {/* <Button variant="contained" color="primary" onClick={handleClickOpen}></Button> */}
            {abreagregar && <OTDatosAgregarForm open={abreagregar} handleClose={handleClickOpen} />}
            {abreagregaritem && <OTDatosAgrOpc open={abreagregaritem} params={params} handleClose={() => setAbreagregarItem(false)} />}
        </div>
    )
}
