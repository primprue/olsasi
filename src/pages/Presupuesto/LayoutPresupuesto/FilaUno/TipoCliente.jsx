import React from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";
import estilo from "../../../../Styles/RadioGroup.module.css";

export default function TipoCliente() {
	const [selectedValue, setSelectedValue] = React.useState("mn");
	const { state, setState } = useContext(PresupPant);

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setState({ ...state, PresupMnMy: event.target.value });
	};
	return (
		<Grid item>
			<RadioGroup
				className={estilo.radioGroup}
				row
				size="small"
				name="tipoCliente"
				value={selectedValue}
				onChange={handleChange}
				margin="dense"
			>
				{/* <Grid item xs={1}> */}
				<FormControlLabel
					value="mn"
					// control={<Radio />}
					label="Min."
					labelPlacement="top"
					margin="dense"
					control={
						<Radio
							classes={{ root: estilo.radio, checked: estilo.radioChecked }}
						/>
					}
					className={estilo.formControlLabel}
				/>
				{/* </Grid>
				<Grid item xs={3}> */}
				<FormControlLabel
					value="my"
					control={
						<Radio
							classes={{ root: estilo.radio, checked: estilo.radioChecked }}
						/>
					}
					label="May."
					labelPlacement="top"
					margin="dense"
					className={estilo.formControlLabel}
				/>
				{/* </Grid> */}
			</RadioGroup>
		</Grid>
	);
}
