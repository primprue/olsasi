import React from "react";
import FilaDos from "./LayoutPresupuesto/FilaDos/FilaDos.jsx";
import Grid from "@mui/material/Grid";
import TipoCliente from "./LayoutPresupuesto/FilaUno/TipoCliente.jsx";
import TipoIVA from "./LayoutPresupuesto/FilaUno/TipoIVA.jsx";
import TipoProducto from "./LayoutPresupuesto/FilaUno/TipoProducto.jsx";
import FilaUnoIzq from "./LayoutPresupuesto/FilaUno/FilaUnoIzq.jsx";
import { PresupPant } from "../../context/PresupPant.jsx";
export default function Presupuesto() {
	return (
		<div>
			<Grid container spacing={2} alignItems="center" padding={4}>
				{/* <PresupPant > */}
				<TipoCliente />
				<TipoIVA />
				<TipoProducto />
				<FilaUnoIzq />
				<FilaDos />
				{/* </PresupPant> */}
			</Grid>
		</div>
	);
}
