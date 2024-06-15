import React from "react";
import {
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
} from "@mui/material";

import swal from "sweetalert";
import estilo from "../../../../Styles/TextFieldSelect.module.css";
import estiloI from "../../../../Styles/RadioGroup.module.css";
import estiloII from "../../../../Styles/TextField.module.css";

// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function FilaAbanico(props) {
	const { state, setState } = useContext(PresupPant);
	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};

	const handleChangeLargo = (event) => {
		const id = event.target.id;

		var valor = event.target.value;

		if (valor < 1.26) {
			setState({ ...state, [id]: event.target.value });
		} else {
			swal({
				title: "Error",
				text: "No puede ser mayor a 1.26",
				icon: "error",
				button: "OK",
				dangerMode: true,
			});
		}
	};

	const voladods = (event) => {
		setState({ ...state, VolDS: event.target.value });
	};

	const fajadebrazo = [
		{
			id: "FajaBrazoEleg",
			label: "Faja para Brazo :",
			value: state.value,
			mapeo: (
				<>
					<option></option>
					{state.FajaBrazo.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</>
			),
		},
	];

	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="CantBrazos"
						type="number"
						margin="dense"
						label="Cantidad Brazos : "
						fullWidth
						value={state.CantBrazos}
						onChange={handleChange}
						className={estiloII.textfcantidad}
					/>
				</Grid>
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 3 }}
						//no más de 1.25
						size="small"
						variant="outlined"
						id="LargoBrazo"
						type="number"
						margin="dense"
						label="Largo Brazos : "
						fullWidth
						value={state.LargoBrazo}
						onChange={handleChangeLargo}
						className={estiloII.textfcantidad}
						helperText="No mayor a 1.25"
					/>
				</Grid>
				<Grid item xs={1}>
					{fajadebrazo.map((data) => (
						<TextField
							id={data.id}
							key={data.id}
							fullWidth
							size="small"
							select
							label={data.label}
							margin="dense"
							value={data.value}
							onChange={handleChange}
							className={estilo.selectField}
							InputLabelProps={{
								className: estilo.selectLabel,
							}}
							SelectProps={{
								native: true,
								className: estilo.menuItem,
							}}
							variant="outlined"
							// helperText="Brazos de?"
							// className={classes.textField}
						>
							{data.mapeo}
						</TextField>
					))}
				</Grid>
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="AltoVolado"
						type="number"
						label="Volado en cm :  "
						fullWidth
						margin="dense"
						value={state.AltoVolado}
						onChange={handleChange}
						className={estiloII.textfcantidad}
					/>
				</Grid>
				<Grid item ms={2}>
					<RadioGroup
						className={estiloI.radioGroup1}
						row
						size="small"
						name="Volado"
						value={state.VolDS}
						onChange={voladods}
						margin="dense"
					>
						<FormControlLabel
							size="small"
							value="S"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="Simple"
							labelPlacement="top"
							disabled={props.enable}
							margin="dense"
						/>
						<FormControlLabel
							size="small"
							value="D"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="Doble"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
					</RadioGroup>
				</Grid>
			</Grid>
		</>
	);
}
