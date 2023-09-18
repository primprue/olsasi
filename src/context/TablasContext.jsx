/* <import React, { useState } from "react";
import { formdata } from "../Tablas/formdata";
const TablasContext = React.createContext({});

export function TablasContextProvider() {
	const [formdatos, setFormdatos] = useState({
		ProveedoresDesc: "",
		ProveedoresTipo: "",
		ProveedoresCUIT: "",
		ProveedoresCalle: "",
		ProveedoresNroCalle: "0",
		ProveedoresPiso: "",
		ProveedoresDto: "",
		ProveedoresCodPos: "",
		ProveedoresLoc: "",
		ProveedoresPcia: "",
		ProveedoresTel: "",
		ProveedoresContacto: "",
		ProveedoresMail: "",
		ProveedoresWeb: "",
		ProveedoresCodMon: "",
		datoserroneos: true,
	});

	console.log("formdatos Tablas  ", formdatos);
	return (
		<TablasContext.Provider
			value={{ formdatos, setFormdatos }}
		></TablasContext.Provider>
	);
}
export default TablasContext; */
// }
// import React, { useState } from "react";
// export const TablasContext = React.createContext();
// import Proveedores from "./Proveedores/Proveedores";
// import { DialogoDatos } from "./Proveedores/DialogoDatos";
// import { formdata } from "./Proveedores/formdata";
// const TablasC = () => {
// 	const [formdatos, setFormdatos] = useState(formdata);
// 	return (
// 		<>
// 			<div>
// 				<TablasContext.Provider
// 					value={{ formdatos: formdatos, setFormdatos: setFormdatos }}
// 				>
// 					<Proveedores />
// 					<DialogoDatos />
// 				</TablasContext.Provider>
// 				{/* <Footter/>   */}
// 			</div>
// 		</>
// 	);
// };

// // export default TablasC;
// import React from "react";
// const TablasContext = React.createContext({ formdata });
// export default TablasContext;
import React, { createContext, useState } from "react";
const TablasContexto = createContext({});

export function DatosTablas({ children }) {
	const [formdatos, setFormdatos] = useState("");
	return (
		<TablasContexto.Provider value={{ formdatos, setFormdatos }}>
			{children}
		</TablasContexto.Provider>
	);
}
export default TablasContexto;

// const Context = React.createContext({})

// export function GifsContextProvider ({children}) {
//   const [gifs, setGifs] = useState([])

//   return <Context.Provider value={{gifs, setGifs}}>
//     {children}
//   </Context.Provider>
// }

// export default Context

// import React, { createContext, useContext } from "react";

// const TableDataContext = createContext();

// export function TableDataProvider({ children }) {
// 	// Simulación de datos de tablas
// 	const tableData = {
// 		tabla1: ["campo1", "campo2", "campo3"],
// 		tabla2: ["campoA", "campoB", "campoC"],
// 		// ... Otros datos de otras tablas
// 	};

// 	return (
// 		<TableDataContext.Provider value={tableData}>
// 			{children}
// 		</TableDataContext.Provider>
// 	);
// }

// export function useTableData() {
// 	return useContext(TableDataContext);
// }
