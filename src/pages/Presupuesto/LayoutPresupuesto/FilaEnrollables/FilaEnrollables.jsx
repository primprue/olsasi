import React from "react";
import {
	TextField,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
} from "@mui/material";

// import useStyles from "../styles";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaEnrollables(props) {
	console.log("props en fila enrollables  ", props);
	// const [selectedValue, setSelectedValue] = React.useState("PVC05");
	const { state, setState } = useContext(PresupPantContext);
	const [faja, setFaja] = React.useState("2P");
	const [cristal, setCristal] = React.useState("PVC05");
	// const [AltoVolado, setAltoVolado] = React.useState(0.20)
	// const [DetallePresup, setDetallePresup] = React.useState('')

	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
		// setSelectedValue(event.target.value);
		// setState({ ...state, PresupCsSs: event.target.value });
	};

	const tamcristal = (event) => {
		setCristal(event.target.value);
		setState({ ...state, TamCristal: event.target.value });
	};

	const tamfaja = (event) => {
		setFaja(event.target.value);
		setState({ ...state, TamFaja: event.target.value });
	};

	// const classes = useStyles();

	return (
		<>
			<Grid item xs={3}>
				<RadioGroup
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
						control={<Radio />}
						label="Cristal 1.35"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
					<FormControlLabel
						size="small"
						value="PVC06"
						control={<Radio />}
						label="Cristal 1.80"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
					<FormControlLabel
						size="small"
						value="NOPVC"
						control={<Radio />}
						label="s/Cristal"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
				</RadioGroup>
			</Grid>
			<Grid item xs={2}>
				<RadioGroup
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
						control={<Radio />}
						label="2''"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
					<FormControlLabel
						size="small"
						value="25P"
						control={<Radio />}
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
				/>
			</Grid>
		</>
	);
}
