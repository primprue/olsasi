import React from "react";
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import Grid from "@mui/material/Grid";
import TextFieldMultilinea from "../../../../components/comppropios/TextFieldMultilinea";
export default function FilaCargaDesc() {
	const { state, setState } = use(PresupPant);

	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
	};
	return (
		<>
			<Grid container span={{ xs: 8 }}>
				{/* <Grid span={{ xs: 1 }}> */}
				<TextFieldMultilinea
					id="DetallePresup"
					type="text"
					label="Descripción "
					value={state.DetallePresup}
					onChange={handleChange}
					width="500px"
					limite={500}
					multiline={true}
				/>
				{/* </Grid> */}

			</Grid>
		</>
	);
}
