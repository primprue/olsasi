import React from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import estilo from "../../../../Styles/RadioGroup.module.css";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function FilaConf(props) {
	const [selectedValue, setSelectedValue] = React.useState("cs");
	const { state, setState } = useContext(PresupPant);
	const [ojalbronce, setOjalBronce] = React.useState("hz");

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setState({ ...state, PresupCsSs: event.target.value });
	};

	const handleChange2 = (event) => {
		setOjalBronce(event.target.value);
		setState({ ...state, PresupOB: event.target.value });
	};

	return (
		<>
			<Grid item>
				<RadioGroup
					className={estilo.radioGroup1}
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
						control={
							<Radio
								classes={{ root: estilo.radio1, checked: estilo.radioChecked1 }}
							/>
						}
						className={estilo.formControlLabel1}
						label="C/S"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
					<FormControlLabel
						size="small"
						value="ss"
						control={
							<Radio
								classes={{ root: estilo.radio1, checked: estilo.radioChecked1 }}
							/>
						}
						className={estilo.formControlLabel1}
						label="S/S"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
				</RadioGroup>
			</Grid>
			<Grid item>
				<RadioGroup
					className={estilo.radioGroup1}
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
								classes={{ root: estilo.radio1, checked: estilo.radioChecked1 }}
							/>
						}
						className={estilo.formControlLabel1}
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
								classes={{ root: estilo.radio1, checked: estilo.radioChecked1 }}
							/>
						}
						className={estilo.formControlLabel1}
						label="BR"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
				</RadioGroup>
			</Grid>
		</>
	);
}
