import { useMemo, useState } from "react";
import { CajaIEEstadistica } from "./CajaIEEstadistica.jsx";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { Row } from "antd";
import { format } from "date-fns";
import TextFieldComun from "../../../components/comppropios/TextFieldComun.jsx";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import MuestraMensaje from "../../../components/lib/MuestraMensaje.js";


export default function CajaIEFecEst({ open, handleClose }) {
    const FechaHoy = format(new Date(), "yyyy-MM-dd");
    const [FechaDesde, setFechaDesde] = useState(FechaHoy);
    const [FechaHasta, setFechaHasta] = useState(FechaHoy);

    // Solo necesitamos un estado para la materia prima (los datos de la API)
    const [rawRows, setRawRows] = useState([]);

    const handleChange = (value, id) => {
        if (id === "FechaDesde") setFechaDesde(value);
        if (id === "FechaHasta") setFechaHasta(value);
    };

    // Función simple para traer datos
    async function dataFetch() {
        try {
            const data = await CajaIEEstadistica({ FechaDesde, FechaHasta });
            if (!data || data.length === 0 || !data[0].TotalesPorFecha) {
                MuestraMensaje(404, 'No se encontraron datos');
                setRawRows([]);
                return;
            }
            setRawRows(data);
        } catch (error) {
            MuestraMensaje(500, 'Error al obtener datos');
        }
    }

    // --- EL CEREBRO DEL COMPONENTE: useMemo ---
    // Esto se recalcula automáticamente cada vez que 'rawRows' cambia.
    const { tableRows, tableColumns } = useMemo(() => {
        if (rawRows.length === 0) return { tableRows: [], tableColumns: [] };

        const data = rawRows[0].TotalesPorFecha;

        // 1. Obtener conceptos únicos
        const todosLosConceptos = [...new Set(
            Object.values(data).flatMap(fecha =>
                Object.values(fecha).flatMap(moneda =>
                    (moneda.conceptos || []).map(c => c.detconepto)
                )
            )
        )];

        // 2. Construir Filas
        const filas = Object.entries(data).map(([fecha, contenido]) => {
            const fila = { id: fecha, Fecha: fecha }; // El ID es obligatorio para DataGrid

            todosLosConceptos.forEach(concepto => {
                let item = null;
                Object.values(contenido).forEach(moneda => {
                    const encontrado = moneda.conceptos?.find(c => c.detconepto === concepto);
                    if (encontrado) item = encontrado;
                });

                // Llenamos las sub-columnas por cada concepto
                fila[`${concepto}_T`] = Number(item?.totalT ?? 0).toFixed(2);
                fila[`${concepto}_Instr`] = Number(item?.totalInstr ?? 0).toFixed(2);
                fila[`${concepto}_Efvo`] = Number(item?.totalTEfvo ?? 0).toFixed(2);
                fila[`${concepto}_M`] = Number(item?.totalM ?? 0).toFixed(2);
                // fila[`${concepto}_Instr`] = item?.totalInstr ?? 0;
                // fila[`${concepto}_Efvo`] = item?.totalTEfvo ?? 0;
                // fila[`${concepto}_M`] = item?.totalM ?? 0;
            });
            return fila;
        });

        // 3. Construir Columnas dinámicamente
        const columnas = [
            { field: 'Fecha', headerName: 'Fecha', width: 120, pinned: 'left' }
        ];

        todosLosConceptos.forEach(concepto => {
            // Agrupamos visualmente o simplemente añadimos las columnas
            const subCampos = [
                { key: 'T', label: 'Total' },
                { key: 'Instr', label: 'Instr.' },
                { key: 'Efvo', label: 'Efvo.' },
                { key: 'M', label: 'M' }
            ];

            subCampos.forEach(sub => {
                columnas.push({
                    field: `${concepto}_${sub.key}`,
                    headerName: `${concepto} (${sub.label})`,
                    width: 130,
                    type: 'number',
                });
            });
        });

        return { tableRows: filas, tableColumns: columnas };
    }, [rawRows]); // <--- Solo corre si rawRows cambia

    function CustomToolbar() {
        return (
            <GridToolbarContainer >
                <GridToolbarExport />

            </GridToolbarContainer>
        );
    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth={false} fullWidth>
            <DialogContent>
                <Row style={{ marginBottom: 20, gap: 10 }}>
                    <TextFieldComun id="FechaDesde" type="date" label="Desde" value={FechaDesde} onChange={handleChange} width="150px" />
                    <TextFieldComun id="FechaHasta" type="date" label="Hasta" value={FechaHasta} onChange={handleChange} width="150px" />
                    <Button variant="contained" onClick={dataFetch}>OK</Button>
                    <Button onClick={handleClose}>Cerrar</Button>
                </Row>

                {tableRows.length > 0 && (
                    <Box sx={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={tableRows}
                            columns={tableColumns}
                            pageSizeOptions={[10, 25, 50]}
                            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                            disableRowSelectionOnClick
                            density="compact"
                            slots={{
                                toolbar: CustomToolbar

                            }}
                        />
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    );
}