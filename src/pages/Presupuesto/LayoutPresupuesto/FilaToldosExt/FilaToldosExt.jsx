import React, { useEffect, useMemo, useRef, useState } from "react";

import Grid from "@mui/material/Grid";

import { stkrubroleetbr } from "../../../Tablas/StkRubros/StkRubroLeeTBR";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";

export default function FilaToldosExt(props) {
	const { state, setState } = use(PresupPant);

	const selectedOption = useMemo(() => state.TipoMecanismo || "Manual", [state.TipoMecanismo]);
	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, TipoMecanismo: newOption });
	};
	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
	};


	const stkrubrotbr = useRef(false);
	const busstkrubrotbr = useRef();
	async function stkrubroleertbr() {
		const result = await stkrubroleetbr();
		busstkrubrotbr.current = result
		setState({ ...state, stkrubrotbr: result })
	}

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
				</Grid>
			</Grid>
		</>
	);
}
