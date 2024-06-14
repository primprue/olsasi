import React from "react";

import { useEffect } from "react";

import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import FilaUno from "./LayoutPresupuesto/FilaUno/index.jsx";
import FilaDos from "./LayoutPresupuesto/FilaDos/FilaDos.jsx";
import { Container, Grid } from "@mui/material";

export default function Presupuesto() {
	const { valor, setValor } = useContext(StaticContexto);

	useEffect(() => {
		setValor("Presupuestos");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<Grid container spacing={2} alignItems="center" padding={1}>
				<FilaUno />
				<FilaDos />
			</Grid>
		</div>
	);
}
