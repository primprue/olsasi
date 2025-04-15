import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";

// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";
import { PresupParCalcLee } from "../PresupParCalc/PresupParCalcLee";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";

export default function FilaTanques() {
	const { state, setState } = use(PresupPant);

	const tipomedida = useRef(false);
	const bustipomedida = useRef();

	const termborde = useRef(false);
	const bustermborde = useRef();

	async function leeparacalcular() {
		var result = await PresupParCalcLee('TipoMedida');
		bustipomedida.current = result
		result = await PresupParCalcLee('TermBorde');
		bustermborde.current = result
	}
	useEffect(() => {
		leeparacalcular()
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	let tipomedidatanque = [];

	if (bustipomedida.current !== undefined) {
		if (bustipomedida.current.length > 0) {
			tipomedida.current = true;
			tipomedidatanque = [{
				id: "TipoMedidaEleg",
				label: "Medida de :",
				value: bustipomedida.current[0].value,
				options: bustipomedida.current.map((option) => ({
					value: option.value,
					label: option.label
				}))
			}];

		}
	}


	let terminacionborde = [];

	if (bustermborde.current !== undefined) {
		if (bustermborde.current.length > 0) {
			termborde.current = true;
			terminacionborde = [{
				id: "TermBordeEleg",
				label: "Terminación :",
				value: bustermborde.current[0].value,
				options: bustermborde.current.map((option) => ({
					value: option.value,
					label: option.label
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
	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
	};

	return (
		<>
			<Grid container spacing={2}>
				{/* <Grid > */}
				<Grid span={{ xs: 2 }}>
					{tipomedida.current === true &&
						(
							tipomedidatanque.map(({ id, label, value, options }) => (
								<TextFieldSelect
									key={id}
									id={id}
									label={label}
									value={selectedValues[id] ?? value ?? ""}
									onChange={handleSelectChange}
									options={options}
									width="200px"
									helperText="Qué medida tenemos?"
								/>
							))
						)}


				</Grid>

				<Grid span={{ xs: 2 }}>
					{termborde.current === true &&

						(
							terminacionborde.map(({ id, label, value, options }) => (
								<TextFieldSelect
									key={id}
									id={id}
									label={label}
									value={selectedValues[id] ?? value ?? ""}
									onChange={handleSelectChange}
									options={options}
									width="230px"
									helperText="Cómo termina el Bolsón"
								/>
							))
						)}

				</Grid>
				<Grid span={{ xs: 2 }}>
					<TextFieldComun
						id="AnchoPared"
						type="number"
						label="Pared en cm :  "
						value={state.AnchoPared}
						onChange={handleChange}
						helperText="Si tiene pared"
						width="120px"
					/>

				</Grid>

				<Grid span={{ xs: 2 }}>
					<TextFieldComun
						id="Medida"
						type="number"
						label="Medida/Cant."
						value={state.Medida}
						onChange={handleChange}
						helperText="Med./Cant. chapas"
						width="150px"
					/>

				</Grid>
				<Grid span={{ xs: 2 }}>
					<TextFieldComun
						id="Alto"
						type="number"
						label="Alto"
						value={state.Alto}
						onChange={handleChange}
						helperText="Altura del tanque"
						width="150px"
					/>

				</Grid>
			</Grid>
		</>
	);
}
