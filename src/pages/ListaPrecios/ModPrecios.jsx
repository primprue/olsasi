import React, { Component, useEffect } from "react";
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import "react-table/react-table.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import DialogTitle from "@material-ui/core/DialogTitle";
import CodigoError from "../../../lib/CodigoError";
import Mensajes from "../../../lib/Mensajes";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

class ModPrecios extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stkgrupo: [],
			codigo_grupo: "Valor Inicial",
			idStkTipoProveed: 0,
			StkTipoProveedDesc: "",
			proveedores: [],
			grupos: [],
			rubros: [],
			nuevocodigo: 0,
			open: true,
			Importe: 0, // borrar
			value: "",
			Porcentaje: 0,
			valueIp: "",
			msg_respuesta: "",
			rta: "", // borrar
			controlenvio: 0,
			idProveedores: 0,
			idStkGrupo: 0,
			StkRubroAbr: "",
			importemod: 0,
			porcentmod: 0,
			toggle: {
				proveedor: false,
				grupo: false,
				rubro: false,
				mensaje: false,
				importe: false,
				porcentaje: false,
			},
		};
	}

	ModPrecio = () => {
		const url = IpServidor + "/modprecios/";
		request
			.post(url)
			.set("Content-Type", "application/json")
			.send({
				idProveedores: this.state.idProveedores,
				idStkGrupo: this.state.idStkGrupo,
				StkRubroAbr: this.state.StkRubroAbr,
				importemod: this.state.Importe,
				porcentmod: this.state.Porcentaje,
			})
			.then((res) => {
				const respuesta = JSON.parse(res.text);
				const rta = respuesta.affectedRows !== 0;
				if (rta) {
					this.setState(() => ({
						msg_respuesta: "Cambio Efectuado Correctamente",
					}));
					this.toggle("mensaje");
				} else {
					this.setState(() => ({ msg_respuesta: "No Se Pudo Modificar" }));
					this.toggle("mensaje");
				}
			})
			.then(
				this.setState(() => ({
					idProveedores: 0,
					idStkGrupo: 0,
					StkRubroAbr: "",
					Importe: 0,
					Porcentaje: 0,
				}))
			)
			.catch((err) => CodigoError(err));
	};

	submitModPrecio() {
		this.ModPrecio();
	}

	toggle = (arg) => {
		this.setState((prevState) => ({
			toggle: { [arg]: !prevState.toggle[arg] },
		})); // estado inicial "FALSE" muestra la tabla de "..." en "TRUE" llama al componente <ComponenteParticular>
	};

	toggleTipo = (tipo) => {
		const toggle = { ...this.state.toggle };
		switch (tipo) {
			case "proveedor":
				this.setState(() => ({
					idProveedores: 0,
					idStkGrupo: 0,
					StkRubroAbr: "",
					toggle: { ...toggle, proveedor: true, grupo: false, rubro: false },
				}));
				break;
			case "grupo":
				this.setState(() => ({
					idProveedores: 0,
					idStkGrupo: 0,
					StkRubroAbr: "",
					toggle: {
						...toggle,
						proveedor: false,
						grupo: true,
						rubro: false,
					},
				}));
				break;
			case "rubro":
				this.setState(() => ({
					idProveedores: 0,
					idStkGrupo: 0,
					StkRubroAbr: "",
					toggle: { ...toggle, proveedor: false, grupo: false, rubro: true },
				}));
				break;

			case "importe":
				this.setState(() => ({
					Importe: 0,
					Porcentaje: 0,
					toggle: { ...toggle, importe: true, porcentaje: false },
				}));
				break;
			case "porcentaje":
				this.setState(() => ({
					Importe: 0,
					Porcentaje: 0,
					toggle: {
						...toggle,
						importe: false,
						// porcentaje: !prevState.toggle.porcentaje,
						porcentaje: true,
					},
				}));
				break;
			default:
				break;
		}
	};

	handleChange = (prop) => (event) => {
		this.setState({ [prop]: event.target.value });
	};

	// Leo proveedores y grupos

	proveedoresleer = () => {
		const url = IpServidor + "/proveedoresleer";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const proveedores = JSON.parse(res.text);
				this.setState({ proveedores: proveedores });
			});
	};

	gruposleer = () => {
		const url = IpServidor + "/stkgrupoleer";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const grupos = JSON.parse(res.text);
				this.setState({ grupos: grupos });
			});
	};

	rubrosleer = () => {
		const url = IpServidor + "/stkrubroleer";
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const rubros = JSON.parse(res.text);
				this.setState({ rubros: rubros });
			});
	};

	// UNSAFE_componentDidMount() {
	// 	this.proveedoresleer();
	// 	this.gruposleer();
	// 	this.rubrosleer();
	// }
	componentDidMount() {
		this.proveedoresleer();
		this.gruposleer();
		this.rubrosleer();
	}

	render() {
		return (
			<div>
				{this.state.toggle.mensaje && (
					<Mensajes
						msg={this.state.msg_respuesta}
						toggle={() => this.toggle("mensaje")}
					></Mensajes>
				)}

				<Paper>
					<Grid container>
						<Grid item xs={4} sm={4} lg={4}></Grid>
						<DialogTitle id="form-dialog-title">Modificar Precio</DialogTitle>
						<Grid item xs={4} sm={4} lg={4}></Grid>
					</Grid>

					{/* <Grid container spacing={12}> */}

					<Grid container>
						<Grid item xs={3} sm={3} lg={3}>
							<FormControl component="fieldset">
								<RadioGroup
									aria-label="gender"
									name="pgr"
									value={this.state.value}
									onChange={this.handleChange("value")}
								>
									<FormControlLabel
										value="proveedor"
										control={<Radio color="primary" />}
										label="Proveedor"
										labelPlacement="start"
										onClick={() => this.toggleTipo("proveedor")}
									/>
									<FormControlLabel
										value="grupo"
										control={<Radio color="primary" />}
										label="Grupo"
										labelPlacement="start"
										onClick={() => this.toggleTipo("grupo")}
									/>
									<FormControlLabel
										value="rubro"
										control={<Radio color="primary" />}
										label="Rubro"
										labelPlacement="start"
										onClick={() => this.toggleTipo("rubro")}
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item xs={3} sm={3} lg={3}>
							{this.state.toggle.proveedor && (
								<TextField
									id="idProveedores"
									select={true}
									label="Proveedor"
									SelectProps={{ native: true }}
									onChange={this.handleChange("idProveedores")}
								>
									<option value="0"></option>
									{this.state.proveedores.map((proveedor) => (
										<option
											key={proveedor.idProveedor}
											value={proveedor.idProveedores}
										>
											{proveedor.ProveedoresDesc}
										</option>
									))}
								</TextField>
							)}
							{this.state.toggle.grupo && (
								<TextField
									id="idStkGrupo"
									select
									label="Grupo"
									SelectProps={{ native: true }}
									onChange={this.handleChange("idStkGrupo")}
								>
									<option value="0"></option>
									{this.state.grupos.map((grupo) => (
										<option key={grupo.idStkGrupo} value={grupo.idStkGrupo}>
											{grupo.StkGrupoDesc}
										</option>
									))}
								</TextField>
							)}

							{this.state.toggle.rubro && (
								<TextField
									id="idStkRubro"
									select
									label="Rubro"
									SelectProps={{ native: true }}
									onChange={this.handleChange("StkRubroAbr")}
								>
									<option value="0"></option>
									{this.state.rubros.map((rubro) => (
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
									value={this.state.valueIp}
									onChange={this.handleChange("valueIp")}
								>
									<FormControlLabel
										value="importe"
										control={<Radio color="primary" />}
										label="Importe"
										labelPlacement="start"
										onClick={() => this.toggleTipo("importe")}
									/>
									<FormControlLabel
										value="porcentaje"
										control={<Radio color="primary" />}
										label="Porcentaje"
										labelPlacement="start"
										onClick={() => this.toggleTipo("porcentaje")}
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Grid item xs={1} sm={1} lg={1}>
							{this.state.toggle.importe && (
								<TextField
									margin="dense"
									id="Importe"
									label="Importe"
									type="number"
									fullWidth
									placeholder="Importe"
									value={this.state.Importe}
									onChange={this.handleChange("Importe")}
								/>
							)}
							{this.state.toggle.porcentaje && (
								<TextField
									margin="dense"
									id="Porcentaje"
									label="Porcentaje"
									type="number"
									fullWidth
									placeholder="Porcentaje"
									value={this.state.Porcentaje}
									onChange={this.handleChange("Porcentaje")}
								/>
							)}
						</Grid>
						<Grid item xs={1} sm={1} lg={1}></Grid>

						<Button color="primary" onClick={() => this.submitModPrecio()}>
							Enviar
						</Button>
					</Grid>
				</Paper>
			</div>
		);
	}
}

export default ModPrecios;
