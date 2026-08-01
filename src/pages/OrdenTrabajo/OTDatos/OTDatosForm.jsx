import React, { useRef } from 'react'
import { OTDatosLee } from "./OTDatosLee.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { use } from "react";
import PresupPant from "../../../context/PresupPant.jsx";
import FilaUnoIzq from "../../Presupuesto/LayoutPresupuesto/FilaUno/FilaUnoIzq.jsx";
import { Alert, Box, Button, TextField } from '@mui/material';
import formdata from "./formdata.js";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import OTDatosAgregarForm from './OTDatosAgregarForm.jsx';
// import { OTDatosAgregar } from './OTDatosAgregar.jsx';
import FitbitIcon from "@mui/icons-material/Fitbit";
import { deepOrange, red, blue, green, purple } from "@mui/material/colors";
import OTDatosAgrOpc from './OTDatosAgrOpc.jsx';
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import { RecargaIcon, BorrarIcono, AgregarIcon, ImpresionEsp, ActividadEsp, BorraItem } from "../../../components/comppropios/CustomIcons.jsx";
import ExpandIcon from '@mui/icons-material/Expand';
import estilotabla from "../../../Styles/Tabla.module.css";
import { DialogoDatos } from '../../../components/DialogoDatos.jsx';
import TablasContexto from '../../../context/TablasContext.jsx';
import OrdTrabajo from '../../../context/OrdTrabajo.jsx';
// import { OTDatosModificar } from './OTDatosModificar.jsx';
import { DatosModificar } from '../../../components/DatosModificar.jsx';


