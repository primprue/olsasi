import React, { useEffect, useState } from "react";
import { TextField, Button, Dialog, DialogActions } from "@mui/material";
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant.jsx";

import { clientesleerdescmayigual } from "../../../Tablas/Clientes/ClientesLeerDesc";
import { PresupGrabar } from "../../PresupGrabar";
import { PresupImprime } from "../PresupImprime";
import { clientesleercod } from "../../../Tablas/Clientes/ClientesLeerCod";
import PresupDetPieSelec from "./PresupDetPieSelec";
import { PresupPreview } from "../PresupPreview";
import useStyles from "../styles.module.css";
import DetCliente from "./DetCliente";

export default function FilaCuatro(props) {
	const { state, setState } = useContext(PresupPant);
	const [ppreview, setPPreview] = useState({ ppreview: false });
	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};
	const CHARACTER_LIMIT = 200;
	async function clientesleerdescrip() {
		const result = await clientesleerdescmayigual(state.ClientesDesc);
		setState({ ...state, clientes: result });
	}

	useEffect(() => {
		clientesleerdescrip();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function grabarpresupuesto() {
		var ClienteMayMin = state.PresupMnMy;
		var idClienteElegE, nomClienteElegE;
		var descrip = state.DescripPresup;
		var otraCondicion = state.otraCondicion;
		var explicacionPresup = state.ExplicaPresup;

		if (state.idClientes === 0 || state.idClientes === "") {
			idClienteElegE = 0;
			nomClienteElegE = state.nomCliente;
		} else {
			idClienteElegE = state.idClientes;
			const datoscliente = await clientesleercod(idClienteElegE);
			nomClienteElegE = datoscliente[0].ClientesDesc;
		}
		const nroPresupuesto1 = await PresupGrabar(
			props,
			ClienteMayMin,
			nomClienteElegE,
			idClienteElegE,
			explicacionPresup
		);
		setState({ ...state, NroPresupuesto: nroPresupuesto1 });

		PresupImprime(
			props.datos,
			nomClienteElegE,
			otraCondicion,
			props.suma,
			nroPresupuesto1,
			descrip,
			state.condpagoeleg,
			state.PresupMnMy,
			state.labellargo,
			state.labelancho,
			state.dolaressn
		);

		cierrafilacuatro();
	}

	function cierrafilacuatro() {
		props.setOpen({ filacuatro: false });
	}

	const classes = useStyles;
	return (
		<>
			<Dialog fullWidth={true} maxWidth="md" open={props.open}>
				<PresupDetPieSelec></PresupDetPieSelec>
				<TextField
					inputProps={{ maxLength: CHARACTER_LIMIT }}
					size="small"
					variant="outlined"
					id="otraCondicion"
					type="text"
					label="Otra Condición"
					fullWidth
					margin="dense"
					value={state.otraCondicion}
					onChange={handleChange}
					className={classes.textField}
					helperText={`Cantidad de caracteres ${state.otraCondicion.length}/${CHARACTER_LIMIT}`}
				/>

				<DetCliente />
				<PresupPreview
					open={ppreview.ppreview}
					setOpen={setPPreview}
				></PresupPreview>

				<DialogActions>
					<Button onClick={cierrafilacuatro} color="secondary">
						Cancelar
					</Button>
					<Button onClick={grabarpresupuesto} color="primary" autoFocus>
						Graba Presupuesto
					</Button>
					{/* <Button onClick={vepresupuesto} color="primary" autoFocus>
                Ve Presupuesto
            </Button> */}
				</DialogActions>
			</Dialog>
		</>
	);
}
