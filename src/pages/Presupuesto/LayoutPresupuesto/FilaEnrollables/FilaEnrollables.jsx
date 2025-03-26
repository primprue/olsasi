import React, { useMemo, useState } from "react";
import {
	TextField,

	Radio,
	RadioGroup,
	FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import estiloI from "../../../../Styles/RadioGroup.module.css";
import estiloII from "../../../../Styles/TextField.module.css";

// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";

export default function FilaEnrollables() {
	const { state, setState } = use(PresupPant);


	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
	};

	const selectedOption = useMemo(() => state.TamCristal || "1.35", [state.TamCristal]);
	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, TamCristal: newOption });
	};

	const selectedOption1 = useMemo(() => state.TamFaja || "2P", [state.TamFaja]);
	// Función para actualizar la opción seleccionada
	const handleOptionChange1 = (newOption) => {
		setState({ ...state, TamFaja: newOption });
	};

	return (
		<>
			<Grid container spacing={2} span={{ xs: 8 }}>
				<Grid span={{ xs: 4 }}>
					<Grid sx={{ marginTop: "2px" }}>
						<CustomSwitch
							value={selectedOption}
							onChange={handleOptionChange}
							opcion1={'PVC05'}
							opcion2={'PVC06'}
							opcion3={'NOPVC'}
							titulo1={'Cristal 1.35'}
							titulo2={'Cristal 1.80'}
							titulo3={'Cristal s/cristal'}
							tithelpertext={'Cristal : '} />

					</Grid>
				</Grid>
				<Grid span={{ xs: 2 }}>
					<Grid sx={{ marginTop: "2px" }}>
						<CustomSwitch
							value={selectedOption1}
							onChange={handleOptionChange1}
							opcion1={'2P'}
							opcion2={'25P'}
							titulo1={'2"'}
							titulo2={'2"y 1/2'}
							tithelpertext={'Faja : '} />

					</Grid>

				</Grid>

				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="AltoVolado"
						type="number"
						label="Volado en cm :  "
						value={state.AltoVolado}
						onChange={handleChange}
						width="150px"
					/>
				</Grid>

				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="SobranteMarco"
						type="number"
						label="Marco en cm : "
						value={state.SobranteMarco}
						onChange={handleChange}
						width="150px"
					/>
				</Grid>
			</Grid>
		</>
	);
}
