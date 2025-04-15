import React, { useEffect, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid";

// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import { PresupParCalcLee } from "../PresupParCalc/PresupParCalcLee";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";

export default function FilaComedero() {
	const { state, setState } = use(PresupPant);

	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
	};



	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectedOption = useMemo(() => state.PresupOB || "hz", [state.PresupOB]);

	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, PresupOB: newOption });
	};


	const paracalular = useRef(false);
	const busparacalular = useRef();

	async function leeparacalcular() {
		const result = await PresupParCalcLee('AnchoComedero');
		busparacalular.current = result
	}
	useEffect(() => {
		leeparacalcular()
	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	const [selectedValues, setSelectedValues] = useState({});
	const handleSelectChange = (value, id) => {
		setState({ ...state, [id]: value });
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));

	};


	let anchocom = [];


	if (busparacalular.current !== undefined) {
		if (busparacalular.current.length > 0) {

			paracalular.current = true;
			anchocom = [{
				id: "AnchoComederoEleg",
				label: "Ancho Comedero",
				value: busparacalular.current[0].value,
				options: busparacalular.current.map((option) => ({
					value: option.value,
					label: option.label
				}))
			}];

		}
	}

	return (
		<>
			<Grid container spacing={2}>
				<Grid span={{ xs: 1 }}>
					{paracalular.current &&
						anchocom.map(({ id, label, value, options }, index) => (
							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								value={selectedValues[id] ?? value ?? ''}
								onChange={handleSelectChange}
								options={options}
								width="150px"
							/>
						))}
				</Grid>
				<Grid span={{ xs: 1 }}>
					<TextFieldComun
						id="PresupOjalesC"
						type="number"
						label="Ojales cada, en cm :  "
						value={state.PresupOjalesC}
						onChange={handleChange}
						width="150px"
					/>

				</Grid>
				<Grid span={{ xs: 1 }}>
					<CustomSwitch value={selectedOption} onChange={handleOptionChange} opcion1={'hz'} opcion2={'bz'}
						titulo1={'HZ'} titulo2={'BR'}
						tithelpertext={'Ojal :'} />
				</Grid >

			</Grid>
		</>
	);
}
