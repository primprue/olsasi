import React from "react";
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import Grid from "@mui/material/Grid";

import TextFieldComunChico from "../../../../components/comppropios/TextFieldComunChico";
export default function FilaDetDesc(props) {
	const { state, setState } = use(PresupPant);

	const { presuptipo } = props;


	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
	};
	return (
		<Grid container spacing={2} alignItems="center">
			{presuptipo !== "CARGA DESCRIPCION" && (
				<>
					<Grid span={{ xs: 3 }}>
						<TextFieldComunChico
							id="DescripPresup"
							label="Descripción"
							value={state.DescripPresup}
							onChange={handleChange}
							width="200px"
							helperText="No imprime medidas"
						/>
					</Grid>
					<Grid span={{ xs: 3 }}>
						<TextFieldComunChico
							id="DetallePresup"
							label="Detalle Presupuesto"
							value={state.DetallePresup}
							onChange={handleChange}
							width="200px"
							helperText="Saca la descripción por defecto"
						/>
					</Grid>
					<Grid span={{ xs: 3 }}>
						<TextFieldComunChico
							id="DetalleRenglon"
							label="Agrega en Renglón"
							value={state.DetalleRenglon}
							onChange={handleChange}
							width="200px"
							helperText="Se agrega a la descripción"
						/>
					</Grid>
				</>
			)}
			<Grid span={{ xs: 3 }}>
				<TextFieldComunChico
					id="ExplicaPresup"
					label="Explicación de Presupuesto"
					value={state.ExplicaPresup}
					onChange={handleChange}
					width="200px"
					helperText="No aparece en el presupuesto"
				/>
			</Grid>
		</Grid>

		// <Grid>
		// 	{presuptipo !== "CARGA DESCRIPCION" && (
		// 		<Grid container size={{ xs: 12 }}>
		// 			<Grid size={4}>
		// 				<TextFieldComunChico
		// 					id="DescripPresup"
		// 					label="Descripción "
		// 					value={state.DescripPresup}
		// 					onChange={handleChange}
		// 					width="200px"
		// 					helperText="No imprime medidas" />
		// 			</Grid>,
		// 			<Grid size={4}>
		// 				<TextFieldComunChico
		// 					id="DetallePresup"
		// 					label="Detalle Presupuesto "
		// 					value={state.DetallePresup}
		// 					onChange={handleChange}
		// 					width="200px"
		// 					helperText="Saca la descripción por defecto" />
		// 			</Grid>,
		// 			<Grid size={4}>
		// 				<TextFieldComunChico
		// 					id="DetalleRenglon"
		// 					label="Agrega en Renglón "
		// 					value={state.DetalleRenglon}
		// 					onChange={handleChange}
		// 					width="200px"
		// 					helperText="Se agrega a la descripción"
		// 				/>
		// 			</Grid>
		// 		</Grid>
		// 	)}
		// 	<Grid size={4}>
		// 		<TextFieldComunChico
		// 			id="ExplicaPresup"
		// 			label="Explicación de Presupuesto "
		// 			value={state.ExplicaPresup}
		// 			onChange={handleChange}
		// 			width="200px"
		// 			helperText="No aparece en el presupuesto"
		// 		/>
		// 	</Grid>
		// </Grid>
	);
}
