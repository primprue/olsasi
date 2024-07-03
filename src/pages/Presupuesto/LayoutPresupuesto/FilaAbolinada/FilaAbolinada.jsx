import React from "react";

import {
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
} from "@mui/material";
import estiloI from "../../../../Styles/RadioGroup.module.css";
import estiloII from "../../../../Styles/TextField.module.css";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function FilaAbolinada(props) {
	// const [selectedValue, setSelectedValue] = React.useState(20);
	const { state, setState } = useContext(PresupPant);
	const [ojalbronce, setOjalBronce] = React.useState("hz");

	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};

	const handleChange2 = (event) => {
		setOjalBronce(event.target.value);
		setState({ ...state, PresupOB: event.target.value });
	};

	return (
		<>
			<Grid container spacing={2} xs={8}>
				<Grid item>
					<TextField
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="PresupOjalesC"
						type="number"
						label="Ojales cada, en cm :  "
						fullWidth
						margin="dense"
						value={state.PresupOjalesC}
						onChange={handleChange}
						className={estiloII.textfcantidad}
					/>
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
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="HZ"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
						<FormControlLabel
							size="small"
							value="br"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="BR"
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
