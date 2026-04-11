import { useEffect, useMemo, useState } from "react";
import { TextField, Button, Dialog, DialogActions, Grid } from "@mui/material";
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant.jsx";
import { clientesleerdescmayigual } from "../../../Tablas/Clientes/ClientesLeerDesc";
import { PresupGrabar } from "../../PresupGrabar";
import { clientesleercod } from "../../../Tablas/Clientes/ClientesLeerCod";
import PresupDetPieSelec from "./PresupDetPieSelec";
import useStyles from "../styles.module.css";
import DetCliente from "./DetCliente";
import estiloboton from "../../../../Styles/Boton.module.css";
import { GeneradorPresup } from "../GeneradorPresup";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch.jsx";
import { EnvioWa } from "../../../ComunicacionExt/EnvioWa.jsx";

export default function FilaCuatro(props) {
	const { state, setState } = useContext(PresupPant);
	const [ppreview, setPPreview] = useState({ ppreview: false });
	const [datosParaEnvio, setDatosParaEnvio] = useState({});
	const selectedOption = useMemo(() => state.VPGVI || "Vista Previa", [state.VPGVI]);
	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		// setState({ ...state, mecanismo: newOption });
		setState({ ...state, VPGVI: newOption });

	};

	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};
	const CHARACTER_LIMIT = 300;
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

		let condicioneseleg = [];
		let operador = ''
		let tipoleygral = ''

		state.condpagoeleg.forEach(element => {
			// IMPORTANTE: Accedemos a element[0] porque parece que cada item es un array de un objeto
			const leyenda = element[0].PresupDetPieLeyenda;
			if (leyenda.includes('Operador')) {
				operador = leyenda;
			}
			if (leyenda.includes('seña')) {
				tipoleygral = leyenda;
			}
			if (!leyenda.includes('Operador')) {
				condicioneseleg.push(leyenda);
			}
		});
		let totalpresupformateado = props.suma.toLocaleString("es-AR", {
			style: "currency",
			currency: "ARS",
		});
		const parterepetidaleyenda = `hasta 5 días posteriores a la fecha de entrega establecida.
								Pasados los 5 días, SE ACTUALIZARÁ A LA FECHA DE RETIRO.
								Si la mercadería no se retira dentro de los 60 días posteriores a la fecha establecida para la entrega,
								se considerará abandonada y nuestra empresa dispondrá de ella, incluso para su destrucción`

		let leyendageneral = ''
		if (tipoleygral === '') {
			leyendageneral = `El precio acordado, se mantiene, ${parterepetidaleyenda}`
		}
		else {
			leyendageneral = `La seña, confirma el precio acordado ${parterepetidaleyenda}, 
								tomando la seña como indemnización del trabajo realizado`
		}
		let leyendatanque = ''
		props.datos.forEach(element => {
			element.dcalculo.forEach(element1 => {
				if (element1.tipopresup === 'BOLSON PARA TANQUE') {
					leyendatanque = `	El bolsón cotizado es una lámina impermeable, no es, un contenedor de líquido.
                Por tal motivo, debe quedar apoyado sobre una superficie lisa que no tenga porosidad o rugosidad ya que ese tipo de superficie lo perforaría. 
                 El agua en el fondo del tanque, una vez lleno, ejerce un peso mayor en la parte más profunda (piso y pared), y van disminuyendo 
                los kilos de presión hacia la parte superior.`
				}
			})
		})
		const datosParaEnvio = {
			ClienteMayMin: state.PresupMnMy, // o de donde vengan
			nomClienteElegE: nomClienteElegE,
			idClienteElegE: idClienteElegE,
			condiciones: condicioneseleg,
			otracondicion: otraCondicion,
			operador: operador,
			tipoleygral: tipoleygral,
			explicacionPresup: state.ExplicaPresup,
			productos: props.datos, // El array de productos
			leyenda: leyendageneral,
			leyendatanque: leyendatanque,
			totalpresup: totalpresupformateado,
			totalparacontrolar: props.suma,
			nroPresupuesto: state.NroPresupuesto
		};

		if (state.VPGVI === 'VistaPrevia') {
			// || state.VPGVI === 'VistaImpres'
			let nroPresupuesto1 = 0
			GeneradorPresup(datosParaEnvio, nroPresupuesto1);
		}
		else if (state.VPGVI === 'Grabar') {
			const nroPresupuesto1 = await PresupGrabar(
				props,
				ClienteMayMin,
				nomClienteElegE,
				idClienteElegE,
				explicacionPresup
			);
			setState({ ...state, NroPresupuesto: nroPresupuesto1 });
			if (state.NroPresupuesto1 !== 0) {
				GeneradorPresup(datosParaEnvio, nroPresupuesto1);
			}
			// setDatosParaEnvio(datosParaEnvio1);
		}
		// cierrafilacuatro();
	}


	// useEffect(() => {
	// 	if (state.NroPresupuesto !== 0) {
	// 		GeneradorPresup(datosParaEnvio);
	// 	}
	// }, [state.NroPresupuesto]); // Se ejecuta cada vez que NroPresupuesto cambia


	function cierrafilacuatro() {
		props.setOpen({ filacuatro: false });
	}

	async function mandawa() {
		console.log("mando")
		EnvioWa();
	}
	const classes = useStyles;
	return (
		<>
			<Dialog fullWidth={true} maxWidth="md" open={props.open}>
				<PresupDetPieSelec></PresupDetPieSelec>
				<TextField
					input={{ maxLength: CHARACTER_LIMIT }}
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


				<DialogActions>
					<Grid span={{ xs: 6 }}>
						<CustomSwitch
							value={selectedOption}
							onChange={handleOptionChange}
							opcion1={'VistaPrevia'}
							opcion2={'Grabar'}
							titulo1={'Vista Previa'}
							titulo2={'Grabar Presupuesto'}
							tithelpertext={'Qué querés hacer?  Después de seleccionar, hacer clic en OK'}
							ancho="250px"

						/>
						<Button className={estiloboton.botoncerrar} onClick={cierrafilacuatro}>
							Cerrar
						</Button>
						<Button className={estiloboton.botonok} onClick={grabarpresupuesto}>
							OK
						</Button>

					</Grid>


				</DialogActions>
			</Dialog>
		</>
	);
}
