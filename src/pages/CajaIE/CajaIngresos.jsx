import { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer, useGridApiRef } from "@mui/x-data-grid";
import { CajaIELeer } from "./CajaIELeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import { Box } from "@mui/material";
import { CajaIEAgregar } from "./CajaIEAgregar.jsx";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import BrowserUpdatedRoundedIcon from '@mui/icons-material/BrowserUpdatedRounded';
import Filter9PlusRoundedIcon from '@mui/icons-material/Filter9PlusRounded';
import GppBadRoundedIcon from '@mui/icons-material/GppBadRounded';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import CajaCierre from "./CajaCierre.jsx";
import estilotabla from "../../Styles/Tabla.module.css";
import MueMovCIE from "./CajaIEConsultas/MueMovCIE.jsx";
import CajaIEFecEst from "./CajaIEConsultas/CajaIEFecEst.jsx";
import CajaInterna from "./CajaInterna/CajaInterna.jsx";
import MuestraMensaje from "../../components/lib/MuestraMensaje.js";
export default function CajaIngresos() {
    const [rows, setRows] = useState([]);
    const [openCierre, setOpenCierre] = useState(false);
    const [columns, setColumns] = useState([]);
    const [dolar, setDolar] = useState(0);
    const apiRef = useGridApiRef(); // <- referencia para manejar foco
    const [totalInstrumentos, setTotalInstrumentos] = useState(0);
    const [LlamaMueMovCIE, setLlamaMueMovCIE] = useState(false);
    const [LlamaCajaIEFecEst, setLlamaCajaIEFecEst] = useState(false);
    const [LlamaCajaInterna, setLlamaCajaInterna] = useState(false);

    const AbreCajaIEFecEst = () => {
        setLlamaCajaIEFecEst(true);
    };

    const CierraCajaIEFecEst = () => {
        setLlamaCajaIEFecEst(false);
    };
    const AbreMueMovCIE = () => {
        setLlamaMueMovCIE(true);
    };

    const CierraMueMovCIE = () => {
        setLlamaMueMovCIE(false);
    };

    const AbreCajaInterna = () => {
        setLlamaCajaInterna(true);
    };

    const CierraCajaInterna = () => {
        setLlamaCajaInterna(false);
    };

    // async function handleAlta() {
    //     console.log('rows', rows)
    //     // CajaIECliente
    //     // CajaIEConcepto
    //     // CajaIEMT
    //     // CajaIEMoneda
    //     // CajaIEImporte
    //     await CajaIEAgregar({ rows })
    //     const data = await CajaIELeer();
    //     setRows(data);
    // };
    async function handleAlta() {
        // 1. Definimos los campos obligatorios
        // const camposRequeridos = [
        //     'CajaIECliente',
        //     'CajaIEConcepto',
        //     'CajaIEMT',
        //     'CajaIEMoneda',
        // ];
        let filasIncompletas = [];
        filasIncompletas = rows.filter(row => {
            // 1. Campos que SIEMPRE deben estar (strings no vacíos)
            const faltanBasicos =
                !row.CajaIECliente?.toString().trim() ||
                !row.CajaIEConcepto?.toString().trim() ||
                !row.CajaIEMT?.toString().trim() ||
                !row.CajaIEMoneda?.toString().trim();

            // 2. Regla especial de importes:
            // Es inválido si AMBOS están vacíos o son 0.
            // Si uno de los dos tiene valor > 0, esta condición será 'false' (está OK).
            const importePrincipal = parseFloat(row.CajaIEImporte) || 0;
            const importeIP = parseFloat(row.CajaIEImpIP) || 0;

            const noTieneNingunImporte = (importePrincipal === 0 && importeIP === 0);

            // Retorna true si falta lo básico O si no hay ningún importe cargado
            return faltanBasicos || noTieneNingunImporte;
        });
        // // 2. Buscamos si hay alguna fila que tenga campos vacíos
        // filasIncompletas = rows.filter(row => {
        //     return camposRequeridos.some(campo => !row[campo] || row[campo].toString().trim() === "");
        // });

        // 3. Si hay filas incompletas, avisamos al usuario y cortamos la ejecución
        if (filasIncompletas.length > 0) {
            MuestraMensaje(413);
            // alert("Por favor, completa todos los campos obligatorios en todas las filas antes de guardar.");
            // Aquí podrías usar un Snackbar de MUI para que se vea más profesional
            return;
        }

        try {
            // 4. Si pasó la validación, procedemos a guardar
            await CajaIEAgregar({ rows });
            const data = await CajaIELeer();
            setRows(data);
            //  MuestraMensaje(200);
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    }
    const handleCierre = () => {
        setOpenCierre(true);
    };
    // const abreBuscaIE = () => {
    //     setOpenBuscaIE(true);
    // };
    // const cierraBuscaIE = () => {
    //     setOpenBuscaIE(false);
    // };
    // async function vaBuscarIE() {
    //     const data = await BuscaIE(fechaDesde, fechaHasta);
    //     console.log(data);
    //     setRows(data);
    // }


    function CustomToolbar() {
        return (
            // <GridToolbarContainer sx={{ ...estiloBoton, display: "flex", alignItems: "center", gap: 5 }}>
            <GridToolbarContainer
                sx={{
                    color: '#141412f0',
                    backgroundColor: '#3206f528',
                    display: "flex",
                    alignItems: "center",
                    height: '40px',
                    gap: 5
                }}>

                {/* <label>F4 - Agregar   F2 - Agrega instrumento de pago</label> */}
                <AddToPhotosTwoToneIcon
                    label="Agregar"
                    titleAccess="Agregar"
                    sx={{
                        fontSize: '35px',
                        color: '#0f7905f6',
                        cursor: 'pointer',
                        '&:hover': { color: '#0a7e02' } // color al pasar el mouse
                    }}
                    onClick={() => agregarFilaVacia()}
                />
                <Filter9PlusRoundedIcon
                    label="Agrega instrumento de pago"
                    sx={{
                        fontSize: '35px',
                        color: '#039ef8e6',
                        cursor: 'pointer',
                        '&:hover': { color: '#039ef8e6' } // color al pasar el mouse
                    }}
                    titleAccess="Agrega instrumento de pago"
                    onClick={() => agregarFilaInstrumentoPago()}
                />
                <BrowserUpdatedRoundedIcon
                    titleAccess="Grabar"
                    sx={{
                        fontSize: '35px',
                        color: '#790566fb',
                        cursor: 'pointer',
                        '&:hover': { color: '#790566fb' } // color al pasar el mouse
                    }}
                    onClick={() => handleAlta()}
                />
                <GppBadRoundedIcon
                    titleAccess="Cierre"
                    sx={{
                        fontSize: '35px',
                        color: '#f50404fa',
                        cursor: 'pointer',
                        '&:hover': { color: '#f50404fa' } // color al pasar el mouse
                    }}
                    onClick={() => handleCierre()}
                />
                <label>Dólar: {dolar}</label>
                <HistoryEduIcon
                    titleAccess="Movimientos Históricos"
                    sx={{
                        fontSize: '35px',
                        color: '#bdc009f9',
                        cursor: 'pointer',
                        '&:hover': { color: '#bdc009f9' } // color al pasar el mouse
                    }}
                    onClick={() => AbreMueMovCIE()}
                />
                <HistoryEduIcon
                    titleAccess="Estadísticas"
                    sx={{
                        fontSize: '35px',
                        color: '#4c05f1f9',
                        cursor: 'pointer',
                        '&:hover': { color: '#bdc009f9' } // color al pasar el mouse
                    }}
                    onClick={() => AbreCajaIEFecEst()}
                />
                {/* separador flexible */}
                <Box sx={{ flexGrow: 1 }} />

                {/* icono alineado a la derecha */}
                <MoreVertTwoToneIcon
                    fontSize='medium'
                    titleAccess="Caja Interna"
                    sx={{
                        fontSize: '35px',
                        color: '#0a0000',
                        cursor: 'pointer',
                        '&:hover': { color: '#0a0000' }
                    }}
                    onClick={() => AbreCajaInterna()}
                />
            </GridToolbarContainer>
        );
    }

    useEffect(() => {
        fetch('https://dolarapi.com/v1/dolares/oficial')
            .then(res => res.json())
            .then(data => {
                setDolar((data.venta + data.compra) / 2);
            });
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const cols = await llenarcolumns();
            setColumns(cols);
            const data = await CajaIELeer();
            setRows(data);
        };
        fetch();

    }, []);

    const agregarFilaVacia = () => {
        setRows((prevRows) => {
            const usados = new Set(prevRows.map((r) => r.id));
            // let nuevoId = usados;
            let nuevoId = prevRows.length > 0 ? Math.max(...usados) + 1 : 1;
            while (usados.has(nuevoId)) nuevoId++;

            const nuevaFila = {
                id: nuevoId,
                CajaIEFecha: new Date().toISOString().split("T")[0],
                CajaIECliente: "",
                CajaIEConcepto: "",
                CajaIEMT: "",
                CajaIEMoneda: "",
                CajaIEImporte: "",
                CajaIECodIP: "",
                CajaIEImpIP: "",
                CajaIEGrabado: "N",
                parentId: nuevoId,
            };

            // Retornamos las filas con la nueva
            const nuevasFilas = [...prevRows, nuevaFila];

            // Después de agregar, damos tiempo al render para enfocar
            setTimeout(() => {
                apiRef.current.setCellFocus(nuevoId, "CajaIECliente");
                apiRef.current.startCellEditMode({
                    id: nuevoId,
                    field: "CajaIECliente",
                });
            }, 100); // Esperar un poco para que se renderice

            return nuevasFilas;
        });
    };



    const agregarFilaInstrumentoPago = () => {
        setRows((prevRows) => {
            if (prevRows.length === 0) return prevRows; // no hay base

            let ultimaPrincipal = null;
            let sumaImpIP = 0;

            // Recorremos de atrás hacia adelante
            for (let i = prevRows.length - 1; i >= 0; i--) {
                const fila = prevRows[i];

                sumaImpIP += Number(fila.CajaIEImpIP || 0);

                if (Number(fila.CajaIEImporte || 0) !== 0) {
                    ultimaPrincipal = fila;
                    break;
                }
            }

            if (!ultimaPrincipal) {
                ultimaPrincipal = prevRows[prevRows.length - 1];
            }

            // Calculamos diferencia para la fila principal
            const diferencia = Number(ultimaPrincipal.CajaIEImporte || 0) - sumaImpIP;

            // Actualizamos la fila principal con la diferencia
            const filasActualizadas = prevRows.map(f =>
                f.id === ultimaPrincipal.id
                    ? { ...f, CajaIEDiferencia: diferencia }
                    : f
            );

            // Generamos nuevo ID para la fila instrumento
            const usados = new Set(filasActualizadas.map(r => r.id));
            let nuevoId = 1;
            while (usados.has(nuevoId)) nuevoId++;

            // Creamos la nueva fila instrumento (subfila)
            const nuevaFila = {
                id: nuevoId,
                CajaIEFecha: ultimaPrincipal.CajaIEFecha,
                CajaIECliente: ultimaPrincipal.CajaIECliente,
                CajaIEConcepto: ultimaPrincipal.CajaIEConcepto,
                CajaIEMT: "T",
                CajaIEMoneda: ultimaPrincipal.CajaIEMoneda,
                CajaIEImporte: "",
                CajaIECodIP: "",
                CajaIEImpIP: "",
                CajaIEDiferencia: 0,
                CajaIEGrabado: "N",
                // Si querés, podés agregar un parentId para relacionar filas:
                parentId: ultimaPrincipal.id,
                esSubfila: true,
            };

            // Retornamos el array con la fila actualizada y la nueva agregada
            const nuevasFilas = [...filasActualizadas, nuevaFila];

            setTimeout(() => {
                apiRef.current.setCellFocus(nuevoId, "CajaIECodIP");
                apiRef.current.startCellEditMode({
                    id: nuevoId,
                    field: "CajaIECodIP"
                });
            }, 100);

            return nuevasFilas;
        });
    };



    const camposObjetivo = ["CajaIECodIP", "CajaIEImpIP"];
    const processRowUpdate = (newRow) => {
        const updatedRows = rows.map((r) => (r.id === newRow.id ? newRow : r));
        // Si es subfila y se editó el importe
        if (newRow.esSubfila) {
            const parentId = newRow.parentId;

            const sumaImpIP = updatedRows
                .filter((r) => r.parentId === parentId)
                .reduce((acc, cur) => acc + Number(cur.CajaIEImpIP || 0), 0);

            const filasFinales = updatedRows.map((r) =>
                r.id === parentId
                    ? { ...r, CajaIEDiferencia: Number(r.CajaIEImporte || 0) - sumaImpIP }
                    : r
            );

            setRows(filasFinales);
        } else {
            // Para fila principal normal, solo actualizamos
            if (newRow.CajaIECodIP !== "") {
                newRow.CajaIEDiferencia = Number(newRow.CajaIEImporte || 0) - Number(newRow.CajaIEImpIP || 0);
            }
            setRows(updatedRows);
        }

        // Activar o desactivar edición según Punto S/N
        if (newRow.CajaIEMT === "S") {
            setColumns((prev) =>
                prev.map((col) =>
                    camposObjetivo.includes(col.field)
                        ? { ...col, editable: false }
                        : col
                )
            );
        } else {
            setColumns((prev) =>
                prev.map((col) =>
                    camposObjetivo.includes(col.field)
                        ? { ...col, editable: true }
                        : col
                )
            );
        }

        return newRow;
    };


    useEffect(() => {
        rows.CajaIECodIP !== '' && rows.CajaIEImpIP !== ''
        {
            let totalimpinst = totalInstrumentos + parseFloat(rows.CajaIEImpIP || 0);
            setTotalInstrumentos(totalimpinst)
        }
    }, [rows]);

    return (
        <Box sx={{ height: 500, width: "100%", minWidth: 600 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                apiRef={apiRef}
                getRowId={(row) => row.id}
                hideFooter
                localeText={{
                    noRowsLabel: "Presione F4 para agregar una fila"
                }}
                className={estilotabla.tablasgenerales}
                slots={{
                    toolbar: CustomToolbar,
                }}
                checkboxSelection={false}
                editMode="cell"
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => {
                    console.error("Error actualizando fila:", error);
                }}
                experimentalFeatures={{ newEditingApi: true }}

                sx={{
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#1976d2a4', // azul fuerte
                        color: '#fff',              // texto blanco
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: '#2fd3a25c', // rojo fuerte
                        color: '#0a0000',
                    },
                    '& .MuiDataGrid-row.Mui-selected:hover': {
                        backgroundColor: '#2fd3a25c', // rojo más oscuro al hover si está seleccionada
                    },

                }}

            />


            {openCierre && <CajaCierre rows={rows} onClose={() => setOpenCierre(false)} />}
            {LlamaMueMovCIE && <MueMovCIE open={LlamaMueMovCIE} handleClose={CierraMueMovCIE} />}
            {LlamaCajaInterna && <CajaInterna open={LlamaCajaInterna} handleClose={CierraCajaInterna} />}
            {LlamaCajaIEFecEst && <CajaIEFecEst open={LlamaCajaIEFecEst} handleClose={CierraCajaIEFecEst} />}

        </Box>
    );
}


