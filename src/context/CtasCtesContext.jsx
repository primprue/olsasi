import React, { createContext, useState } from "react";
const CtasCtesContext = createContext();

export function CtaCteContext({ children }) {
	const [fcdatos, setFCdatos] = useState("");
	const [datosgenfc, setDatosgenfc] = useState([]);
	const inicializaFC = () => {
		setOTdatos("");
		setDatosgenfc(""); // Reinicia otros estados si es necesario
	};
	return (
		<>
			<CtasCtesContext.Provider
				value={{
					fcdatos,
					setFCdatos,
					datosgenfc,
					setDatosgenfc,
					inicializaFC,
				}}
			>
				{children}
			</CtasCtesContext.Provider>
		</>
	);
}
export default CtasCtesContext;

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
