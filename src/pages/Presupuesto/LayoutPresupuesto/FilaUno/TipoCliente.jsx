import React from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function TipoCliente() {
	const [selectedValue, setSelectedValue] = React.useState("mn");
	const { state, setState } = useContext(PresupPantContext);

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setState({ ...state, PresupMnMy: event.target.value });
	};
	return (
		<>
			<RadioGroup
				row
				size="small"
				name="tipoCliente"
				value={selectedValue}
				onChange={handleChange}
				margin="dense"
			>
				<Grid item xs={3}>
					<FormControlLabel
						value="mn"
						control={<Radio />}
						label="Min."
						labelPlacement="top"
						margin="dense"
					/>
				</Grid>
				<Grid item xs={3}>
					<FormControlLabel
						value="my"
						control={<Radio />}
						label="May."
						labelPlacement="top"
						margin="dense"
					/>
				</Grid>
			</RadioGroup>
		</>
	);
}