// import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import OTDatosReorden from './OTDatosReorden.jsx';
export default function OTDatosForm() {
    const { formdatos, setFormdatos } = use(TablasContexto);
    const { datoborrado, setDatoborrado } = use(TablasContexto);
    const { otdatos, setOTdatos } = use(OrdTrabajo);
    const { state, setState } = use(PresupPant);
    const [abreagregar, setAbreagregar] = useState(false);
    const [abreagregaritem, setAbreagregarItem] = useState(false);
    const [datosacargar, setDatosaCargar] = useState('');
    const [params, setParams] = useState();
    const [accion, setAccion] = useState();
    const [rows, setRows] = useState([]);
    const [nombreboton, setNombreBoton] = useState("");
    const [titulodial, setTituloDial] = useState("");
    const [paramsbor, setParamsBor] = useState(0);
    const [open, setOpen] = useState(false);
    const [reordenar, setReordenar] = useState(false);
    const [datosreorden, setDatosReorden] = useState([]);
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
        const result = await OTDatosLee(descripcion, formdata.nombackleer);
        setRows(procesarDatos(result));
        setDatosReorden(result);
    }
    useEffect(() => {
        if (state.PresupConfTipoDesc !== '') {
            leeotdatos(state.PresupConfTipoDesc);
            setFormdatos({
                ...formdatos,
                // OTDatosTipoConf: state.PresupConfTipoDesc,
                datocampo: state.PresupConfTipoDesc, //esto se carga en formdata para que lo use en DialogoDatos
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
                    OTDatosTipoConf: item.OTDatosTipoConf,
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
        { value: "select", label: "Seleccionar" },
        { value: "textfield", label: "Cargar Texto" },
    ];

    const columns = [
        // { field: "id", type: "text", headerName: "id", width: 200, editable: false },
        // { field: "idOTDatos", type: "text", headerName: "id datos", width: 200, editable: false, disabled: true, required: false },
        { field: "OTDatosTipoConf", type: "text", headerName: "Tipo de Confección", width: 200, editable: false, disabled: true, visible: false, required: false },
        // value: state.PresupConfTipoDesc,
        // { field: "OTDatosOrdenAparicion", type: "text", headerName: "Orden de Aparición", width: 200, editable: false, disabled: true, required: false },
        {
            field: "OTDatosDesc", type: "text", headerName: "descripcion", width: 200, editable: true, disabled: false, required: true,
            renderCell: (params) => {
                const rowIndex = params.api.getAllRowIds().indexOf(params.id);
                // Si no es la primera vez que aparece la categoría, la celda queda vacía
                if (rowIndex > 0 && rows[rowIndex - 1].OTDatosDesc === params.value) {
                    return null; // Celda vacía para las filas repetidas
                }
                return <strong>{params.value}</strong>;
            },
        },
        { field: "OTDatosTipoPed", type: "singleSelect", headerName: "Tipo de Ped", width: 150, editable: true, valueOptions: tipocampo },
        // { field: "opcion", type: "text", headerName: "Opción Campo Select", width: 250, editable: false, required: false },
        { field: "OTDatosRequerido", type: "singleSelect", headerName: "requerido", width: 100, editable: true, valueOptions: [{ value: "S", label: "S" }, { value: "N", label: "N" }] },
        { field: "OTDatosAncho", type: "text", headerName: "Ancho", width: 100, editable: true, required: true },
        {
            field: "actions",
            headerName: "+ Opciones",
            type: "text",
            width: 100,
            editable: false,
            required: false,
            disableColumnMenu: true,
            headerClassName: "encabcolumns",
            renderCell: (params) => (
                <Button
                    variant="text"
                    style={{ color: deepOrange[800] }}
                    placeholder="Agregar Opción"
                    fontSize="large"
                    onClick={() => openApp(params, 'agrega')}
                    startIcon={<FitbitIcon />}
                />
            ),
        },
        {
            field: "actions1",
            headerName: "Borrar Opción",
            type: "text",
            width: 100,
            editable: false,
            required: false,
            disableColumnMenu: true,
            headerClassName: "encabcolumns",
            renderCell: (params) => {
                // 1. Obtenemos el valor de la columna que queremos evaluar
                // (Reemplaza 'estado' por el nombre real de tu campo/columna en la base de datos)
                const valorDeOtraColumna = params.row.opcion;

                // 2. Definimos la condición para deshabilitar
                // Por ejemplo, deshabilitar si el estado es 'Bloqueado' o si una propiedad 'activo' es false
                const botonDeshabilitado = valorDeOtraColumna === "";

                return (
                    <Button
                        variant="text"
                        placeholder="Borra"
                        fontSize="large"
                        onClick={() => openApp(params, 'borra')}
                        startIcon={<BorraItem />}
                        // 3. Pasamos la condición al atributo disabled
                        disabled={botonDeshabilitado}
                    />
                );
            },
        }

    ];
    const openApp = (params, accion) => {
        setParams(params.row)
        setAccion(accion)
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

    const handleDelete = () => {
        setDatoborrado(0);
        setNombreBoton("Borrar");
        setTituloDial("BORRA ESTE DATO!!!!!");
        rowsel.id = rowsel.idOTDatos
        setParamsBor(rowsel);
        setOpen(true);
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
        const paramsModificados = {
            ...params,
            idOriginal: params.id, // Guardamos el "40-" en una nueva propiedad
            id: params.idOTDatos   // Pisamos el id viejo con el valor de idOTDatos (40)
        };
        DatosModificar(paramsModificados, formdata.nombackmodificar);
        leeotdatos(state.PresupConfTipoDesc);
    };

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
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />

                <AgregarIcon
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
                <BorrarIcono
                    variant="contained"
                    titleAccess="Borrar"
                    className={estilotabla.iconoborrar}
                    onClick={() => handleDelete(rowsel)}
                />
                <ExpandIcon
                    variant="contained"
                    titleAccess="Reordenar"
                    className={estilotabla.iconoreordenar}
                    onClick={() => abrereordenar(rows)}
                />
                <RecargaIcon
                    variant="contained"
                    titleAccess="Recargar"
                    sx={{ color: '#0954ec' }}
                    className={estilotabla.iconorecarga}
                    onClick={() => leeotdatos(state.PresupConfTipoDesc)}
                />
                {/* <LocalPrintshopRoundedIcon
                    variant="contained"
                    titleAccess="reorden tabla"
                    className={estilotabla.iconoimpresora}
                    onClick={() => TablaOrdenable()}
                /> */}
            </GridToolbarContainer>
        );
    }

    const abrereordenar = (rows) => {
        setReordenar(true);
        // setDatosreorden(rows);
    };

    const cierrareordenar = () => {
        setReordenar(false);
    };
    return (
        <div style={{ height: 700, width: 1500 }}>
            <FilaUnoIzq />

            <DataGrid
                rows={rows}
                columns={columns}
                processRowUpdate={processRowUpdate}
                className={estilotabla.tablasotdatos}
                disableRowSelectionOnClick
                onRowClick={handleRowSelect}
                pageSize={5}
                slots={{
                    toolbar: CustomToolbar,
                }}
                columnHeaderHeight={35}
                pageSizeOptions={[15]}
            />


            {abreagregar && <OTDatosAgregarForm open={abreagregar} handleClose={handleClickOpen} />}
            {abreagregaritem && <OTDatosAgrOpc open={abreagregaritem} params={params} accion={accion} handleClose={() => setAbreagregarItem(false)} />}
            <DialogoDatos
                open={open}
                columns={columns}
                handleClose={handleClose}
                nombrebtn={nombreboton}
                paramsbor={paramsbor}
                titulodial={titulodial}

            />
            {reordenar && datosreorden && datosreorden.length > 0 && (
                <OTDatosReorden
                    open={abrereordenar}
                    handleClose={cierrareordenar}
                    datosreorden={datosreorden}
                />
            )}

        </div>

    )
}

