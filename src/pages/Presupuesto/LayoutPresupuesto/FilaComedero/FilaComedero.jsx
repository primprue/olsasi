import React from "react";
import {
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
	FormLabel,
	FormHelperText,
} from "@mui/material";
import estilo from "../../../../Styles/TextFieldSelect.module.css";
import estiloI from "../../../../Styles/RadioGroup.module.css";
import estiloII from "../../../../Styles/TextField.module.css";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function FilaComedero(props) {
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

	const anchocom = [
		{
			id: "AnchoComederoEleg",
			label: "Ancho Comedero",
			value: state.value,
			mapeo: (
				<>
					<option></option>
					{state.AnchoComedero.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</>
			),
		},
	];

	// const classes = styles;

	return (
		<>
			<Grid container spacing={2}>
				<Grid item>
					{/* <FormLabel component="legend">Ancho del comedero </FormLabel> */}
					{anchocom.map((data) => (
						<TextField
							id={data.id}
							key={data.id}
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
							// helperText="Ancho del comedero"
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
						id="PresupOjalesC"
						type="number"
						label="Ojales cada, en cm :  "
						fullWidth
						margin="dense"
						hidden="true"
						value={state.PresupOjalesC}
						onChange={handleChange}
						className={estiloII.textfcantidad}
					/>
				</Grid>
				<Grid item ms={1}>
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
							label="HZ"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
						/>
						<FormControlLabel
							size="small"
							value="br"
							label="BR"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
							control={
								<Radio
									classes={{
										root: estiloI.radio,
										checked: estiloI.radioChecked,
									}}
								/>
							}
							className={estiloI.formControlLabel}
						/>
					</RadioGroup>
					<FormHelperText>Ojales de hierro o bronce</FormHelperText>
				</Grid>
			</Grid>
		</>
	);
}
