import React, { useRef } from 'react'
import { OTDatosLee } from "./OTDatosLee.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { use } from "react";
import PresupPant from "../../../context/PresupPant.jsx";
import FilaUnoIzq from "../../Presupuesto/LayoutPresupuesto/FilaUno/FilaUnoIzq.jsx";
import { Box, Button, TextField } from '@mui/material';
import formdata from "./formdata.js";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { set } from 'date-fns';
import OTDatosAgregarForm from './OTDatosAgregarForm.jsx';
// import { OTDatosAgregar } from './OTDatosAgregar.jsx';
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
import TablasContexto from '../../../context/TablasContext.jsx';
import OrdTrabajo from '../../../context/OrdTrabajo.jsx';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import { OTDatosModificar } from './OTDatosModificar.jsx';
import { DatosModificar } from '../../../components/DatosModificar.jsx';
export default function OTDatosForm() {
    const { formdatos, setFormdatos } = use(TablasContexto);
    const { otdatos, setOTdatos } = use(OrdTrabajo);
    const { state, setState } = use(PresupPant);
    const [abreagregar, setAbreagregar] = useState(false);
    const [abreagregaritem, setAbreagregarItem] = useState(false);
    const [datosacargar, setDatosaCargar] = useState('');
    const [params, setParams] = useState();
    const [rows, setRows] = useState([]);
    const [nombreboton, setNombreBoton] = useState("");
    const [titulodial, setTituloDial] = useState("");
    const [paramsbor, setParamsBor] = useState(0);
    const [open, setOpen] = useState(false);
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
    async function leeotdatos(descripcion) {
        setOTdatos(descripcion);

        const result = await OTDatosLee(descripcion);
        // if (result.length === 0)
        //     return
        if (result.length !== 0) {
            // confcod.current = result[0].OTDatosConfCod
            setRows(procesarDatos(result));
        }

    }
    useEffect(() => {

        if (state.PresupConfTipoDesc !== '') {
            leeotdatos(state.PresupConfTipoDesc);
            setFormdatos({
                ...formdatos,
                OTDatosTipoConf: state.PresupConfTipoDesc,
            });
        }

    }, [state.PresupConfTipoDesc]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setFormdatos(formdata);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const procesarDatos = (data) => {
        if (data !== '') {
            return data.flatMap((item) =>
                // Object.entries(JSON.parse(item.OTDatosOpciones)).map(([clave, valor]) => ({
                Object.entries((item.OTDatosOpciones)).map(([clave, valor]) => ({
                    id: `${item.idOTDatos}-${clave}`, // ID único
                    idOTDatos: item.idOTDatos,
                    OTDatosDesc: item.OTDatosDesc,
                    // OTDatosConfCod: item.OTDatosConfCod,
                    opcion: clave,
                    OTDatosOpciones: valor,
                    OTDatosOrdenAparicion: item.OTDatosOrdenAparicion,
                    OTDatosTipoPed: item.OTDatosTipoPed,
                    OTDatosRequerido: item.OTDatosRequerido,
                    OTDatosAncho: item.OTDatosAncho
                }))

            );
        }
    };

    const tipocampo = [
        { value: "select", label: "Select" },
        { value: "textfield", label: "Texto" },
    ];

    const columns = [
        // { field: "id", type: "text", headerName: "id", width: 200, editable: false },
        { field: "idOTDatos", type: "text", headerName: "id datos", width: 200, editable: false },
        { field: "OTDatosOrdenAparicion", type: "text", headerName: "Orden de Aparición", width: 200, editable: true },
        {
            field: "OTDatosDesc", type: "text", headerName: "descripcion", width: 200, editable: true,
            renderCell: (params) => {
                const rowIndex = params.api.getAllRowIds().indexOf(params.id);
                // Si no es la primera vez que aparece la categoría, la celda queda vacía
                if (rowIndex > 0 && rows[rowIndex - 1].OTDatosDesc === params.value) {
                    return null; // Celda vacía para las filas repetidas
                }
                return <strong>{params.value}</strong>;
            },
        },
        { field: "OTDatosTipoPed", type: "singleSelect", headerName: "tipo", width: 100, editable: true, valueOptions: tipocampo },
        { field: "opcion", type: "text", headerName: "Opción Campo Select", width: 150, editable: false },
        { field: "OTDatosOpciones", type: "text", headerName: "Valor por Defecto Campo Text", width: 100, editable: false },
        { field: "OTDatosRequerido", type: "singleSelect", headerName: "requerido", width: 100, editable: true, valueOptions: [{ value: "S", label: "S" }, { value: "N", label: "N" }] },
        { field: "OTDatosAncho", type: "text", headerName: "Ancho", width: 100, editable: true },
        {
            field: "actions",
            headerName: "+ Opciones",
            type: "text",
            width: 100,
            editable: false,
            headerClassName: "encabcolumns",
            renderCell: (params) => (
                <Button
                    variant="text"
                    style={{ color: deepOrange[800] }}
                    placeholder="Ver Stock"
                    fontSize="large"
                    onClick={() => openApp(params)}
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
    const handleAlta = () => {
        setNombreBoton("Enviar");
        setTituloDial(
            `Alta de ${formdatos.tablabase} (moverse por los campos con tab)`
        );
        setOpen(true);
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
        // if (formdatos.tablabase === "OTDatos") OTDatosModificar(params);
        DatosModificar(params, formdata.nombackmodificar);
        relee();
    };
    async function relee() {
        const data = await OTDatosLee();
        setRows(data);
    }

    const handleClose = () => {
        leeotdatos(state.PresupConfTipoDesc);

        setOpen(false);
    };

    const handleClickOpen = () => {
        setAbreagregar(true);
    };
    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={estiloBoton}>
                {/* <GridToolbarContainer className={estilotabla.tablasgenerales}>
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
                    > */}    <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />

                {/* <GridToolbarColumnsButton className={estilotabla.coloropcioncol} />
                        <GridToolbarFilterButton className={estilotabla.coloropcioncol} />
                        <GridToolbarDensitySelector className={estilotabla.coloropcioncol} />
                        <GridToolbarExport className={estilotabla.coloropcioncol} /> */}
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
                {/* </Box>
                </Box> */}
            </GridToolbarContainer>
        );
    }

    return (
        // <div style={{ marginTop: "20px", marginLeft: "20px" }}>
        <>
            <FilaUnoIzq />
            {/* {rows && rows.length > 0 && */}
            <DataGrid
                rows={rows}
                columns={columns}
                processRowUpdate={processRowUpdate}
                className={estilotabla.tablasgenerales}
                onRowClick={handleRowSelect}
                pageSize={5}
                slots={{
                    toolbar: CustomToolbar,
                }}
                columnHeaderHeight={35}
                pageSizeOptions={[25]}
            />
            {/* // } */}

            {abreagregar && <OTDatosAgregarForm open={abreagregar} handleClose={handleClickOpen} />}
            {abreagregaritem && <OTDatosAgrOpc open={abreagregaritem} params={params} handleClose={() => setAbreagregarItem(false)} />}

            <DialogoDatos
                open={open}
                columns={columns}
                handleClose={handleClose}
                nombrebtn={nombreboton}
                paramsbor={paramsbor}
                titulodial={titulodial}
            // PresupConfTipoDesc={state.PresupConfTipoDesc}
            // confcod={confcod.current}
            />

            {/* // </div> */}
        </>
    )
}

/*    const procesarDatos = (data) => {
    if (data !== '') {
        return data.flatMap((item) =>
            Object.entries(JSON.parse(item.OTDatosOpciones)).map(([clave, valor]) => ({
                id: `${item.idOTDatos}-${clave}`, // ID único
                idOTDatos: item.idOTDatos,
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
};*/
