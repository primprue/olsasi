import React, { useState } from "react";
const StaticContext = React.createContext();

export function StaticContexto({ children }) {
	const [valor, setValor] = useState("");

	return (
		<>
			<StaticContext.Provider value={{ valor, setValor }}>
				{children}
			</StaticContext.Provider>
		</>
	);
}

export default StaticContext;
