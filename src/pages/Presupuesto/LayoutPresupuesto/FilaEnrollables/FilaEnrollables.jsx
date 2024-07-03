import React from "react";
import {
	TextField,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
} from "@mui/material";

import estiloI from "../../../../Styles/RadioGroup.module.css";
import estiloII from "../../../../Styles/TextField.module.css";

// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function FilaEnrollables(props) {
	console.log("props en fila enrollables  ", props);
	const { state, setState } = useContext(PresupPant);
	const [faja, setFaja] = React.useState("2P");
	const [cristal, setCristal] = React.useState("PVC05");

	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};

	const tamcristal = (event) => {
		setCristal(event.target.value);
		setState({ ...state, TamCristal: event.target.value });
	};

	const tamfaja = (event) => {
		setFaja(event.target.value);
		setState({ ...state, TamFaja: event.target.value });
	};

	return (
		<>
			<Grid container spacing={2} xs={8}>
				<Grid item xs={4}>
					<RadioGroup
						className={estiloI.radioGroup1}
						row
						size="small"
						name="CristalSN"
						label="Cristal"
						value={cristal}
						onChange={tamcristal}
						margin="dense"
					>
						<FormControlLabel
							size="small"
							value="PVC05"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="Cristal 1.35"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
						<FormControlLabel
							size="small"
							value="PVC06"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="Cristal 1.80"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
						<FormControlLabel
							size="small"
							value="NOPVC"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="s/Cristal"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
					</RadioGroup>
				</Grid>
				<Grid item xs={2}>
					<RadioGroup
						className={estiloI.radioGroup1}
						row
						size="small"
						name="Faja"
						value={faja}
						onChange={tamfaja}
						margin="dense"
					>
						<FormControlLabel
							size="small"
							value="2P"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="2''"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
						<FormControlLabel
							size="small"
							value="25P"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="2''y 1/2"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
					</RadioGroup>
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
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="SobranteMarco"
						type="number"
						margin="dense"
						label="Marco en cm : "
						fullWidth
						value={state.SobranteMarco}
						onChange={handleChange}
						className={estiloII.textfcantidad}
					/>
				</Grid>
			</Grid>
		</>
	);
}
