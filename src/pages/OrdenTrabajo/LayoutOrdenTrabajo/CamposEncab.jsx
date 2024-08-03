import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import estilos1 from "../../../Styles/CampoDinamico.module.css";

import React from "react";

export function CampoEncab({ arregloencab, nropresup }) {
	const mostrarElementos = arregloencab.map((elemento, index1) => {
		delete elemento.ClientesTipo;
		delete elemento.ClientesContacto;
		delete elemento.ClientesCategoria;
		delete elemento.ClientesObserv1;
		delete elemento.ClientesObserv2;
		delete elemento.ClientesFecha;

		const nombresPropiedades = Object.keys(elemento);
		return (
			<span className={estilos1.contenedordiv} key={index1}>
				<Grid container>
					<Grid item>
						<div key={index1}>
							{nombresPropiedades.map((nombrePropiedad, index) => (
								<TextField
									key={index}
									value={elemento[nombrePropiedad]}
									variant="standard"
									multiline
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{nombrePropiedad.replace("Clientes", "")}
											</InputAdornment>
										),
									}}
								></TextField>
							))}
						</div>
					</Grid>
					<Grid item>
						<TextField
							label="Presup.Nro.:"
							value={nropresup}
							variant="standard"
						></TextField>
					</Grid>
				</Grid>
			</span>
		);
		// }
	});
	return (
		<div>
			<Typography variant="h6" align="center" gutterBottom>
				Datos Cliente
			</Typography>
			{mostrarElementos}
		</div>
	);
}
