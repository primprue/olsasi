import React, { createContext, useState, useMemo } from "react";
import { initial_state } from "../pages/Presupuesto/Initial_State.js";
import Grid from "@mui/material/Grid";

const PresupPantContext = createContext();

export function PresupPant({ children }) {
	const [state, setState] = useState(initial_state);
	const [datosrenglon, setDatosRenglon] = useState([]);
	const [suma, setSuma] = useState(0);

	const inicializaPresup = () => {
		setState(initial_state);
		setDatosRenglon([]); // Reinicia otros estados si es necesario
		setSuma(0);
	};

	// 🛑 Previene renders innecesarios usando useMemo
	const contextValue = useMemo(() => ({
		state,
		setState,
		datosrenglon,
		setDatosRenglon,
		suma,
		setSuma,
		inicializaPresup,
	}), [state, datosrenglon, suma]);

	return (
		<PresupPantContext.Provider value={contextValue}>
			<Grid container rowSpacing={-15} spacing={2} alignItems="center">
				{children}
			</Grid>
		</PresupPantContext.Provider>
	);
}

export default PresupPantContext;



// import React, { createContext, useState } from "react";
// import { initial_state } from "../pages/Presupuesto/Initial_State.js";
// import Grid from "@mui/material/Grid";
// const PresupPantContext = createContext();
// export function PresupPant({ children }) {
// 	const [state, setState] = useState(initial_state);
// 	const [datosrenglon, setDatosRenglon] = useState([]);
// 	const [suma, setSuma] = useState(0);
// 	const inicializaPresup = () => {
// 		setState(initial_state);
// 		setDatosRenglon([]); // Reinicia otros estados si es necesario
// 		setSuma(0)
// 	};
// 	return (
// 		<>
// 			<PresupPantContext
// 				value={{
// 					state: state,
// 					setState: setState,
// 					datosrenglon: datosrenglon,
// 					setDatosRenglon: setDatosRenglon,
// 					suma: suma,
// 					setSuma: setSuma,
// 					inicializaPresup, // Proveer la función de inicialización
// 				}}
// 			>
// 				<Grid container rowSpacing={-15} spacing={2} alignItems="center">
// 					{children}
// 				</Grid>
// 			</PresupPantContext>
// 		</>
// 	);
// }
// export default PresupPantContext;

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
