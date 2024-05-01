import React from "react";
import {
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
} from "@mui/material";

import swal from "sweetalert";

import styles from "../styles.module.css";
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

	const classes = styles;

	return (
		<>
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
					className={classes.textField}
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
					className={classes.textField}
					helperText="No mayor a 1.25"
				/>
			</Grid>
			<Grid item xs={1}>
				{fajadebrazo.map((data) => (
					<TextField
						id={data.id}
						key={data.id}
						fullWidth
						select
						label={data.label}
						margin="dense"
						value={data.value}
						onChange={handleChange}
						SelectProps={{ native: true }}
						variant="outlined"
						helperText="Brazos de?"
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
					className={classes.textField}
				/>
			</Grid>
			<Grid item xs={2}>
				<RadioGroup
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
						control={<Radio />}
						label="Simple"
						labelPlacement="top"
						disabled={props.enable}
						margin="dense"
					/>
					<FormControlLabel
						size="small"
						value="D"
						control={<Radio />}
						label="Doble"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
				</RadioGroup>
			</Grid>
		</>
	);
}
