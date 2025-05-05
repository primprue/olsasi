import React, { useEffect, useMemo, useRef, useState } from "react";

import Grid from "@mui/material/Grid";
import swal from "sweetalert";

// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";
import { PresupParCalcLee } from "../PresupParCalc/PresupParCalcLee";

export default function FilaAbanico() {
	const { state, setState } = use(PresupPant);

	const paracalular = useRef(false);
	const busparacalular = useRef();

	async function leeparacalcular() {
		const result = await PresupParCalcLee('FajaBrazo');
		busparacalular.current = result
	}
	useEffect(() => {
		leeparacalcular()
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	let fajadebrazo = [];


	if (busparacalular.current !== undefined) {
		if (busparacalular.current.length > 0) {

			paracalular.current = true;
			fajadebrazo = [{
				id: "FajaBrazoEleg",
				label: "Faja para Brazo :",
				value: busparacalular.current[0].value,
				options: busparacalular.current.map((option) => ({
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

	const selectedOption = useMemo(() => state.VolDS || "D", [state.VolDS]);
	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, VolDS: newOption });
	};




	const handleChange = (value, id) => {
		if (id === "LargoBrazo") {
			if (value < 1.26) {
				setState({ ...state, [id]: value });
			} else {
				swal({
					title: "Error",
					text: "No puede ser mayor a 1.26",
					icon: "error",
					button: "OK",
					dangerMode: true,
				});
				return;
			}

		}
		setState({ ...state, [id]: value });
	};


	return (
		<>
			<Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ marginTop: "3px" }} >
				<Grid span={{ xs: 2 }}>
					<TextFieldComun
						id="CantBrazos"
						type="number"
						label="Cant.Brazos : "
						value={state.CantBrazos}
						onChange={handleChange}
						width="150px"
					/>

				</Grid>
				<Grid span={{ xs: 2 }}>
					<TextFieldComun
						id="LargoBrazo"
						type="number"
						label="Largo Brazos : "
						value={state.LargoBrazo}
						onChange={handleChange}
						tooltip={"No mayor a 1.25"}
						width="150px"
					/>

				</Grid>
				<Grid span={{ xs: 2 }}>
					{fajadebrazo.map(({ id, label, value, options }) => (
						<TextFieldSelect
							key={id}
							id={id}
							label={label}
							value={selectedValues[id] ?? value ?? ""}
							onChange={handleSelectChange}
							options={options}
							width="150px"
						/>
					))}

				</Grid>
				<Grid span={{ xs: 2 }}>
					<TextFieldComun
						id="AltoVolado"
						type="number"
						label="Volado en cm : "
						value={state.AltoVolado}
						onChange={handleChange}
						width="150px"

					/>

				</Grid>
				<Grid sx={{ marginTop: "2px" }}>
					<CustomSwitch
						value={selectedOption}
						onChange={handleOptionChange}
						opcion1={'S'}
						opcion2={'D'}
						titulo1={'Simple'}
						titulo2={'Doble'}
						tithelpertext={'Volado : '} />

				</Grid>
			</Grid >
		</>
	);
}
