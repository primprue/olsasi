import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { stkrubroleer } from "../Tablas/StkRubros/StkRubroLeer";
// import { stkgrupolee } from "../Tablas/StkGrupos/StkGrupoLee";
import { DatosLeer } from '../../components/DatosLeer';
import { Proveedoresleertipo26 } from "../Tablas/Proveedores/Proveedoresleertipo26";
import { initial_state } from "./Initial_State";
import TextFieldSelect from '../../components/comppropios/TextFieldSelect';
import CustomSwitch from '../../components/comppropios/CustomSwitch';
import TextFieldComun from '../../components/comppropios/TextFieldComun';
import EstiloBoton from "../../Styles/Boton.module.css";
import { Button, Grid } from '@mui/material';
import { ModPrecios } from "./ModPrecios";
import formdatag from "../Tablas/StkGrupos/formdata.js";
import formdatar from "../Tablas/StkRubros/formdata.js";
export default function ModificaPrecios() {
	const [opcionselecPGR, setOpcionSelecPGR] = useState('');
	const [opcionImpPes, setOpcionImpPes] = useState('');
	const [state, setState] = useState(initial_state);
	const [proveedores, setProveedores] = useState([]);
	const [grupos, setGrupos] = useState([]);
	const [rubros, setRubros] = useState([]);

	const submitModPrecio = () => {
		ModPrecios(
			state.idProveedores,
			state.idStkGrupo,
			state.StkRubroAbr,
			state.Importe,
			state.Porcentaje
		).then(() => {
			// Esto se ejecuta SOLO cuando la petición termina con éxito
			setState({
				...state,
				Importe: 0,
				Porcentaje: 0
			})
		});
	};


	let textdatap = [];

	if (proveedores !== undefined) {
		if (proveedores.length > 0) {
			textdatap = [{
				id: "idProveedores",
				label: "Proveedores",
				value: proveedores[0].idProveedores,
				options: proveedores.map((option) => ({
					value: option.idProveedores,
					label: option.ProveedoresDesc
				}))
			}];

		}
	}
	let textdatag = [];

	if (grupos !== undefined) {
		if (grupos.length > 0) {
			textdatag = [{
				id: "id",
				label: "Grupo",
				value: grupos[0].id,
				options: grupos.map((option) => ({
					value: option.id,
					label: option.StkGrupoDesc
				}))
			}];

		}
	}

	let textdatar = [];

	if (rubros !== undefined) {
		if (rubros.length > 0) {
			textdatar = [{
				id: "StkRubroAbr",
				label: "Rubro",
				value: rubros[0].StkRubroAbr,
				options: rubros.map((option) => ({
					value: option.StkRubroAbr,
					label: option.StkRubroDesc
				}))
			}];

		}
	}

	async function proveedorleer() {
		const data = await Proveedoresleertipo26();
		setProveedores(data);
	}

	async function gruposleer() {
		// const data = await stkgrupolee();
		const data = await DatosLeer(formdatag.nombackleer);
		setGrupos(data);
	}

	async function rubrosleer() {
		// const data = await stkrubroleer();
		const data = await DatosLeer(formdatar.nombackleer);
		setRubros(data);
	}
	useEffect(() => {
		const leerTodo = async () => {
			try {
				await proveedorleer(); // Espera a que termine este...
				await gruposleer();    // ...luego este...
				await rubrosleer();    // ...y finalmente este.
			} catch (error) {
				console.error("Error cargando datos:", error)
			}
		};

		leerTodo();
	}, []);

	const [selectedValues, setSelectedValues] = useState('');
	const handleSelectChange = (value, id) => {
		setState({ ...state, [id]: value });
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));

	};

	const renderComboBoxPGR = () => {
		switch (opcionselecPGR) {

			case 'Proveedor':
				return (
					textdatap.map(({ id, label, value, options }, index) => {
						return (
							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								value={value}
								onChange={handleSelectChange}
								options={options}
								width="400px"
							/>
						);
					})
				);



			case 'Grupo':
				return (
					textdatag.map(({ id, label, value, options }, index) => {
						return (
							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								value={value}
								onChange={handleSelectChange}
								options={options}
								width="400px"
							/>
						);
					})
				);

			case 'Rubro':
				return (
					textdatar.map(({ id, label, value, options }, index) => {
						return (
							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								value={value}
								onChange={handleSelectChange}
								options={options}
								width="400px"
							/>
						);
					})
				);

			default:
				return null; // No mostrar nada por defecto
		}
	};

	const renderComboBoxImpPor = () => {
		switch (opcionImpPes) {

			case 'Importe':
				return (

					<TextFieldComun
						id="Importe"
						type="number"
						label="Importe "
						value={state.Importe}
						onChange={handleChange}
						width="100px"
					/>
				);



			case 'Porcentaje':
				return (
					<TextFieldComun
						id="Porcentaje"
						type="number"
						label="Porcentaje"
						value={state.Porcentaje}
						onChange={handleChange}
						width="100px"
					/>
				);


			default:
				return null; // No mostrar nada por defecto
		}
	};

	// Función para actualizar la opción seleccionada
	const selecPGR = useMemo(() => opcionselecPGR || "", [opcionselecPGR]);
	const handleOptionChangePGR = (newOption) => {
		setOpcionSelecPGR(newOption);
		setSelectedValues('');
	};

	const selecImpPor = useMemo(() => opcionImpPes || "", [opcionImpPes]);
	const handleOptionChangeIP = (newOption) => {
		setState({
			...state,
			Importe: 0,
			Porcentaje: 0
		})
		setOpcionImpPes(newOption);
	};


	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });

	};

	return (
		<div>
			<form>
				<Grid container>
					<Grid span={{ xs: 3 }} >
						<CustomSwitch
							value={selecPGR}
							onChange={handleOptionChangePGR}
							opcion1={'Proveedor'}
							opcion2={'Grupo'}
							opcion3={'Rubro'}
							titulo1={'Proveedor'}
							titulo2={'Grupo'}
							titulo3={'Rubro'}
							tithelpertext={'Modifica por : '} />


						{renderComboBoxPGR()}
					</Grid>
					<Grid span={{ xs: 3 }} >
						<CustomSwitch
							value={selecImpPor}
							onChange={handleOptionChangeIP}
							opcion1={'Importe'}
							opcion2={'Porcentaje'}
							titulo1={'Importe'}
							titulo2={'Porcentaje'}
							tithelpertext={'Modifica por : '} />

						{renderComboBoxImpPor()}
						<Button
							className={EstiloBoton.botonabreot}
							onClick={() => submitModPrecio()}
						>
							Enviar
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
}

