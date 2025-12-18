import { AppBar, Typography } from "@mui/material";
import React, { useState } from "react";
const StaticContext = React.createContext();

export function StaticContexto({ children }) {
	const [valor, setValor] = useState("")

	return (
		<>
			<StaticContext.Provider value={{ valor, setValor }}>
				{children}
			</StaticContext.Provider>
			{/* <Typography variant="h6">
				{valor}

			</Typography> */}
		</>
	);
}

export default StaticContext;
