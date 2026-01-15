
import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

export default function BilletesPorMoneda({ billetes, moneda, totalEsperado }) {
    const [cantidades, setCantidades] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [billeteIndex, setBilleteIndex] = useState(0);
    const [tempCantidad, setTempCantidad] = useState("");

    // Filtrar billetes de la moneda y ordenarlos
    const billetesFiltrados = useMemo(() => {
        return billetes
            .filter((b) => b.BilletesMoneda === moneda)
            .sort((a, b) => Number(b.label) - Number(a.label)); // ascendente
    }, [billetes, moneda]);
    // Abrir diálogo al inicio si hay billetes
    useEffect(() => {
        if (billetesFiltrados.length > 0) {
            setBilleteIndex(0);
            setDialogOpen(true);
            setTempCantidad("");
        }
    }, [billetesFiltrados]);

    console.log('cantidades  ', cantidades)
    const handleDialogAccept = () => {
        const valor = Number(tempCantidad) || 0;
        const billeteActual = billetesFiltrados[billeteIndex];

        setCantidades((prev) => ({
            ...prev,
            [billeteActual.label]: valor
        }));

        if (billeteIndex < billetesFiltrados.length - 1) {
            // Pasar al siguiente billete
            setBilleteIndex((prev) => prev + 1);
            setTempCantidad("");
        } else {
            // Último billete → cerrar
            setDialogOpen(false);
        }
    };

    // Calcular total ingresado
    const totalCalculado = useMemo(() => {
        return billetesFiltrados.reduce((acc, b) => {
            const cantidad = Number(cantidades[b.label] || 0);
            return acc + cantidad * Number(b.label);
        }, 0);
    }, [billetesFiltrados, cantidades]);

    return (
        <Box>
            <Typography variant="h6">Cantidad de billetes en {moneda}</Typography>

            {billetesFiltrados.map((b) => (
                <Box key={b.value} display="flex" alignItems="center" mb={1}>
                    <TextField
                        type="number"
                        label={`Billete ${b.label}`}
                        value={cantidades[b.label] || ""}
                        onChange={(e) =>
                            setCantidades((prev) => ({
                                ...prev,
                                [b.label]: Number(e.target.value) || 0
                            }))
                        }
                        sx={{ width: 150, mr: 2 }}
                    />
                    <Typography>
                        ={" "}
                        {(Number(cantidades[b.label] || 0) * Number(b.label))}
                    </Typography>
                </Box>
            ))}

            <Typography variant="h6" mt={2}>
                Total contado add:{" "}
                {totalCalculado}
            </Typography>

            <Typography color={totalCalculado === totalEsperado ? "green" : "red"}>
                Diferencia:{" "}
                {(totalCalculado - totalEsperado)}
            </Typography>

            {/* Dialog que pregunta billete por billete */}
            {/* <Dialog open={dialogOpen}>
                <DialogTitle>
                    Ingrese cantidad de billetes de {billetesFiltrados[billeteIndex]?.label}{" "}
                    {moneda}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        type="number"
                        autoFocus
                        value={tempCantidad}
                        onChange={(e) => setTempCantidad(e.target.value)}
                        sx={{ mt: 1, width: "100%" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogAccept} variant="contained">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Box>
    );
}
