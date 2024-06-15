import React from "react";
import styles from "../styles.module.css";
import estilos from "../../../../Styles/TextField.module.css";
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

import { Grid, TextField } from "@mui/material";
export default function FilaDetDesc(props) {
	const { state, setState } = useContext(PresupPant);
	const [DescripPresup, setDescripPresup] = React.useState("");
	//  const [selectedValue, setSelectedValue] = React.useState("");

	const { presuptipo } = props;

	const handleChange3 = (event) => {
		setDescripPresup(event.target.value);
		setState({ ...state, DescripPresup: event.target.value });
	};

	const handleChange4 = (event) => {
		//   setSelectedValue(event.target.value);
		setState({ ...state, DetallePresup: event.target.value });
	};

	const handleChange5 = (event) => {
		//   setSelectedValue(event.target.value);
		setState({ ...state, DetalleRenglon: event.target.value });
	};

	const handleChange6 = (event) => {
		//   setSelectedValue(event.target.value);
		setState({ ...state, ExplicaPresup: event.target.value });
	};

	const classes = styles;
	return (
		<>
			<Grid container spacing={2} alignItems="center" padding={3}>
				{presuptipo !== "CARGA DESCRIPCION" && (
					<div>
						<TextField
							inputProps={{ maxLength: 15 }}
							size="small"
							variant="filled"
							id="DescripPresup"
							margin="normal"
							label="Descripción"
							// fullWidth
							value={DescripPresup}
							helperText="No imprime medidas"
							onChange={handleChange3}
							className={estilos.textftexto}
						/>

						<TextField
							inputProps={{ maxLength: 100 }}
							size="small"
							variant="filled"
							id="DetallePresup"
							margin="normal"
							label="Detalle Presupuesto "
							// fullWidth
							value={state.DetallePresup}
							helperText="Saca la descripción por defecto"
							onChange={handleChange4}
							className={estilos.textftexto}
						/>
						<TextField
							inputProps={{ maxLength: 100 }}
							size="small"
							variant="filled"
							id="DetalleRenglon"
							margin="normal"
							label="Agrega en Renglón "
							// fullWidth
							value={state.DetalleRenglon}
							helperText="Se agrega a la descripción"
							onChange={handleChange5}
							className={estilos.textftexto}
						/>
					</div>
				)}
				<TextField
					inputProps={{ maxLength: 100 }}
					size="small"
					variant="filled"
					id="ExplicaPresup"
					margin="normal"
					InputLabelProps={{
						classes: {
							root: estilos.formLabel,
							input: estilos.input,
							MuiFormHelperTextroot: estilos.input,
							//	helperText: estilos.formControlLabel,
						},
					}}
					label="Explicación de Presupuesto "
					// fullWidth
					value={state.ExplicaPresup}
					helperText="No aparece en el presupuesto"
					onChange={handleChange6}
					className={estilos.textftexto}
				/>
			</Grid>
		</>
	);
}
