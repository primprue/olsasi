import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

import { clientesleerdescmayigual } from "../../../Tablas/Clientes/ClientesLeerDesc";
import useStyles from "../styles.module.css";

export default function DetCliente() {
	const { state, setState } = useContext(PresupPantContext);
	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};
	async function clientesleerdescrip() {
		const result = await clientesleerdescmayigual(state.ClientesDesc);
		setState({ ...state, clientes: result });
	}

	useEffect(() => {
		clientesleerdescrip();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const textdata = [
		{
			id: "idClientes",
			value: state.idClientes,
			mapeo: (
				<>
					<option></option>
					<option />
					{state.clientes.map((option) => (
						<option key={option.idClientes} value={option.idClientes}>
							{option.ClientesDesc}
						</option>
					))}
				</>
			),
		},
	];

	const classes = useStyles;
	return (
		<>
			<h3>Cliente Presupuesto</h3>
			<TextField
				inputProps={{ maxLength: 45 }}
				size="small"
				variant="outlined"
				id="nomCliente"
				type="text"
				label="Nombre Cliente Ocacional"
				fullWidth
				margin="dense"
				value={state.nomCliente}
				onChange={handleChange}
				className={classes.textField}
			/>

			<label>Cliente Existente</label>
			{textdata.map((data) => (
				<TextField
					key={data.id}
					id={data.id}
					size="small"
					inputProps={{ maxLength: 20 }}
					select
					label={data.label}
					value={data.value}
					onChange={handleChange}
					SelectProps={{ native: true }}
					variant="outlined"
					fullWidth
				>
					{data.mapeo}
				</TextField>
			))}
		</>
	);
}
