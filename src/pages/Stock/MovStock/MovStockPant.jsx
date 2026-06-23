import React, { useState, useEffect } from "react";
import { initial_state } from "./Initial_State.js";
import PantallaInicial from "./PantallaInicial.jsx";

import Grid from "@mui/material/Grid";

export const MovStockPantContext = React.createContext();

var MovStockPant = () => {
	const [state, setState] = useState(initial_state);
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
