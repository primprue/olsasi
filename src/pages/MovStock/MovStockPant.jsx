import React, { useState, useEffect } from "react";
import { initial_state } from "./Initial_State";
import PantallaInicial from "./PantallaInicial.jsx";

import { Grid } from "@mui/material";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";

export const MovStockPantContext = React.createContext();

var MovStockPant = () => {
	const { setValor } = useContext(StaticContexto);
	const [state, setState] = useState(initial_state);
	// const [movimiento, setMovimiento] = useState("");
	useEffect(() => {
		setValor("Stock");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<Grid container spacing={2} alignItems="center">
				<MovStockPantContext.Provider
					value={{
						state: state,
						setState: setState,
					}}
				>
					<PantallaInicial />
				</MovStockPantContext.Provider>
			</Grid>
		</div>
	);
};
export default MovStockPant;
