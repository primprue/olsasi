import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
// import { stkrubroleelat } from "../../../Tablas/StkRubros/StkRubroLeeLAT";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";
import TildeSiNo from "../../../../components/comppropios/TildeSiNo";
import { stkrubroleelat } from "../../../Tablas/StkRubros/StkRubroLeeLAT";

export default function FilaLateral() {
	const { state, setState } = use(PresupPant);
	const [colocacion, setColocacion] = useState(true);
	const hebillasleidas = useRef(false);
	const hebillas = useRef();
	const carrosleidos = useRef(false);
	const carros = useRef();
	const placaajusleidas = useRef(false);
	const placaajus = useRef();

	async function stkrubroleerlat() {
		const result = await stkrubroleelat();
		hebillas.current = result[0];
		carros.current = result[1];
		placaajus.current = result[2];
		setState({ ...state, stkrubrolat: result });
	}


	let datahebillas = [];

	if (hebillas.current !== undefined) {
		if (hebillas.current.length > 0) {
			hebillasleidas.current = true;
			datahebillas = [{
				id: "tipoheb",
				label: "Hebillas",
				value: hebillas.current[0].StkRubroAbrLAT,
				options: hebillas.current.map((option) => ({
					value: option.StkRubroAbrLAT,
					label: option.StkRubroDescLAT
				}))
			}];

		}
	}

	let datacarros = [];

	if (carros.current !== undefined) {
		if (carros.current.length > 0) {
			carrosleidos.current = true;
			datacarros = [{
				id: "tipocarro",
				label: "Carros",
				value: carros.current[0].StkRubroAbrLAT,
				options: carros.current.map((option) => ({
					value: option.StkRubroAbrLAT,
					label: option.StkRubroDescLAT
				}))
			}];

		}
	}

	let dataplacaajus = [];

	if (placaajus.current !== undefined) {
		if (placaajus.current.length > 0) {
			dataplacaajus = [{
				label: "..",
				value: '..',
			}];
			placaajusleidas.current = true;
			dataplacaajus = [{
				id: "tipoplaca",
				label: "Placa Ajuste",
				value: placaajus.current[0].StkRubroAbrLAT,

				options: placaajus.current.map((option) => ({
					value: option.StkRubroAbrLAT,
					label: option.StkRubroDescLAT
				}))

			}];

		}
	}

	const handleChange = (value, id) => {

		setState({ ...state, [id]: value });
	};

	const handleChecked = (event) => {
		// setColocacion(event);
		setState({ ...state, colocacion: event });
	}


	const [selectedValues, setSelectedValues] = useState({});
	const handleSelectChange = (value, id) => {

		setState({ ...state, [id]: value });
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));

	};

	useEffect(() => {
		if (state.stkrubrolat.length === 0) {
			stkrubroleerlat();
		}
		if (state.stkrubrolat.length > 0) {
			console.log('state.stkrubrolat', state.stkrubrolat)
			setState({
				...state, tipoheb: hebillas.current[0].StkRubroAbrLAT,
				tipocarro: carros.current[0].StkRubroAbrLAT,
				tipoplaca: placaajus.current[0].StkRubroAbrLAT
			});
		}
	}, [state.stkrubrolat]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Grid container spacing={2}>
				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="CantHeb"
						type="number"
						label="Cant.Hebillas"
						value={state.CantHeb}
						onChange={handleChange}
						width="100px"
					/>

				</Grid>
				<Grid span={{ xs: 3 }}>
					{state.CantHeb !== 0 && (
						hebillasleidas.current &&
						datahebillas.map(({ id, label, value, options }, index) => (

							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								value={selectedValues[id] ?? value ?? ''}
								onChange={handleSelectChange}
								options={options}
								width="400px"
								helperText="Incluye placa de ajuste"
							/>
						)))}

				</Grid>
				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="CantCarro"
						type="number"
						label="Cant.Carros"
						value={state.CantCarro}
						onChange={handleChange}
						width="100px"
					/>
				</Grid>
				<Grid span={{ xs: 3 }}>
					{state.CantCarro !== 0 && (
						carrosleidos.current &&
						datacarros.map(({ id, label, value, options }, index) => (
							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								value={selectedValues[id] ?? value ?? ''}
								onChange={handleSelectChange}
								options={options}
								width="400px"
								helperText="Seleccionar tipo carro"
							/>
						)))}
				</Grid>
				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="CantPlaca"
						type="number"
						label="Cant.Placas"
						value={state.CantPlaca}
						onChange={handleChange}
						width="100px"
					/>
				</Grid>
				<Grid span={{ xs: 3 }}>
					{state.CantCarro !== 0 && (
						placaajusleidas.current &&
						dataplacaajus.map(({ id, label, value, options }, index) => (
							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								value={selectedValues[id] ?? value ?? ''}
								onChange={handleSelectChange}
								options={options}
								width="400px"
								helperText="Seleccionar placa ajuste"
							/>
						)))}

				</Grid>
				<Grid container padding={4}>
					<TildeSiNo
						checked={colocacion}
						onChange={handleChecked}
						name="checkedColocacion"
						label="Colocación?"
						id="colocacion"
					/>

				</Grid>
			</Grid>

		</>
	);
}

