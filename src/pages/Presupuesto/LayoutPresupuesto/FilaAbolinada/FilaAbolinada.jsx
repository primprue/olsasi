import React, { useMemo } from "react";


import Grid from "@mui/material/Grid2";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";
export default function FilaAbolinada(props) {
	const { state, setState } = use(PresupPant);
	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectedOption = useMemo(() => state.PresupOB || "hz", [state.PresupOB]);

	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, PresupOB: newOption });
	};


	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
	};

	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ marginTop: "3px" }} >
				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="PresupOjalesC"
						type="number"
						label="Ojales cada, en cm :  "
						value={state.PresupOjalesC}
						onChange={handleChange}
						width="100px"
					/>

				</Grid>
				<Grid span={{ xs: 1 }}>
					<CustomSwitch value={selectedOption} onChange={handleOptionChange} opcion1={'hz'} opcion2={'bz'}
						titulo1={'HZ'} titulo2={'BR'}
						tithelpertext={'Ojal :'} />
				</Grid >
			</Grid >
		</>
	);
}
