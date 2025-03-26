import React, { useMemo } from "react";

import Grid from "@mui/material/Grid2";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";

export default function FilaModMed() {
	const { state, setState } = use(PresupPant);


	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectedOjal = useMemo(() => state.PresupOB || "hz", [state.PresupOB]);

	// Función para actualizar la opción seleccionada
	const handleOjal = (newOption) => {
		setState({ ...state, PresupOB: newOption });
	};

	const selectDobladillo = useMemo(() => state.PresupCsSs || "cs", [state.PresupCsSs]);

	// Función para actualizar la opción seleccionada
	const handleDobladillo = (newOption) => {
		setState({ ...state, PresupCsSs: newOption });
	};


	const selectLonaNuesAfu = useMemo(() => state.lonanuesafu || "LN", [state.lonanuesafu]);

	// Función para actualizar la opción seleccionada
	const handleLonaNuesAfu = (newOption) => {
		setState({ ...state, lonanuesafu: newOption });
	};


	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });

	};


	return (
		<>
			<Grid container spacing={2} span={{ xs: 12 }}>
				<Grid span={{ xs: 2 }}>
					<TextFieldComun
						id="PresupLargoN"
						type="number"
						label="Largo Nuevo"
						value={state.PresupLargoN}
						onChange={handleChange}
						width="120px"
					/>

				</Grid>

				<Grid span={{ xs: 2 }}>
					<TextFieldComun
						id="PresupAnchoN"
						type="number"
						label="Ancho Nuevo"
						value={state.PresupAnchoN}
						onChange={handleChange}
						width="100px"
					/>

				</Grid>



				<Grid span={{ xs: 2 }}>
					<CustomSwitch value={selectDobladillo} onChange={handleDobladillo} opcion1={'cs'} opcion2={'ss'}
						titulo1={'C/S'} titulo2={'S/S'}
						tithelpertext={'Dobladillo :'} />

				</Grid>
				<Grid span={{ xs: 2 }}>
					<CustomSwitch value={selectedOjal} onChange={handleOjal} opcion1={'hz'} opcion2={'bz'}
						titulo1={'HZ'} titulo2={'BR'}
						tithelpertext={'Ojal :'} />
				</Grid>
				<Grid span={{ xs: 2 }}>
					<CustomSwitch value={selectLonaNuesAfu} onChange={handleLonaNuesAfu} opcion1={'LN'} opcion2={'LA'}
						titulo1={'LN'} titulo2={'LA'}
						tithelpertext={'Nues/Af. :'} />

				</Grid>
			</Grid>
		</>
	);
}

