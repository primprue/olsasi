import React, { useMemo } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import estilo from "../../../../Styles/RadioGroup.module.css";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";

export default function FilaConf(props) {
	const { state, setState } = use(PresupPant);

	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectedOption = useMemo(() => state.PresupOB || "hz", [state.PresupOB]);

	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, PresupOB: newOption });
	};


	const selectedOption1 = useMemo(() => state.PresupCsSs || "cs", [state.PresupCsSs]);

	// Función para actualizar la opción seleccionada
	const handleOptionChange1 = (newOption) => {
		setState({ ...state, PresupCsSs: newOption });
	};

	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ marginTop: "3px" }} >
				<Grid span={1}>
					<CustomSwitch value={selectedOption1} onChange={handleOptionChange1} opcion1={'cs'} opcion2={'ss'}
						titulo1={'C/S'} titulo2={'S/S'}
						tithelpertext={'Dobladillo :'} />
				</Grid>
				<Grid span={1}>
					<CustomSwitch value={selectedOption} onChange={handleOptionChange} opcion1={'hz'} opcion2={'bz'}
						titulo1={'HZ'} titulo2={'BR'}
						tithelpertext={'Ojal :'} />

				</Grid>
			</Grid>
		</>
	);
}
