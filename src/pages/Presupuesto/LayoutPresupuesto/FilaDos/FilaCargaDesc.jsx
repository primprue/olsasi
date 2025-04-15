import React from "react";
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import Grid from "@mui/material/Grid";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";
export default function FilaCargaDesc() {
	const { state, setState } = use(PresupPant);

	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });

	};
	return (
		<>
			<Grid container span={{ xs: 8 }}>
				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="DetalleRenglon"
						type="number"
						label="Descripción "
						value={state.DetalleRenglon}
						onChange={handleChange}
						width="500px"
						multiline={true}
					/>
				</Grid>

			</Grid>
		</>
	);
}
