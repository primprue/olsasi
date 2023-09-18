import React, { useEffect, useState } from "react";
import { initial_state } from "./Initial_State";
import FilaUno from "./LayoutPresupuesto/FilaUno";
import FilaDos from "./LayoutPresupuesto/FilaDos";
import { Grid } from "@mui/material";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
export const PresupPantContext = React.createContext();
var PresupPant = () => {
	const { setValor } = useContext(StaticContexto);
	const [state, setState] = useState(initial_state);
	const [datosrenglon, setDatosRenglon] = useState([]);
	useEffect(() => {
		setValor("Presupuestos");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	return (
		<div>
			<Grid container rowSpacing={-15} spacing={2} alignItems="center">
				<PresupPantContext.Provider
					value={{
						state: state,
						setState: setState,
						datosrenglon: datosrenglon,
						setDatosRenglon: setDatosRenglon,
					}}
				>
					<FilaUno />
					<FilaDos />
				</PresupPantContext.Provider>
			</Grid>
		</div>
	);
};
export default PresupPant;
