import React from "react";
import {
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
} from "@mui/material";
import styles from "../styles.module.css";
// Context
import estiloI from "../../../../Styles/RadioGroup.module.css";
import estiloII from "../../../../Styles/TextField.module.css";
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function FilaModMed(props) {
	const [selectedValue, setSelectedValue] = React.useState("cs");
	const { state, setState } = useContext(PresupPant);
	const [ojalbronce, setOjalBronce] = React.useState("hz");
	const [lonanuesafu, setLonaNuesAfu] = React.useState("LN");

	const handleChange1 = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setState({ ...state, PresupCsSs: event.target.value });
	};

	const handleChange2 = (event) => {
		setOjalBronce(event.target.value);
		setState({ ...state, PresupOB: event.target.value });
	};

	const handleChange3 = (event) => {
		setLonaNuesAfu(event.target.value);
		setState({ ...state, PreuspLNLF: event.target.value });
	};
	const classes = styles;
	return (
		<>
			<Grid container spacing={2} xs={12}>
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="PresupLargoN"
						type="number"
						label="Largo Nuevo"
						fullWidth
						margin="dense"
						value={state.PresupLargoN}
						onChange={handleChange1}
						className={estiloII.textfcantidad}
					/>
				</Grid>

				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="PresupAnchoN"
						type="number"
						label="Ancho Nuevo"
						fullWidth
						margin="dense"
						value={state.PresupAnchoN}
						onChange={handleChange1}
						className={estiloII.textfcantidad}
					/>
				</Grid>

				<Grid item xs={2}>
					<RadioGroup
						className={estiloI.radioGroup1}
						row
						size="small"
						name="tipoDobladillo"
						value={selectedValue}
						onChange={handleChange}
						margin="dense"
					>
						<FormControlLabel
							size="small"
							value="cs"
							label="C/S"
							control={<Radio />}
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
						<FormControlLabel
							size="small"
							value="ss"
							control={<Radio />}
							label="S/S"
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
						name="tipoOjal"
						value={ojalbronce}
						onChange={handleChange2}
						margin="dense"
					>
						<FormControlLabel
							size="small"
							value="hz"
							className={estiloI.formControlLabel1}
							label="HZ"
							control={<Radio />}
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
						<FormControlLabel
							className={estiloI.formControlLabel1}
							size="small"
							value="br"
							control={<Radio />}
							label="BR"
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
						name="lonadeAca"
						value={lonanuesafu}
						onChange={handleChange3}
						margin="dense"
					>
						<FormControlLabel
							size="small"
							value="LN"
							control={<Radio />}
							label="LN"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
						<FormControlLabel
							size="small"
							value="LA"
							control={<Radio />}
							label="LA"
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
