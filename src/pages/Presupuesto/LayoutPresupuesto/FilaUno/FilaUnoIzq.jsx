import React, { useEffect } from "react";
import { Grid, TextField } from "@mui/material";

import leePresupConfTipoLeerDesc from "../../leePresupConfTipoLeerDesc";
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo";
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaUnoIzq() {
	const { state, setState } = useContext(PresupPantContext);
	var anexo = "N";
	const handleChange = (event) => {
		var descripcion = event.target.value;
		setState({ ...state, PresupConfTipoDesc: event.target.value });
		leerdesc(descripcion);
	};

	async function leerdesc(descripcion) {
		const result = await leePresupConfTipoLeerDesc(descripcion);

		setState({ ...state, DatosPresupEleg: result });
	}

	async function conftipoleer(anexo, prodelab) {
		setState({ ...state, DescripPresup: "" });
		const result = await leePresupConfTipoLeeAnexo(anexo, prodelab);
		setState({ ...state, tipopresup: result });
	}

	useEffect(() => {
		setState({ ...state, DescripPresup: "" });
		if (state.tipopresup.length === 0) {
			conftipoleer(anexo, state.PresupProducto);
		}
	}, [state.tipopresup]); // eslint-disable-line react-hooks/exhaustive-deps
	useEffect(() => {
		conftipoleer(anexo, state.PresupProducto);
	}, [state.PresupProducto]); //  eslint-disable-line react-hooks/exhaustive-deps

	const textdata = [
		{
			id: "TipoConfeccion",
			label: "Confección",
			value: state.NroConfTipo,
			mapeo: (
				<>
					<option></option>
					{state.tipopresup.map((option) => (
						<option key={option.NroConfTipo} value={option.PresupConfTipoDesc}>
							{option.PresupConfTipoDesc}
						</option>
					))}
				</>
			),
		},
	];
	return (
		<>
			<Grid item>
				{textdata.map((data) => (
					<TextField
						id={data.id}
						key={data.id}
						size="small"
						select
						label={data.label}
						margin="dense"
						value={data.value}
						onChange={handleChange}
						SelectProps={{ native: true }}
						variant="outlined"
					>
						{data.mapeo}
					</TextField>
				))}
			</Grid>
		</>
	);
}
