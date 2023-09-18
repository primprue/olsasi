import React from "react";
import { Grid, Radio, RadioGroup, FormControlLabel } from "@mui/material";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function TipoIVA() {
	const [selectedValue, setSelectedValue] = React.useState("CIVA");
	const { state, setState } = useContext(PresupPantContext);

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setState({ ...state, PresupIVA: event.target.value });
	};

	return (
		<>
			{state.PresupMnMy === "mn" && (
				<RadioGroup
					row
					size="small"
					name="tipoIVA"
					value={selectedValue}
					onChange={handleChange}
					margin="dense"
				>
					<Grid item xs={4}>
						<FormControlLabel
							value="CIVA"
							control={<Radio />}
							label="c/IVA"
							labelPlacement="top"
							margin="dense"
						/>
					</Grid>
					<Grid item xs={4}>
						<FormControlLabel
							value="SIVA"
							control={<Radio />}
							label="s/IVA"
							labelPlacement="top"
							margin="dense"
						/>
					</Grid>
				</RadioGroup>
			)}
		</>
	);
}
