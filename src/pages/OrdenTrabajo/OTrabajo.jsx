import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import OTRecRenglon from "./LayoutOrdenTrabajo/OTRecRenglon.jsx";
import OrdTrabajo from "../../context/OrdTrabajo";
import { Route, useNavigate } from "react-router-dom";
export default function OTrabajo() {
	const { setValor } = useContext(StaticContexto);
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const navigate = useNavigate();

	const ReiniciaOTContext = () => {
		setOTdatos("");
		setValor("");
		navigate("/");
	};
	useEffect(() => {
		setValor("Orden de Trabajo");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div>
			<Grid container rowSpacing={-15} spacing={2} alignItems="center">
				<OTRecRenglon />

				<Button onClick={ReiniciaOTContext}>Cerrar</Button>
			</Grid>
		</div>
	);
}
