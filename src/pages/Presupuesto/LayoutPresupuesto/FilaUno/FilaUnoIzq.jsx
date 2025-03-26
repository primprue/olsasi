import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Grid from "@mui/material/Grid2";
import leePresupConfTipoLeerDesc from "../../leePresupConfTipoLeerDesc";
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";

export default function FilaUnoIzq() {
	const { state, setState } = useContext(PresupPant);
	const anexo = "N";

	const [selectedValues, setSelectedValues] = useState({});
	const [tipopresupleidos, setTipopresupleidos] = useState([]);

	// Función para manejar cambios en la selección
	const handleSelectChange = useCallback((value, id, label) => {
		setSelectedValues((prev) => ({ ...prev, [id]: value }));
		setState((prev) => ({ ...prev, PresupConfTipoDesc: label }));
		leerdesc(label);
	}, []);

	// Función para leer la descripción
	const leerdesc = useCallback(async (descripcion) => {
		const result = await leePresupConfTipoLeerDesc(descripcion);
		setState((prev) => ({ ...prev, DatosPresupEleg: result }));
	}, []);

	// Función para leer la configuración
	const conftipoleer = useCallback(async () => {
		const result = await leePresupConfTipoLeeAnexo(anexo, state.PresupProducto);
		setTipopresupleidos(result);
		setState((prev) => ({ ...prev, DescripPresup: "" }));
	}, [state.PresupProducto]);

	// Cargar datos al iniciar o cuando cambia PresupProducto
	useEffect(() => {
		conftipoleer();
	}, [state.PresupProducto]);

	// Generar opciones dinámicamente cuando `tipopresupleidos` cambie
	const textdata = useMemo(() => {
		if (tipopresupleidos.length === 0) return [];

		return [{
			id: "TipoConfeccion",
			label: 'Confección',
			value: state.NroConfTipo,
			options: tipopresupleidos.map((option) => ({
				value: option.NroConfTipo,
				label: option.PresupConfTipoDesc
			}))
		}];
	}, [state.NroConfTipo, tipopresupleidos]);

	return (
		<Grid>
			{textdata.length > 0 ? (
				textdata.map(({ id, label, value, options }) => (

					<TextFieldSelect
						key={id}
						id={id}
						label={label}
						value={selectedValues[id] ?? value ?? ""}
						onChange={handleSelectChange}
						options={options}
						width="300px"
					/>
				))
			) : (
				<p>Cargando datos...</p>
			)}
		</Grid>
	);
}
