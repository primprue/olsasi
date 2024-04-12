import React, { useEffect, useState } from "react";
import { datosot } from "./DatosOT.js";
import { Grid } from "@mui/material";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import OTRecRenglon from "./LayoutOrdenTrabajo/OTRecRenglon.jsx";

export default function OTrabajo() {
	const { setValor } = useContext(StaticContexto);
	useEffect(() => {
		setValor("Orden de Trabajo");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div>
			<Grid container rowSpacing={-15} spacing={2} alignItems="center">
				<OTRecRenglon />
			</Grid>
		</div>
	);
}
