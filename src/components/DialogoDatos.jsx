import { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormHelperText, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import TablasContexto from "../context/TablasContext";
import { use } from "react";
import MuestraMensaje from "./lib/MuestraMensaje";
import { onRowAdd } from "./onRowAdd";
import { onRowDelete } from "./onRowDelete";
import estilo from "../Styles/TextFieldSelect.module.css";
import estilos from "../Styles/Boton.module.css";
import { ValidatedTextField } from "../hooks/useValidTextField";
import { IconCerrar, IconEnviar, IconBorrar } from "../components/comppropios/CustomIcons.jsx";

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
			if (formdatos.tablabase === "OTDatos" && col.field === "OTDatosTipoConf") {
				fila[col.field] = formdatos.OTDatosTipoConf;
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

	const manejarCambio = (e) => {
		const { name, value } = e.target;


		setFormState((prev) => {
			// 1. Primero creamos el nuevo estado con el valor del input (sea cual sea el campo)
			let nuevoEstado = {
				...prev,
				[name]: value
			};
			// 2. Definimos cuáles son los campos que afectan los números
			const camposDinero = [
				'PBItemsImp', 'PBItemsPorcIVA', 'PBItemsIVA',
				'PBItemsIIBB', 'PBItemsOtros', 'PBItemsOtros1',
				'PBItemsOtros2', 'PBItemsOtros3', 'PBItemsOtros4'
			];

			// 3. SOLO SI el campo que cambió está en la lista de dinero, recalculamos IVA y Total
			if (camposDinero.includes(name)) {

				// Recalcular IVA (solo si cambió el precio base o el porcentaje)
				if (name === "PBItemsImp" || name === "PBItemsPorcIVA") {
					const imp = parseFloat(nuevoEstado.PBItemsImp) || 0;
					const porc = parseFloat(nuevoEstado.PBItemsPorcIVA) || 0;
					nuevoEstado.PBItemsIVA = (imp * porc / 100).toFixed(2);
				}

				// Recalcular el Total General sumando todos los parciales
				const total =
					(parseFloat(nuevoEstado.PBItemsImp) || 0) +
					(parseFloat(nuevoEstado.PBItemsIVA) || 0) +
					(parseFloat(nuevoEstado.PBItemsIIBB) || 0) +
					(parseFloat(nuevoEstado.PBItemsOtros) || 0) +
					(parseFloat(nuevoEstado.PBItemsOtros1) || 0) +
					(parseFloat(nuevoEstado.PBItemsOtros2) || 0) +
					(parseFloat(nuevoEstado.PBItemsOtros3) || 0) +
					(parseFloat(nuevoEstado.PBItemsOtros4) || 0);

				nuevoEstado.PBItemsTotal = total.toFixed(2);
			}

			// Si el campo era "NombreCliente" o cualquier otro, 
			// simplemente devuelve el nuevoEstado con ese valor cambiado y listo.
			return nuevoEstado;
		});
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
					setFormState(generarFilaVacia());
					//	handleClose();
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

			let valorresuelto = onRowDelete(paramsbor, formdatos);
			setDatoborrado(valorresuelto);
			handleClose();
		}
	};
	const handleKeyDown = (e) => {
		// Si presiona Enter y NO está en un área de texto multiline (para no romper los linebreaks)
		if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
			e.preventDefault(); // Evita que se envíe el formulario por accidente

			const contenedor = e.currentTarget;

			// Buscamos todos los inputs y selects editables dentro del contenedor
			const elementosFoco = Array.from(
				contenedor.querySelectorAll('input:not([disabled]), select:not([disabled])')
			);

			// Encontramos la posición del elemento actual donde se presionó Enter
			const indiceActual = elementosFoco.indexOf(e.target);

			// Si hay un siguiente elemento, le pasamos el foco
			if (indiceActual !== -1 && indiceActual < elementosFoco.length - 1) {
				elementosFoco[indiceActual + 1].focus();
			} else {
				// Opcional: Si es el último campo, puedes hacer que haga foco en el botón de guardar
				const botonGuardar = contenedor.querySelector('#btn-guardar');
				if (botonGuardar) botonGuardar.focus();
			}
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
			<DialogContent component="form" onKeyDown={handleKeyDown}>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
						<IconButton
							aria-label="close"
							onClick={handleClose}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8,
								color: (theme) => theme.palette.grey[500],
								zIndex: 1, // Asegura que quede por encima de los títulos o fondos
							}}
						>
							<IconCerrar />
						</IconButton>
						{/* <Button
							onClick={handleClose}
							variant="outlined"
							className={estilos.botoncierracargadatos}
						// fullWidth
						>
							Cerrar
						</Button> */}
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

							// 1. Creamos una variable para las opciones normalizadas
							const opcionesRender = typeof col.valueOptions === 'function'
								? col.valueOptions({ row: formState }) // Si es función, la ejecutamos con la fila actual
								: col.valueOptions; // Si es array, lo usamos directamente

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
								// helperText: col.type === "singleSelect" ? col.helptext : "<Tab> pasa al siguiente campo",
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
												value={formState[col.field] !== undefined && formState[col.field] !== null
													? formState[col.field]
													: ""}
												required={isRequired}
												onChange={manejarCambio}
												disabled={!isEditable}
												style={{ width: '100%', padding: '10px' }}
											>
												<option value="">Seleccione {col.headerName}</option>
												{/* Usamos el array ya procesado */}
												{opcionesRender?.map((option) => (
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

						{/* <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 2 }}> */}
						<IconButton
							type="submit"
							sx={{
								right: 20,
								center: 8,
								color: (theme) => theme.palette.grey[500],
								zIndex: 1, // Asegura que quede por encima de los títulos o fondos
							}}
						>
							{nombrebtn === "Enviar" ? <IconEnviar sx={{ fontSize: '40px', m: 3 }} /> : <IconBorrar sx={{ fontSize: '40px', m: 3 }} />}
						</IconButton>
						{/* <Button
								type="submit"
								variant="contained"
								className={estilos.botonfincargadatos}
								fullWidth
							>
								{nombrebtn}
							</Button> */}


						{/* </Grid> */}
					</Grid>
				</form>
			</DialogContent>
		</Dialog >
	);
}
