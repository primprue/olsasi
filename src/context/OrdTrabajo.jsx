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
