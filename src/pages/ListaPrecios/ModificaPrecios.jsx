import React, { Component, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import EstiloBoton from "../../Styles/Boton.module.css";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { stkrubroleer } from "../Tablas/StkRubros/StkRubroLeer";
import { stkgrupolee } from "../Tablas/StkGrupos/StkGrupoLee";
import { proveedoresleer } from "../Tablas/Proveedores/ProveedoresLeer";
import { initial_state } from "./Initial_State";
import { ModPrecios } from "./ModPrecios";
export default function ModificaPrecios() {
	const [state, setState] = useState(initial_state);
	const [proveedores, setProveedores] = useState([]);
	const [grupos, setGrupos] = useState([]);
	const [rubros, setRubros] = useState([]);

	const submitModPrecio = () => {
		ModPrecios(
			state.idProveedores,
			state.idStkGrupo,
			state.StkRubroAbr,
			state.Importe,
			state.Porcentaje
		);
	};

	const toggleTipo = (tipo) => {
		setState((prevState) => ({
			...prevState,
			toggle: {
				...prevState.toggle,
				[tipo]: !prevState.toggle[tipo], // Cambia el valor actual
			},
		}));
	};

	const handleChange = (prop) => (event) => {
		setState({ ...state, [prop]: event.target.value });
		toggleTipo(event.target.value);
	};

	async function proveedorleer() {
		const data = await proveedoresleer();
		setProveedores(data);
	}

	async function gruposleer() {
		const data = await stkgrupolee();
		setGrupos(data);
	}

	async function rubrosleer() {
		const data = await stkrubroleer();
		setRubros(data);
	}

	useEffect(() => {
		proveedorleer();
		gruposleer();
		rubrosleer();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<form>
				{/* <Grid container>
					<Grid item xs={4} sm={4} lg={4}></Grid>
					<DialogTitle id="form-dialog-title">Modificar Precio</DialogTitle>
					<Grid item xs={4} sm={4} lg={4}></Grid>
				</Grid> */}
				<Grid container>
					<Grid item xs={3} sm={3} lg={3}>
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="gender"
								name="pgr"
								value={state.value}
								onChange={handleChange("value")}
							>
								<FormControlLabel
									value="proveedor"
									control={<Radio color="primary" />}
									label="Proveedor"
									labelPlacement="start"
								/>
								<FormControlLabel
									value="grupo"
									control={<Radio color="primary" />}
									label="Grupo"
									labelPlacement="start"
								/>
								<FormControlLabel
									value="rubro"
									control={<Radio color="primary" />}
									label="Rubro"
									labelPlacement="start"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item xs={3} sm={3} lg={3}>
						{state.toggle.proveedor && (
							<TextField
								id="idProveedores"
								select={true}
								label="Proveedor"
								SelectProps={{ native: true }}
								onChange={handleChange("idProveedores")}
							>
								<option value="0"></option>
								{proveedores.map((proveedor) => (
									<option key={proveedor.id} value={proveedor.id}>
										{proveedor.ProveedoresDesc}
									</option>
								))}
							</TextField>
						)}
						{state.toggle.grupo && (
							<TextField
								id="idStkGrupo"
								select
								label="Grupo"
								SelectProps={{ native: true }}
								onChange={handleChange("idStkGrupo")}
							>
								<option value="0"></option>
								{grupos.map((grupo) => (
									<option key={grupo.idStkGrupo} value={grupo.idStkGrupo}>
										{grupo.StkGrupoDesc}
									</option>
								))}
							</TextField>
						)}
						{state.toggle.rubro && (
							<TextField
								id="idStkRubro"
								select
								label="Rubro"
								SelectProps={{ native: true }}
								onChange={handleChange("StkRubroAbr")}
							>
								<option value="0"></option>
								{rubros.map((rubro) => (
									<option key={rubro.StkRubroAbr} value={rubro.StkRubroAbr}>
										{rubro.StkRubroDesc}
									</option>
								))}
							</TextField>
						)}
					</Grid>
					<Grid item xs={3} sm={3} lg={3}>
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="ip"
								name="ip"
								value={state.valueIp}
								onChange={handleChange("valueIp")}
							>
								<FormControlLabel
									value="importe"
									control={<Radio color="primary" />}
									label="Importe"
									labelPlacement="start"
								/>
								<FormControlLabel
									value="porcentaje"
									control={<Radio color="primary" />}
									label="Porcentaje"
									labelPlacement="start"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item xs={1} sm={1} lg={1}>
						{state.toggle.importe && (
							<TextField
								margin="dense"
								id="Importe"
								label="Importe"
								type="number"
								fullWidth
								placeholder="Importe"
								value={state.Importe}
								onChange={handleChange("Importe")}
							/>
						)}
						{state.toggle.porcentaje && (
							<TextField
								margin="dense"
								id="Porcentaje"
								label="Porcentaje"
								type="number"
								fullWidth
								placeholder="Porcentaje"
								value={state.Porcentaje}
								onChange={handleChange("Porcentaje")}
							/>
						)}
					</Grid>
					<Grid item xs={1} sm={1} lg={1}></Grid>

					<Button
						className={EstiloBoton.botonabreot}
						onClick={() => submitModPrecio()}
					>
						Enviar
					</Button>
				</Grid>
			</form>
		</div>
	);
}
