import React from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import estilo from "../../../../Styles/RadioGroup.module.css";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function TipoProducto() {
	const [selectedValue, setSelectedValue] = React.useState("PAE");
	const { state, setState } = useContext(PresupPant);

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setState({ ...state, PresupProducto: event.target.value });
	};

	return (
		<Grid item className={estilo.grilla}>
			<RadioGroup
				row
				size="small"
				className={estilo.radioGroup}
				name="tipoProducto"
				value={selectedValue}
				onChange={handleChange}
				margin="dense"
				color="primary"
			>
				<FormControlLabel
					value="PE"
					control={
						<Radio
							classes={{ root: estilo.radio, checked: estilo.radioChecked }}
						/>
					}
					className={estilo.formControlLabel}
					label="Elab"
					labelPlacement="top"
					margin="dense"
				/>
				{/* </Grid>
				<Grid item xs={4}> */}
				<FormControlLabel
					value="PAE"
					control={
						<Radio
							classes={{ root: estilo.radio, checked: estilo.radioChecked }}
						/>
					}
					className={estilo.formControlLabel}
					label="a-El."
					labelPlacement="top"
					margin="dense"
				/>
			</RadioGroup>
		</Grid>
	);
}
