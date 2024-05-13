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
