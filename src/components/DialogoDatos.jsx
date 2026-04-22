import { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormHelperText } from "@mui/material";
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
	const { formdatos, setDatoborrado } = use(TablasContexto);

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


	// ♻️ Actualizar formState si cambia la fila, columnas o si se cierra el diálogo
	useEffect(() => {
		if (open) {
			// Si el diálogo se abre y hay datos para editar (paramsbor), los cargamos
			if (paramsbor) {
				setFormState({ ...paramsbor });
			} else {
				// Si se abre para un registro nuevo, aseguramos que esté vacío
				setFormState(generarFilaVacia());
			}
		} else {
			// ✨ CUANDO SE CIERRA (open === false): Limpiamos el estado
			setFormState(generarFilaVacia());
			// También es buena idea limpiar errores si los tuvieras
			setError({ error: false, message: "" });
		}
	}, [open, paramsbor, columns]);

	// Añadimos 'open' a las dependencias
	// 🖋 Cambios en inputs

	const manejarCambio = (e) => {
		setFormState((prev) => ({
			...prev,
			[e.target.name]: e.target.value
		}));

	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (nombrebtn === "Enviar") {
			// Validación: revisamos si algún campo REQUERIDO está vacío
			const tieneErrores = columns.some(col => {
				const valor = formState[col.field];
				// Manejamos si required es booleano o función
				const isReq = typeof col.required === "function"
					? col.required({ row: formState })
					: col.required;

				return isReq && (!valor || valor.toString().trim() === "");
			});

			if (!tieneErrores) {
				try {
					// 2. ESPERAMOS a que el registro se guarde en el backend
					await onRowAdd(formState, formdatos);

					handleClose();
				} catch (err) {
					console.error("Error al guardar:", err);
					MuestraMensaje(500);
				}
			} else {
				// Muestra mensaje: "Faltan campos obligatorios"
				MuestraMensaje(415);
			}
		} else {
			// Lógica de borrado (se mantiene igual)
			// let valorresuelto = onRowDelete(paramsbor.id, formdatos, paramsbor);
			// let valorresuelto = onRowDelete(paramsbor.id, formdatos);
			let valorresuelto = onRowDelete(paramsbor, formdatos);
			setDatoborrado(valorresuelto);
			handleClose();
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			fullWidth      // Ocupa el ancho máximo disponible
			maxWidth="md"  // Puedes cambiar a "md" si lo quieres aún más ancho  // Puedes cambiar a "sm" si lo quieres aún más angosto
		>
			<DialogTitle>{titulodial}</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
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
							const isDisabled =
								typeof col.disabled === "function"
									? (!isAlta ? col.disabled({ row: paramsbor }) : normalizeBool(col.disabled))
									: normalizeBool(col.disabled);
							const commonProps = {
								id: col.field,
								label: col.headerName,
								name: col.field,
								value: formState[col.field] !== undefined && formState[col.field] !== null
									? formState[col.field]
									: "",
								// value: formState[col.field] || "",
								required: isRequired,
								readOnly: !isEditable,
								disabled: isDisabled,
								onChange: manejarCambio,
								pattern: col.pattern,
								maxLength: col.maxLength,
								error: error.error,
								margin: "dense",
								variant: "outlined",
								fullWidth: true, // Asegura que ocupen todo el ancho del Grid item
								helperText: col.type === "singleSelect" ? col.helptext : "<Tab> pasa al siguiente campo",
								type: col.type === "date" ? "date" : "text",
							};
							return (
								<Grid item xs={12} key={col.field || index}>
									{col.type === "singleSelect" ? (
										<div style={{ display: 'flex', flexDirection: 'column' }}>
											{/* Label manual para el select estándar */}
											<label style={{
												fontSize: '0.75rem',
												color: 'rgba(0, 0, 0, 0.6)',
												marginBottom: '4px'
											}}>
												{col.headerName} {isRequired && '*'}
											</label>

											<select
												className={estilo.selectFieldDialogDatos}
												id={col.field}
												name={col.field}
												// value={formState[col.field] || ""}
												value={formState[col.field] !== undefined && formState[col.field] !== null
													? formState[col.field]
													: ""}
												required={isRequired}
												onChange={manejarCambio}
												disabled={!isEditable}
												style={{ width: '100%', padding: '10px' }} // Forzamos ancho total
											>
												<option value="">Seleccione {col.headerName}</option>
												{col.valueOptions?.map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</select>

											{/* HelperText manual para el select */}
											<span style={{
												fontSize: '0.75rem',
												color: 'rgba(0, 0, 0, 0.6)',
												marginTop: '4px',
												marginLeft: '14px'
											}}>
												{col.helptext}
											</span>
										</div>
									) : (
										<ValidatedTextField {...commonProps} />
									)}
								</Grid>
							);
						})}

						<Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}>
							<Button
								type="submit"
								variant="contained"
								className={estilos.botonfincargadatos}
								fullWidth
							>
								{nombrebtn}
							</Button>

							<Button
								onClick={handleClose}
								variant="outlined"
								className={estilos.botoncierracargadatos}
								fullWidth
							>
								Cerrar
							</Button>
						</Grid>
					</Grid>
				</form>
			</DialogContent>
		</Dialog>
	);
}
