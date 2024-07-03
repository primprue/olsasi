import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import OTRecRenglon from "./LayoutOrdenTrabajo/OTRecRenglon.jsx";
import OrdTrabajo from "../../context/OrdTrabajo";
export default function OTrabajo() {
	const { setValor } = useContext(StaticContexto);
	// const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const { inicializaOT } = useContext(OrdTrabajo);

	useEffect(() => {
		setValor("Orden de Trabajo");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<Grid
			container
			rowSpacing={15}
			spacing={2}
			alignItems="center"
			padding={10}
		>
			<OTRecRenglon />

			<Button onClick={inicializaOT}>Cerrar</Button>
		</Grid>
	);
}
