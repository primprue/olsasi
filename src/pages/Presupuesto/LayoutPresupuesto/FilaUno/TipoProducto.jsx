import React from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";

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
		<>
			<RadioGroup
				row
				size="small"
				name="tipoProducto"
				value={selectedValue}
				onChange={handleChange}
				margin="dense"
				color="primary"
			>
				<Grid item xs={6}>
					<FormControlLabel
						value="PE"
						control={<Radio />}
						label="Elab"
						labelPlacement="top"
						margin="dense"
					/>
				</Grid>
				<Grid item xs={6}>
					<FormControlLabel
						value="PAE"
						control={<Radio />}
						label="a-El."
						labelPlacement="top"
						margin="dense"
					/>
				</Grid>
			</RadioGroup>
			{/* } */}
		</>
	);
}
