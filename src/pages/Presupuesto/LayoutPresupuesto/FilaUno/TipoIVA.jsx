import React from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import estilo from "../../../../Styles/RadioGroup.module.css";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function TipoIVA() {
	const [selectedValue, setSelectedValue] = React.useState("CIVA");
	const { state, setState } = useContext(PresupPant);

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setState({ ...state, PresupIVA: event.target.value });
	};

	return (
		// <Grid item xs={1}>
		<Grid item>
			{state.PresupMnMy === "mn" && (
				<RadioGroup
					className={estilo.radioGroup}
					row
					size="small"
					name="tipoIVA"
					value={selectedValue}
					onChange={handleChange}
					margin="dense"
				>
					<FormControlLabel
						value="CIVA"
						control={
							<Radio
								classes={{ root: estilo.radio, checked: estilo.radioChecked }}
							/>
						}
						className={estilo.formControlLabel}
						label="c/IVA"
						labelPlacement="top"
						margin="dense"
					/>
					{/* </Grid>
					<Grid item xs={4}> */}
					<FormControlLabel
						value="SIVA"
						control={
							<Radio
								classes={{ root: estilo.radio, checked: estilo.radioChecked }}
							/>
						}
						className={estilo.formControlLabel}
						label="s/IVA"
						labelPlacement="top"
						margin="dense"
					/>
				</RadioGroup>
			)}
		</Grid>
		// </Grid>
	);
}
