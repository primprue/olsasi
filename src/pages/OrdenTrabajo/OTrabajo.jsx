import React, { useEffect, useState } from "react";
import { datosot } from "./DatosOT.js";
import { Grid } from "@mui/material";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import FilaUno from "./LayoutOrdenTrabajo/FilaUno.jsx";
export const OTContext = React.createContext();
// { children }
var OTrabajo = () => {
	const { setValor } = useContext(StaticContexto);
	const [datosortt, setDatosOrTr] = useState(datosot);
	useEffect(() => {
		setValor("Orden de Trabajo");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div>
			<Grid container rowSpacing={-15} spacing={2} alignItems="center">
				<OTContext.Provider
					value={{
						datosortt: datosortt,
						setDatosOrTr: setDatosOrTr,
					}}
				>
					<FilaUno />
				</OTContext.Provider>
			</Grid>
		</div>
	);
};
export default OTrabajo;
