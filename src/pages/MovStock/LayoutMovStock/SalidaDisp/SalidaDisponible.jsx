import React, { useState, useRef, useMemo, useEffect } from "react";
import Estilos from "../Ingreso/Ingreso.module.css";
import { Card, CardContent, Button, Grid } from "@mui/material";
// Context
import { use } from "react";
import { MovStockPantContext } from "../../MovStockPant";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";
import leePresupConfTipoLeeAnexo from "../../../Presupuesto/leePresupConfTipoLeeAnexo";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";

export default function SalidaDisponible({ onClick, ...other }) {
	const { state, setState } = use(MovStockPantContext);
	const anexo = "N";

	const [cantidad, setCantidad] = useState(1);
	const [largo, setLargo] = useState(0);
	const [ancho, setAncho] = useState(0);
	// const [cliente, setCliente] = useState('');
	const confeccioneleg = useRef(null);
	const textInput = useRef(null);
	const textInput1 = useRef(null);
	const textInput2 = useRef(null);
	const textInput3 = useRef(null);
	const textInput4 = useRef(null);
	const [tipopresupleidos, setTipopresupleidos] = useState();
	// let telaadescontar = 0

	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
		if (id === "cantidad") {
			setCantidad(value);
		}
		if (id === "largo") {
			setLargo(value);
		}
		if (id === "ancho") {
			setAncho(value);
		}
		if (id === "cliente") {
			// setCliente(value);
			setState({ ...state, clienteorden: value });
		}
	};
	const telaadescontar = useMemo(() => {
		if (!state.selectRow || largo === 0) return 0;
		let maslargo = 0.00;
		let masancho = 0.00;

		switch (confeccioneleg.current) {
			case "DESTAPA FACIL":
			case "LONAS ENROLLABLES":
				masancho = 0.20;
				break;
			case "CONFECCIONADA":
			case "ABOLINADA":
			case "PILETAS C/SOGA ELASTICA":
				masancho = 0.08;
				maslargo = 0.08;
				break;
			case "PONCHO DE RIEGO":
			case "LATERAL CORREDIZO":
			case "PILETA ENROLLABLE":
			case "PILETA CAÑOS ALUMINIO":
			case "TOLDO BARRACUADRA":
				masancho = 0.08;
				maslargo = 0.40;
				break;
			case "C/FAJAS EN PERIMETRO":
				masancho = 0.12;
				maslargo = 0.12;
				break;
		}
		let resultado = 0;

		if ((masancho > 0) && (maslargo > 0)) {

			const largocdob = largo * 1 + maslargo;
			let pañosenbruto = Math.trunc(cantidad * largocdob / state.selectRow.StkRubroAncho);
			const decimalpaños = (cantidad * largocdob / state.selectRow.StkRubroAncho) - pañosenbruto;

			if (decimalpaños > 0.5) {
				pañosenbruto++;
			} else {
				pañosenbruto += 0.5;
			}

			resultado = (pañosenbruto * (ancho * 1 + masancho)).toFixed(2);
		}
		else {
			resultado = largo * 1 * ancho * 1 * cantidad
		}
		return resultado;
	}, [cantidad, largo, ancho, confeccioneleg.current, state.selectRow]);

	async function conftipoleer() {
		const result = await leePresupConfTipoLeeAnexo(anexo, "PAE");
		setTipopresupleidos(result);
	}


	useEffect(() => {
		if (state.selectRow) {
			conftipoleer();
		}
	}, []);


	let textdatatp = [];

	if (tipopresupleidos !== undefined) {
		textdatatp = [{
			id: "TipoConfeccion",
			label: "Confección",
			value: tipopresupleidos[0].StkRubroAbr,
			options: tipopresupleidos.map((option) => ({
				value: option.NroConfTipo,
				label: option.PresupConfTipoDesc
			}))
		}];
	}

	const [selectedValues, setSelectedValues] = useState({});
	const handleSelectChange = (value, id, options) => {
		confeccioneleg.current = options;
		setState({ ...state, [id]: value });
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));

	};

	return (
		<div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>

			{state.selectRow &&
				<Card>
					<CardContent className={Estilos.card1}>
						<Grid container>
							El Material elegido para descontar de disponible es :<br></br>
							{state.selectRow.StkRubroDesc}
							{" => "}
							{state.selectRow.StkItemsDesc}
						</Grid>

						<div style={{ marginBottom: '8px' }}>
							{textdatatp.length > 0 &&
								textdatatp.map(({ id, label, value, options }, index) => (
									<TextFieldSelect
										key={index}
										id={id}
										label={label}
										value={selectedValues[id] ?? value ?? ''}
										onChange={handleSelectChange}
										options={options}
										width="400px"
									/>
								))}
						</div>
						<div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
							<TextFieldComun
								inputRef={textInput}
								id="cantidad"
								size="small"
								type="number"
								label="Cantidad"
								value={cantidad}
								onChange={handleChange}
								width="100px"
								autoFocus
								onKeyDown={(e1) => {
									if (e1.key === "Enter") {
										setTimeout(() => {
											textInput1.current.focus();
										}, 100);
									}
								}}
							/>

							<TextFieldComun
								inputRef={textInput1}
								size="small"
								type="number"
								id="largo"
								width="100px"
								label="Largo"
								onChange={handleChange}
								value={largo}
								onKeyDown={(e2) => {
									if (e2.key === "Enter") {
										setTimeout(() => {
											textInput2.current.focus();
										}, 100);
									}
								}}
							/>

							<TextFieldComun
								inputRef={textInput2}
								size="small"
								type="number"
								id="ancho"
								width="100px"
								label="Ancho"
								onChange={handleChange}
								value={ancho}
								onKeyDown={(e2) => {
									if (e2.key === "Enter") {
										setTimeout(() => {
											textInput3.current.focus();
										}, 100);
									}
								}}
							/>

							<TextFieldComun
								inputRef={textInput3}
								size="small"
								type="string"
								id="cliente"
								width="100px"
								label="Cliente"
								onChange={handleChange}
								value={state.clienteorden}
								onKeyDown={(e2) => {
									if (e2.key === "Enter") {
										setTimeout(() => {
											textInput4.current.focus();
										}, 100);
									}
								}}
							/>
						</div>

						<Button
							onClick={(event) => {
								onClick(telaadescontar, cantidad, largo, ancho);
							}}
							ref={textInput4}
						>
							TOTAL A DESCONTAR :{telaadescontar}
						</Button>

					</CardContent>
				</Card>
			}
		</div >

		// </div >
	);
}
// export default SalidaDisponible;


{/* <div style={{ marginBottom: '8px' }}>
							{
								tipopresupleidos.current &&
								textdatatp.map(({ id, label, value, options }, index) => (
									<TextFieldSelect
										key={index}
										id={id}
										label={label}
										value={selectedValues[id] ?? value ?? ''}
										onChange={handleSelectChange}
										options={options}
										width="400px"
									/>
								))}
						</div> */}

// const textdatatp = useMemo(() => {
// 	if (state.tipopresupleidos === undefined) return [];
// 	console.log('return ', state.tipopresupleidos)
// 	return [{
// 		id: "TipoConfeccion",
// 		label: 'Confección',
// 		value: state.tipopresupleidos[0].StkRubroAbr,
// 		options: state.tipopresupleidos.map((option) => ({
// 			value: option.NroConfTipo,
// 			label: option.PresupConfTipoDesc
// 		}))
// 	}];
// }, [state.selectRow, state.tipopresupleidos]);