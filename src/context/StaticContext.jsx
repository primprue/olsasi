import React, { useState } from "react";
const StaticContext = React.createContext();

export function StaticContexto({ children }) {
	const [valor, setValor] = useState("");

	return (
		<>
			<StaticContext.Provider value={{ valor, setValor }}>
				{children}
				{console.log('valor StaticContexto ', valor)}
			</StaticContext.Provider>
		</>
	);
}

export default StaticContext;
