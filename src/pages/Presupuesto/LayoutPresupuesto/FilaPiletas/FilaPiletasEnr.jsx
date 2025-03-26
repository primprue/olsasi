import React, { useMemo } from "react";
import Grid from "@mui/material/Grid2";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";
export default function FilaPiletasEnr() {
	const { state, setState } = use(PresupPant);

	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectedOjal = useMemo(() => state.PresupOB || "hz", [state.PresupOB]);

	// Función para actualizar la opción seleccionada
	const handleOjal = (newOption) => {
		setState({ ...state, PresupOB: newOption });
	};

	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectedDrenaje = useMemo(() => state.PresupDrenaje || "cd", [state.PresupDrenaje]);

	// Función para actualizar la opción seleccionada
	const handleDrenaje = (newOption) => {
		setState({ ...state, PresupDrenaje: newOption });
	};

	return (
		<>
			<Grid span={{ xs: 2 }}>
				<CustomSwitch value={selectedDrenaje} onChange={handleDrenaje} opcion1={'cd'} opcion2={'sd'}
					titulo1={'C/D'} titulo2={'S/D'}
					tithelpertext={'Drenaje :'} />

			</Grid>
			<Grid span={{ xs: 2 }}>
				<CustomSwitch value={selectedOjal} onChange={handleOjal} opcion1={'hz'} opcion2={'bz'}
					titulo1={'HZ'} titulo2={'BR'}
					tithelpertext={'Ojal :'} />
			</Grid>

		</>
	);
}
