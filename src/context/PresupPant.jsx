import React, { createContext, useState } from "react";
import { initial_state } from "../pages/Presupuesto/Initial_State.js";

import { Grid } from "@mui/material";
const PresupPantContext = createContext();

export function PresupPant({ children }) {
	const [state, setState] = useState(initial_state);
	const [datosrenglon, setDatosRenglon] = useState([]);
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
					{children}
					{/* <FilaUno />
					<FilaDos /> */}
				</PresupPantContext.Provider>
			</Grid>
		</div>
	);
}
export default PresupPantContext;

// import React, { useEffect, useState } from "react";
// import { initial_state } from "../pages/Presupuesto/Initial_State.js";
// import { Grid } from "@mui/material";
// import { useContext } from "react";
// import StaticContexto from "./StaticContext.jsx";
// export const PresupPantContext = React.createContext();
// // { children }
// var PresupPant = () => {
// 	const { setValor } = useContext(StaticContexto);
// 	const [state, setState] = useState(initial_state);
// 	const [datosrenglon, setDatosRenglon] = useState([]);

// 	useEffect(() => {
// 		setValor("Presupuestos");
// 	}, []); // eslint-disable-line react-hooks/exhaustive-deps
// 	return (
// 		<div>
// 			<Grid container rowSpacing={-15} spacing={2} alignItems="center">
// 				<PresupPantContext.Provider
// 					value={{
// 						state: state,
// 						setState: setState,
// 						datosrenglon: datosrenglon,
// 						setDatosRenglon: setDatosRenglon,
// 					}}
// 				>
// 					{/* {children} */}

// 					<FilaUno />
// 					<FilaDos />
// 				</PresupPantContext.Provider>
// 			</Grid>
// 		</div>
// 	);
// };
// export default PresupPant;
