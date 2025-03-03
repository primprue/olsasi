import React, { useState } from "react";
import PantallaIngreso from "./LayoutMovStock/Ingreso/PantallaMovimiento.jsx";
// import SalidaDisponible from "./LayoutMovStock/SalidaDisp/SalidaDisponible";

import Grid from "@mui/material/Grid2";

import { Button } from "@mui/material";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import { green } from "@mui/material/colors";

// import { useContext } from "react";
// import { MovStockPantContext } from './MovStockPant'

export default function PantallaInicial() {
	// const { state, setState } = useContext(MovStockPantContext);
	const [pantingreso, setPantingreso] = useState(false);
	// const [saldisponible, setSaldisponible] = useState(false)

	// const LlamaPI = () => {
	//     setPantingreso(true)
	// }
	function LlamaPI() {
		setPantingreso(!pantingreso);
	}

	return (
		<>
			<Grid>
				{/* <Grid container item span={{ xs: 2 }}> */}
				<Button onClick={LlamaPI} color="primary">
					<AssignmentReturnedIcon
						style={{ color: green[500] }}
						fontSize="large"
						titleAccess="Agregar"
					/>
				</Button>

				{pantingreso ? (
					<div>
						<PantallaIngreso />
					</div>
				) : (
					""
				)}

				{/* {saldisponible ? (
                    <div>
                        <SalidaDisponible />
                    </div>
                ) : ("")} */}
			</Grid>
		</>
	);
}
