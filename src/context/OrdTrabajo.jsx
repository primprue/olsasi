import React, { createContext, useState } from "react";
const OrdTrabajo = createContext();

export function OrdenTrabajo({ children }) {
	const [otdatos, setOTdatos] = useState("");
	const [datosgenot, setDatosgenot] = useState([]);
	const inicializaOT = () => {
		setOTdatos("");
		setDatosgenot(""); // Reinicia otros estados si es necesario
	};
	return (
		<>
			<OrdTrabajo.Provider
				value={{
					otdatos,
					setOTdatos,
					datosgenot,
					setDatosgenot,
					inicializaOT,
				}}
			>
				{children}
			</OrdTrabajo.Provider>
		</>
	);
}
export default OrdTrabajo;
