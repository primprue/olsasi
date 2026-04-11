import { Box, Dialog, DialogTitle, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArchiveIcon from "@mui/icons-material/Archive";
import { CajaSaldoEfAgregar } from './CajaSaldoEfAgregar';
import { green } from "@mui/material/colors";
import Grid from "@mui/material/Grid";

export default function BilletesQuedan(props) {
    const { open, handleClose, monedas, billetes, totales, cantidades } = props;
    const [cantidadesBilquedan, setCantidadesBilquedan] = useState({});
    const [totalqueda, setTotalqueda] = useState({});
    const [bilquedan, setBilquedan] = useState(false);
    const importesaguardar = useRef();
    const [open1, setOpen1] = useState(false);
    const handleClose1 = () => {
        setOpen1(false);
    };

    async function GrabCierraLimpia() {
        let datoagrabar = [];

        // 1. Recolectamos todos los datos primero
        Object.keys(totales).forEach((monedaId) => {
            // Limpieza de strings a números
            const limpio = totalqueda[monedaId]?.replace(/[^0-9,.-]/g, "") || "0";
            const conPunto = limpio.replace(/\./g, "").replace(",", ".");
            const saldoqueda = parseFloat(conPunto) || 0;

            let retiroTarde = totales[monedaId]?.totalT > 0
                ? totales[monedaId]?.totalTSinInstr
                : 0;

            let retiroManiana = totales[monedaId]?.totalM > 0
                ? totales[monedaId]?.totalMEsp - saldoqueda - retiroTarde
                : 0;

            let totalInstrumentos = totales[monedaId]?.totalInstr || 0;

            datoagrabar.push({
                monedaId,
                retiroManiana,
                retiroTarde,
                saldoqueda,
                totalInstrumentos
            });
        });

        // 2. UNA SOLA LLAMADA al backend con el array completo
        if (datoagrabar.length > 0) {
            try {
                // Asumo que esta función hace el fetch al backend que vimos antes
                const resultado = await CajaSaldoEfAgregar(datoagrabar);

                importesaguardar.current = datoagrabar;
                setOpen1(true);
            } catch (error) {
                console.error("Error al grabar:", error);
                alert("Error al guardar los datos");
            }
        }
    }
    const handleChangeBilquedan = (moneda, label, e) => {
        const valor = e.target.value;
        setCantidadesBilquedan(prev => ({
            ...prev,
            [moneda]: {
                ...prev[moneda],
                [label]: valor
            }
        }));
    };

    // 🔹 Calcula totales cuando cambian cantidades o monedas
    useEffect(() => {
        const nuevosTotales = {};
        monedas.forEach((moneda) => {
            const totalNum = Object.entries(cantidadesBilquedan[moneda.id] || {})
                .reduce((acum, [denominacion, cant]) =>
                    acum + parseInt(denominacion, 10) * (Number(cant) || 0), 0
                );
            nuevosTotales[moneda.id] = totalNum.toLocaleString("es-AR", {
                style: "currency",
                currency: moneda.id,
            });
        });
        setTotalqueda(nuevosTotales);
    }, [cantidadesBilquedan, monedas]);

    // 🔹 Calcular total general si lo necesitás
    const totalCalculado = useMemo(() => {
        return billetes.reduce((acc, b) => {
            const cantidad = Number(cantidadesBilquedan[b.BilletesMoneda]?.[b.label] || 0);
            return acc + cantidad * Number(b.label);
        }, 0);
    }, [billetes, cantidadesBilquedan]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="lg" >
                <DialogTitle
                    sx={{ textAlign: "center", position: "relative", cursor: "move" }}
                >
                    Billetes que quedan en caja
                    <IconButton
                        aria-label="close"
                        onClick={() => setBilquedan(false)}
                        sx={(theme) => ({
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                {monedas.map((moneda) => (
                    <Box
                        key={moneda.id}
                        mt={2}
                        display="grid"
                        gridTemplateColumns="repeat(10, 1fr)"
                        gap={2}
                        borderRadius="10px"
                        margin={2}
                    >
                        {billetes
                            .filter((b) => b.BilletesMoneda === moneda.id)
                            .map(({ label }) => (
                                <TextField
                                    key={`${moneda.id}-${label}`}
                                    label={`${label} ${moneda.StkMonedasSigno}`}
                                    type="number"
                                    value={cantidadesBilquedan[moneda.id]?.[label] || ""}
                                    onChange={(e) =>
                                        handleChangeBilquedan(moneda.id, label, e)
                                    }
                                />
                            ))}

                        {/* 🔹 Mostrar total ya calculado */}
                        <Box gridColumn="1 / -1">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography fontWeight="bold">Total dinero en Caja:</Typography>
                                <Typography color="green">
                                    {totalqueda[moneda.id] || "$0"}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>
                ))}


                <IconButton onClick={() => GrabCierraLimpia()}>
                    <ArchiveIcon style={{ color: green[500] }} />
                </IconButton>


            </Dialog>
            <Dialog open={open1} onClose={handleClose1} maxWidth="lg" >
                <DialogTitle
                    sx={{ textAlign: "center", position: "relative", cursor: "move", fontSize: '2.0rem', fontWeight: 'bold' }}
                >
                    Reparto de billetes
                </DialogTitle>

                {importesaguardar.current &&

                    <Grid container spacing={2}>
                        {importesaguardar.current.map((dato) => (
                            <Grid item xs={6} key={dato.monedaId} padding={5}>
                                <Typography fontWeight="bold" color='green' variant="h6">Retiros en {dato.monedaId}</Typography>
                                <Typography color='blue' variant="h6">Mañana: {dato.retiroManiana.toLocaleString("es-AR", {
                                    style: "currency",
                                    currency: dato.monedaId,
                                })}</Typography>
                                <Typography color='blue' variant="h6">Tarde: {dato.retiroTarde.toLocaleString("es-AR", {
                                    style: "currency",
                                    currency: dato.monedaId,
                                })}</Typography>
                                <Typography color='blue' variant="h6">Instrumentos: {dato.totalInstrumentos.toLocaleString("es-AR", {
                                    style: "currency",
                                    currency: dato.monedaId,
                                })}</Typography>
                                <Typography color='blue' variant="h6">Saldo Queda: {dato.saldoqueda.toLocaleString("es-AR", {
                                    style: "currency",
                                    currency: dato.monedaId,
                                })}</Typography>
                            </Grid>
                        ))}
                    </Grid>}
            </Dialog>
        </div>
    );
}
