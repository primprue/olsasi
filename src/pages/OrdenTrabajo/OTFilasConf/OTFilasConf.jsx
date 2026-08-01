import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useMemo, useState } from "react";
import TextFieldComun from "../../../components/comppropios/TextFieldComun";
import TextFieldSelect from "../../../components/comppropios/TextFieldSelect";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo";
import { StkItemsLeeAbrRub } from "../../Tablas/StkItems/StkItemsLeeAbrRub";
import estilos from "../../../Styles/Boton.module.css";
import { OTDatosLeer } from "../OTVarios/OTDatosLeer";
import TextFieldSelectObject from "../../../components/comppropios/TextFieldSelectObject";
import CustomSwitch from "../../../components/comppropios/CustomSwitch";
export default function OTFilasConf(props) {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const { datosgenot, setDatosgenot } = useContext(OrdTrabajo);

	const { datospot } = props;
	const [items, setItems] = useState([]);
	let coloreleg;
	const [datosrestantes, setDatosRestantes] = useState([]);
	async function leedatosot() {
		setDatosgenot({
			...datosgenot,
			idrenglon: datospot.idrenglon,
			Material: datospot.StkRubroAbr,
			HayMedidas: 'S'
		});
		const result = await OTDatosLeer(datospot.tipopresup);
		const datos = result.map((row) => ({
			nombre: row.OTDatosDesc,
			// opciones: JSON.parse(row.OTDatosOpciones),
			opciones: row.OTDatosOpciones,
			tipocomponete: row.OTDatosTipoPed,
			requerido: row.OTDatosRequerido,
			anchocomp: row.OTDatosAncho,
		}));
		const countRequiredS = datos.filter(
			(item) => item.requerido === "S"
		).length;
		setDatosRestantes(datos);
		setOTdatos({ ...otdatos, totaldatos: countRequiredS });
	}
	async function stkleeitemsrubro(cuallee) {
		const result = await StkItemsLeeAbrRub(cuallee);
		setItems(result);
	}
	useEffect(() => {
		stkleeitemsrubro(datospot.StkRubroAbr);
	}, [datospot]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		leedatosot();
	}, [datospot]); // eslint-disable-line react-hooks/exhaustive-deps


	const textdataI = useMemo(() => {
		if (items.length === 0) return [];

		return [{
			id: "coloreleg",
			label: "Color",
			value: coloreleg,
			options: items.map((option) => ({
				value: option.StkItemsDesc,
				label: option.StkItemsDesc
			}))
		}];
	}, [items]);




	const handleChangeG = (value, id) => {
		setDatosgenot({ ...datosgenot, [id]: value });
	};

	const Terminocarga = () => {
		setOTdatos({ ...otdatos, datosconfec: datosgenot });
	};
	const [backgroundColor, setBackgroundColor] = useState("");

	const handleChange = (selectedIndex, event) => {
		setDatosgenot({ ...datosgenot, ColorMaterial: event.target.value });

		const indice = selectedIndex;
		let paños = (datospot.largo * 1 + 0.08) / 1.48;
		const decimalPart = parseFloat(paños) - parseInt(paños);

		if (decimalPart < 0.5) {
			paños = parseInt(paños) + 0.5;
		} else {
			paños = parseInt(paños) + 1;
		}

		let canttela = (datospot.ancho * 1 + 0.08) * paños;

		if (canttela > items[indice].StkItemsCantDisp) {
			setBackgroundColor("lightcoral"); // Cambia el color de fondo si el resultado es mayor de 50
		} else {
			setBackgroundColor("lightgreen"); // Cambia el color de fondo si el resultado es menor o igual a 50
		}
	};
	const { largo } = datospot;


	const [selectedValues, setSelectedValues] = useState({});
	const handleSelectChange = (value, id) => {
		if (id === "coloreleg") {
			setDatosgenot({ ...datosgenot, ColorMaterial: value });
		}

		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));

	};

	const selectedOption = useMemo(() => datosgenot.HayMedidas || "S", [datosgenot.HayMedidas]);
	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setDatosgenot({ ...datosgenot, HayMedidas: newOption });
	};

	return (
		<div>
			<Grid container spacing={2} alignItems="center">

				{/* acá muestra opción de colores */}
				<Grid item style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
					{textdataI.map(({ id, label, value, options }, index) => (
						<TextFieldSelect
							key={id || index}
							id={id}
							label={label}
							value={selectedValues[id] ?? value ?? ''}
							onChange={handleSelectChange}
							options={options}
							width="200px"
						/>
					))}
				</Grid>

				{/* Sección del Switch */}
				<Grid item style={{ display: 'flex', alignItems: 'center' }}>
					<CustomSwitch
						value={selectedOption}
						onChange={handleOptionChange}
						opcion1={'S'}
						opcion2={'N'}
						titulo1={'Si'}
						titulo2={'No'}
						tithelpertext={'Hay Medidas? '}
					/>
				</Grid>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
						gap: '16px',
						width: '80%',
						padding: '8px'
					}}
				>
					{datosrestantes.map((dato, index) => (
						<div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
							{dato.tipocomponete === "select" && (
								<TextFieldSelectObject dato={dato} onChange={handleChangeG} />
							)}
							{dato.tipocomponete === "textfield" && (
								<TextFieldComun
									disabled={largo === "N"}
									id={dato.nombre}
									type="string"
									value={otdatos.OTDatosDesc}
									onChange={handleChangeG}
									width="100%" // <-- Cambiado a 100% para que use el ancho de la celda
									helperText={dato.requerido === "S" ? "Requerido" : "-----"}
									placeholder={dato.nombre}
								/>
							)}
						</div>
					))}
				</div>

				<Button onClick={Terminocarga} className={estilos.botonfincargadatos}>
					Fin de Carga
				</Button>
			</Grid>
		</div >
	);
}
