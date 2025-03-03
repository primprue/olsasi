import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import leePresupConfTipoLeerDesc from "../../leePresupConfTipoLeerDesc";
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import estilo from "../../../../Styles/TextFieldSelect.module.css";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";
export default function FilaUnoIzq() {
	const { state, setState } = use(PresupPant);
	var anexo = "N";

	const tipopresup = useRef(false);
	const tipopresupleidos = useRef([]);

	const [selectedValues, setSelectedValues] = useState({});
	const handleSelectChange = (value, id, label) => {
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));
		var descripcion = label;

		setState({ ...state, PresupConfTipoDesc: label });
		leerdesc(descripcion);
	};


	async function leerdesc(descripcion) {
		const result = await leePresupConfTipoLeerDesc(descripcion);
		setState({ ...state, DatosPresupEleg: result });
	}

	async function conftipoleer(anexo, prodelab) {
		const result = await leePresupConfTipoLeeAnexo(anexo, prodelab);
		tipopresupleidos.current = result;

		tipopresup.current = false
		setState({ ...state, DescripPresup: "" });

	}

	useEffect(() => {
		// setState({ ...state, DescripPresup: "" });
		if (tipopresupleidos.current.length === 0) {
			conftipoleer(anexo, state.PresupProducto);
		}
	}, [tipopresupleidos.current]); // eslint-disable-line react-hooks/exhaustive-deps



	useEffect(() => {

		conftipoleer(anexo, state.PresupProducto);
	}, [state.PresupProducto]); //  eslint-disable-line react-hooks/exhaustive-deps


	let textdata = [];

	if (tipopresupleidos.current !== undefined) {
		if (tipopresupleidos.current.length > 0) {
			textdata = [{
				id: "TipoConfeccion",
				label: "Confección",
				value: state.NroConfTipo,
				options: tipopresupleidos.current.map((option) => ({
					value: option.NroConfTipo,
					label: option.PresupConfTipoDesc
				}))
			}];
			tipopresup.current = true;
		}
	}

	return (
		<Grid >
			{tipopresup.current &&
				textdata.map(({ id, label, value, options }, index) => (
					<TextFieldSelect
						key={index}
						id={id}
						label={label}
						value={selectedValues[id] ?? value ?? ''}
						onChange={handleSelectChange}
						options={options} />
				))}


		</Grid>
	);
}
/*	{textdata.map((data) => (
				<TextField
					className={estilo.selectField}
					id={data.id}
					key={data.id}
					size="small"
					select
					label={data.label}
					margin="dense"
					value={data.value}

					onChange={handleChange}
					// SelectProps={{ native: true }}
					variant="outlined"
					InputLabelProps={{
						className: estilo.selectLabel,
					}}
					SelectProps={{
						native: true,
						className: estilo.menuItem,
					}}
				>
					{data.mapeo}
				</TextField>
			))}*/