import React, { createContext, useState } from "react";
const TablasContexto = createContext();

export function DatosTablas({ children }) {
	const [formdatos, setFormdatos] = useState("");
	const [datoborrado, setDatoborrado] = useState(0);
	return (
		<>
			<TablasContexto.Provider
				value={{ formdatos, setFormdatos, datoborrado, setDatoborrado }}
			>
				{children}
			</TablasContexto.Provider>
		</>
	);
}
export default TablasContexto;
