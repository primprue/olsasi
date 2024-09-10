import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import PantallaInicial from "./PantallaInicial.jsx";
export default function CtasCtes() {
	const { setValor } = useContext(StaticContexto);

	useEffect(() => {
		setValor("Ctas. Ctes.");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<Grid
			container
			rowSpacing={15}
			spacing={2}
			alignItems="center"
			padding={10}
		>
			<PantallaInicial />
		</Grid>
	);
}
