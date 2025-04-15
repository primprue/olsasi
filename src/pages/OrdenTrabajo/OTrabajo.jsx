import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";
import { use } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import OTRecRenglon from "./LayoutOrdenTrabajo/OTRecRenglon.jsx";
import OrdTrabajo from "../../context/OrdTrabajo";
export default function OTrabajo() {
	const { setValor } = use(StaticContexto);
	// const { otdatos, setOTdatos } = use(OrdTrabajo);
	const { inicializaOT } = use(OrdTrabajo);

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
			<OTRecRenglon />{" "}
			{/* muestra encabezado y llama a Datagrid con los datos de la orden de trabajo */}
			{/* <Button onClick={inicializaOT}>Cerrar</Button> */}
		</Grid>
	);
}
