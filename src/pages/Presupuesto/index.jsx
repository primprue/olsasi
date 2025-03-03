import React from "react";
import FilaUno from "./LayoutPresupuesto/FilaUno/index.jsx";
import FilaDos from "./LayoutPresupuesto/FilaDos/FilaDos.jsx";
import Grid from "@mui/material/Grid2";
import TipoCliente from "./LayoutPresupuesto/FilaUno/TipoCliente.jsx";
import TipoIVA from "./LayoutPresupuesto/FilaUno/TipoIVA.jsx";
import TipoProducto from "./LayoutPresupuesto/FilaUno/TipoProducto.jsx";
import FilaUnoIzq from "./LayoutPresupuesto/FilaUno/FilaUnoIzq.jsx";

export default function Presupuesto() {
	return (
		<div>
			<Grid container spacing={2} alignItems="center" padding={4}>
				{/* <FilaUno /> */}
				<TipoCliente />
				<TipoIVA />
				<TipoProducto />
				<FilaUnoIzq />
				<FilaDos />
			</Grid>
		</div>
	);
}
