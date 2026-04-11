import { createContext, useState, useMemo } from "react";
import { initial_state } from "../pages/Presupuesto/Initial_State.js";
import Grid from "@mui/material/Grid";

const PresupPantContext = createContext();

export function PresupPant({ children }) {
	const [state, setState] = useState(initial_state);
	const [datosrenglon, setDatosRenglon] = useState([]);
	const [suma, setSuma] = useState(0);
	const [resetKey, setResetKey] = useState(0); // 👈 Nuevo estado
	const inicializaPresup = () => {
		setState(initial_state);
		setDatosRenglon([]); // Reinicia otros estados si es necesario
		setSuma(0);
		setResetKey(prev => prev + 1); // 👈 Incrementamos la versión
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
			<Grid key={resetKey} container rowSpacing={1} spacing={1} alignItems="center">
				{children}
			</Grid>
		</PresupPantContext.Provider>
	);
}

export default PresupPantContext;



