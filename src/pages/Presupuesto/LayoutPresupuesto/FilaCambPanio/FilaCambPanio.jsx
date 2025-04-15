import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";
export default function FilaCambPanio(props) {
	const { state, setState } = use(PresupPant);


	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectLNLA = useMemo(() => state.PreuspLNLF || "LN", [state.PreuspLNLF]);

	// Función para actualizar la opción seleccionada
	const handleOptionChangeLNLA = (newOption) => {
		setState({ ...state, PreuspLNLF: newOption });
	};
	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectOjal = useMemo(() => state.PresupOB || "hz", [state.PresupOB]);

	// Función para actualizar la opción seleccionada
	const handleOptionChangeOjal = (newOption) => {
		setState({ ...state, PresupOB: newOption });
	};


	return (
		<>
			<Grid span={{ xs: 4 }}>
				<CustomSwitch
					value={selectLNLA}
					onChange={handleOptionChangeLNLA}
					opcion1={'LN'}
					opcion2={'LA'}
					titulo1={'LN'}
					titulo2={'LA.'}
					tithelpertext={'Lona : '} />
			</Grid>
			<Grid span={{ xs: 4 }}>
				<CustomSwitch
					value={selectOjal}
					onChange={handleOptionChangeOjal}
					opcion1={'hz'}
					opcion2={'br'}
					titulo1={'HZ'}
					titulo2={'BR.'}
					tithelpertext={'Ojales : '} />
			</Grid>
		</>
	);
}
