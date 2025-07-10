import React, { useEffect, useRef, useState } from "react";
import { DataGrid, GridToolbarContainer, useGridApiRef } from "@mui/x-data-grid";
import { CajaIELeer } from "./CajaIELeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import { Box } from "@mui/material";
import { CajaIEAgregar } from "./CajaIEAgregar.jsx";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
export default function CajaIngresos() {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const apiRef = useGridApiRef(); // <- referencia para manejar foco
    const [totalInstrumentos, setTotalInstrumentos] = useState(0);
    const estiloBoton = {
        backgroundColor: '#fc00fc68',
        '& .MuiButton-root': {
            color: 'rgb(10, 0, 0)',
            transition: 'all 0.2s ease-in-out', // hace que el agrandamiento sea suave
            fontSize: '0.9rem', // tamaño base
            '&:hover': {
                fontStyle: 'italic',
                fontSize: '1.05rem', // más grande al pasar el mouse
                backgroundColor: '#fc00fc68',
            },
        }
    }

    const handleAlta = () => {
        CajaIEAgregar({
            rows
        })
    };
    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={estiloBoton}

            // className={estilotabla.tablasgenerales}
            >
                <AddToPhotosTwoToneIcon
                    // className={estilotabla.iconoagregar}
                    size="large"
                    titleAccess="Agregar"
                    onClick={() => handleAlta()}
                />
                {/* <Box sx={{ mt: 2, ml: 1 }}>
                    <div><strong>Total instrumentos:</strong> ${totalInstrumentos.toFixed(2)}</div>
                </Box> */}

            </GridToolbarContainer>
        );
    }
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
            let nuevoId = 1;
            while (usados.has(nuevoId)) nuevoId++;

            const nuevaFila = {
                id: nuevoId,
                CajaIEFecha: new Date().toISOString().split("T")[0],
                CajaIECliente: "",
                CajaIEConcepto: "",
                CajaIEPunto: "",
                CajaIEImporte: "",
                CajaIECodIP: "",
                CajaIEImpIP: "",
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


    // const handleCellEditCommit = (params) => {
    //     const { id, field, value } = params;
    //     console.log('params', params);

    // }

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
                CajaIEPunto: "N",
                CajaIEImporte: "",
                CajaIECodIP: "",
                CajaIEImpIP: "",
                CajaIEDiferencia: 0,
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


    // Agregar fila con F4
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "F4") {
                e.preventDefault();
                agregarFilaVacia();
            }
            if (e.key === "F2") {
                e.preventDefault();
                agregarFilaInstrumentoPago();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

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
        if (newRow.CajaIEPunto === "S") {
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
                // disableRowSelectionOnClick
                hideFooter
                localeText={{
                    noRowsLabel: "Presione F4 para agregar una fila"
                }}
                slots={{
                    toolbar: CustomToolbar,
                }}
                // onCellEditCommit={handleCellEditCommit}
                checkboxSelection={false}
                editMode="cell"
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => {
                    console.error("Error actualizando fila:", error);
                }}
                experimentalFeatures={{ newEditingApi: true }}
                // isCellEditable={(params) => {
                //     if (["CajaIECodIP", "CajaIEImpIP"].includes(params.field)) {
                //         return params.row.CajaIEPunto !== "S";
                //     }
                //     return true;
                // }}
                sx={{
                    "& .MuiDataGrid-cell:focus": {
                        outline: "none"
                    }
                }}
            />


        </Box>

    );
}


{/* <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />

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
                /> */}


