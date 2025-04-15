import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "../styles.module.css";
import estilo from "../../../../Styles/TextFieldSelect.module.css";
import estiloI from "../../../../Styles/RadioGroup.module.css";
import estiloII from "../../../../Styles/TextField.module.css";
import { stkrubroleetbr } from "../../../Tablas/StkRubros/StkRubroLeeTBR";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";

export default function FilaToldosExt(props) {
	const { state, setState } = use(PresupPant);
	// const [mecanismo, setMecanismo] = React.useState("Manual");

	const selectedOption = useMemo(() => state.mecanismo || "Manual", [state.mecanismo]);
	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, mecanismo: newOption });
	};
	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
	};
	// const handleChange = (event) => {
	// 	const id = event.target.id;
	// 	setState({ ...state, [id]: event.target.value });
	// };


	const stkrubrotbr = useRef(false);
	const busstkrubrotbr = useRef();
	async function stkrubroleertbr() {
		const result = await stkrubroleetbr();
		busstkrubrotbr.current = result
		setState({ ...state, stkrubrotbr: result })
	}
	// async function stkrubroleertbr() {
	// 	const result = await stkrubroleetbr();

	// 	setState({ ...state, stkrubrotbr: result });
	// }

	useEffect(() => {
		if (state.stkrubrotbr.length === 0) {
			stkrubroleertbr();
		}
		if (state.stkrubrotbr.length > 0) {
			setState({
				...state, StkRubroAbrTBR: busstkrubrotbr.current[0].StkRubroAbrTBR

			});
		}

	}, [state.stkrubrotbr]); // eslint-disable-line react-hooks/exhaustive-deps


	let tamtoldo = [];

	if (busstkrubrotbr.current !== undefined) {
		if (busstkrubrotbr.current.length > 0) {
			stkrubrotbr.current = true;
			tamtoldo = [{
				id: "StkRubroAbrTBR",
				label: "Tamaño Toldo",
				value: busstkrubrotbr.current[0].StkRubroAbrTBR,
				options: busstkrubrotbr.current.map((option) => ({
					value: option.StkRubroAbrTBR,
					label: option.StkRubroDescTBR
				}))
			}];

		}
	}

	// let textdata = [];

	// if (stkrubrosleidos.current !== undefined) {
	// 	if (stkrubrosleidos.current.length > 0) {
	// 		rubrosleidos.current = true;
	// 		textdata = [{
	// 			id: "StkRubroAbr",
	// 			label: "Rubro",
	// 			value: stkrubrosleidos.current[0].StkRubroAbr,
	// 			options: stkrubrosleidos.current.map((option) => ({
	// 				value: option.StkRubroAbr,
	// 				label: option.StkRubroDesc
	// 			}))
	// 		}];

	// 	}
	// }





	const [selectedValues, setSelectedValues] = useState({});
	const handleSelectChange = (value, id) => {
		setState({ ...state, [id]: value });
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));

	};
	return (
		<>
			<Grid container spacing={2}>
				<Grid span={{ xs: 3 }}>
					<CustomSwitch
						value={selectedOption}
						onChange={handleOptionChange}
						opcion1={'Manual'}
						opcion2={'MotorCT'}
						opcion3={'MotorCC'}
						titulo1={'Manual'}
						titulo2={'Motor c/Tecla'}
						titulo3={'Motor c/control'}
						tithelpertext={'Movido por :'}
						ancho="100px"

					/>

				</Grid>
				<Grid span={{ xs: 3 }}>
					{stkrubrotbr.current === true &&
						(tamtoldo.map(({ id, label, value, options }, index) => (

							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								value={selectedValues[id] ?? value ?? ''}
								onChange={handleSelectChange}
								options={options}
								width="400px"
								helperText="Medida Toldo"
							/>
						)))}
				</Grid>
				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="AltoVolado"
						type="number"
						label="Volado en cm : "
						value={state.AltoVolado}
						onChange={handleChange}
						width="150px"

					/>
					{/* <TextField
						input={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="AltoVolado"
						type="number"
						label="Volado en cm :  "
						fullWidth
						margin="dense"
						value={state.AltoVolado}
						onChange={handleChange}
						className={estiloII.textfcantidad}
					/> */}
				</Grid>
			</Grid>
		</>
	);
}
{/* <RadioGroup
						className={estiloI.radioGroup1}
						row
						size="small"
						name="Mecanismo"
						label="Movido por :"
						value={mecanismo}
						onChange={tipomecanismo}
						margin="dense"
					>
						<FormControlLabel
							size="small"
							value="Manual"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="Manual"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
						<FormControlLabel
							size="small"
							value="MotorCT"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="Motor c/Tecla"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
						<FormControlLabel
							size="small"
							value="MotorCC"
							control={
								<Radio
									classes={{
										root: estiloI.radio1,
										checked: estiloI.radioChecked1,
									}}
								/>
							}
							className={estiloI.formControlLabel1}
							label="Motor c/control"
							labelPlacement="top"
							disabled={props.disable}
							margin="dense"
						/>
					</RadioGroup>
			{tamtoldo.map((data) => (
						<TextField
							id={data.id}
							key={data.id}
							size="small"
							select
							label={data.label}
							margin="dense"
							value={data.value}
							onChange={handleChange}
							className={estilo.selectField}
							InputLabelProps={{
								className: estilo.selectLabel,
							}}
							SelectProps={{
								native: true,
								className: estilo.menuItem,
							}}
							variant="outlined"
							helperText="Medida Toldo"
						>
							{data.mapeo}
						</TextField>
					))}		
					
					*/}

// const tipomecanismo = (event) => {
// 	setMecanismo(event.target.value);
// 	setState({ ...state, TipoMecanismo: event.target.value });
// };

// useEffect(() => {
// 	if (state.stkrubrotbr.length === 0) {
// 		stkrubroleertbr();
// 	}
// }, [state.stkrubrotbr]); // eslint-disable-line react-hooks/exhaustive-deps

//stkrubroleecodgrupored leer los rubros de los accesorios de toldo  grupo 6
// const tamtoldo = [
// 	{
// 		id: "StkRubroAbrTBR",
// 		label: "Tamaño Toldo",
// 		value: state.StkRubroAbrTBR,
// 		mapeo: (
// 			<>
// 				<option></option>
// 				{state.stkrubrotbr.map((option) => (
// 					<option key={option.StkRubroAbrTBR} value={option.StkRubroAbrTBR}>
// 						{option.StkRubroDescTBR}
// 					</option>
// 				))}
// 			</>
// 		),
// 	},
// ];