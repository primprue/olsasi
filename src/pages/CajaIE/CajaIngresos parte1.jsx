import React, { useEffect, useRef, useState } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { CajaIELeer } from "./CajaIELeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import { Box } from "@mui/material";

export default function CajaIngresos() {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const apiRef = useGridApiRef(); // <- referencia para manejar foco

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
                CajaIEMT: "",
                CajaIEImporte: "",
                CajaIECodIP: "",
                CajaIEImpIP: ""
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

            const ultima = prevRows[prevRows.length - 1];
            const usados = new Set(prevRows.map(r => r.id));
            let nuevoId = 1;
            while (usados.has(nuevoId)) nuevoId++;

            const nuevaFila = {
                id: nuevoId,
                CajaIEFecha: ultima.CajaIEFecha,
                CajaIECliente: ultima.CajaIECliente,
                CajaIEConcepto: ultima.CajaIEConcepto,
                CajaIEMT: "N",
                CajaIEImporte: "",
                CajaIECodIP: "",
                CajaIEImpIP: ""
            };

            const nuevasFilas = [...prevRows, nuevaFila];

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
        console.log('newRow', newRow);
        setRows((prev) =>
            prev.map((r) => (r.id === newRow.id ? newRow : r))
        );

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
    const [totalInstrumentos, setTotalInstrumentos] = useState(0);
    const [diferencia, setDiferencia] = useState(0);

    useEffect(() => {
        const instrumentos = rows.filter(r => r.CajaIEMT === 'N');
        const principal = [...rows].reverse().find(r => r.CajaIEMT !== 'N'); // última fila con importe

        const total = instrumentos.reduce((acc, r) => acc + parseFloat(r.CajaIEImpIP || 0), 0);
        const importePrincipal = parseFloat(principal?.CajaIEImporte || 0);

        setTotalInstrumentos(total);
        setDiferencia(importePrincipal - total);
    }, [rows]);

    return (
        <Box sx={{ height: 500, width: "100%", minWidth: 600 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                apiRef={apiRef}
                getRowId={(row) => row.id}
                disableRowSelectionOnClick
                hideFooter
                localeText={{
                    noRowsLabel: "Presione F4 para agregar una fila"
                }}
                checkboxSelection={false}
                processRowUpdate={processRowUpdate}
                experimentalFeatures={{ newEditingApi: true }}
                // isCellEditable={(params) => {
                //     if (["CajaIECodIP", "CajaIEImpIP"].includes(params.field)) {
                //         return params.row.CajaIEMT !== "S";
                //     }
                //     return true;
                // }}
                sx={{
                    "& .MuiDataGrid-cell:focus": {
                        outline: "none"
                    }
                }}
            />
            <Box sx={{ mt: 1, mb: 2 }}>
                <strong>Total IP:</strong> ${totalInstrumentos.toFixed(2)}<br />
                <strong>Diferencia:</strong> ${diferencia.toFixed(2)}
            </Box>

        </Box>

    );
}
