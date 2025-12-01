import { useState, useRef, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Grid from "@mui/material/Grid";
import TablasContexto from "../context/TablasContext";
import { use } from "react";
import MuestraMensaje from "./lib/MuestraMensaje";
import { onRowAdd } from "./onRowAdd";
import { onRowDelete } from "./onRowDelete";
import estilo from "../Styles/TextFieldSelect.module.css";
import estilos from "../Styles/Boton.module.css";
import { ValidatedTextField } from "../hooks/useValidTextField";

export function DialogoDatos(props) {
	const { formdatos, setFormdatos, datoborrado, setDatoborrado } = use(TablasContexto);

	const { open, handleClose, columns, nombrebtn, paramsbor, titulodial } = props;
	// 🔧 Generar una fila vacía según las columnas
	const generarFilaVacia = () => {
		const fila = {};

		columns.forEach((col) => {
			if (col.type === "Date") {
				const fecha = new Date();
				const day = String(fecha.getDate()).padStart(2, '0');
				const month = String(fecha.getMonth() + 1).padStart(2, '0');
				const year = fecha.getFullYear();
				fila[col.field] = `${day}/${month}/${year}`; // Mostrar bien en tabla

			} else {
				fila[col.field] = "";
			}
		});
		return fila;
	};

	// 🔧 Convertir "true"/"false" string a booleano real
	const normalizeBool = (val) => {
		if (typeof val === "string") return val.toLowerCase() === "true";
		return !!val;
	};

	// 🧾 Estado inicial
	const [formState, setFormState] = useState(() =>
		paramsbor ? { ...paramsbor } : generarFilaVacia()
	);

	const [error, setError] = useState({ error: false, message: "" });

	// ♻️ Actualizar formState si cambia la fila o columnas
	useEffect(() => {
		if (paramsbor) {
			setFormState({ ...paramsbor });
		} else {
			setFormState(generarFilaVacia());
		}
	}, [paramsbor, columns]);

	// 🖋 Cambios en inputs
	const manejarCambio = (e) => {
		const { id, value } = e.target;
		setFormState((prev) => ({ ...prev, [id]: value }));
	};

	// ✅ Enviar formulario
	const handleSubmit = (event) => {
		event.preventDefault();
		setTimeout(() => {
			if (nombrebtn === "Enviar") {
				const tieneErrores = Object.values(formState).some((v) => v === "");
				if (!tieneErrores) {
					onRowAdd(formState, formdatos);
				} else {
					MuestraMensaje(415); // campos vacíos
				}
			} else {
				let valorresuelto = onRowDelete(paramsbor.id, formdatos, paramsbor);
				setDatoborrado(valorresuelto);
			}
		}, 300);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{titulodial}</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2} alignItems="center">
						{columns.map((col, index) => {
							const isAlta = !paramsbor;
							const isEditable =
								typeof col.editable === "function"
									? col.editable({ row: paramsbor || {} })
									: normalizeBool(col.editable);

							const isRequired =
								typeof col.required === "function"
									? (!isAlta ? col.required({ row: paramsbor }) : normalizeBool(col.required))
									: normalizeBool(col.required);

							const commonProps = {
								// key: index,
								id: col.field,
								label: col.headerName,
								value: formState[col.field] || "",
								required: isRequired,
								readOnly: !isEditable,
								onChange: manejarCambio,
								error: error.error,
								margin: "dense",
								variant: "outlined",
								type: col.type === "date" ? "date" : "text", // si querés campos tipo fecha
							};


							if (col.type === "singleSelect") {
								return (
									<select
										className={estilo.selectFieldDialogDatos}
										key={col.field}
										id={col.field}
										value={formState[col.field] || ""}
										required={isRequired}
										onChange={manejarCambio}
										disabled={!isEditable}
									>
										<option value="">{col.headerName}</option>
										{col.valueOptions?.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								);
							}

							return <ValidatedTextField key={index} {...commonProps} />;
						})}

						<Button type="submit" className={estilos.botonfincargadatos}>
							{nombrebtn}
						</Button>

						<Button
							onClick={handleClose}
							variant="outlined"
							className={estilos.botoncierracargadatos}
						>
							Cerrar
						</Button>
					</Grid>
				</form>
			</DialogContent>
		</Dialog>
	);
}
