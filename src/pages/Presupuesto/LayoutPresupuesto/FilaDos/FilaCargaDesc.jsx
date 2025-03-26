import React from "react";
import styles from "../styles.module.css";
import estilot from "../../../../Styles/TextField.module.css";
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";
export default function FilaCargaDesc() {
	const { state, setState } = use(PresupPant);

	// const handleChange5 = (event) => {
	// 	setState({ ...state, DetalleRenglon: event.target.value });
	// 	//para que no salga Ancho y Largo en la tabla del presupuesto cuando se carga por descripción
	// 	// setState({ ...state, DescripPresup: '------' });
	// };
	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });

	};
	return (
		<>
			<Grid container item span={{ xs: 8 }}>
				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="DetalleRenglon"
						type="number"
						label="Descripción "
						value={state.DetalleRenglon}
						onChange={handleChange}
						width="500px"
						multiline={true}
					/>
				</Grid>
				{/* <TextField
					multiline={true}
					// input={{ maxLength: 500 }}
					size="small"
					variant="outlined"
					id="DetalleRenglon"
					margin="dense"
					label="Descripción "
					fullWidth
					value={state.DetalleRenglon}
					placeholder="no permite los signos % +"
					helperText="Descripción del trabajo (no permite los signos % +)"
					onChange={handleChange5}
					className={estilot.textfcantidad}
				/> */}
			</Grid>
		</>
	);
}
