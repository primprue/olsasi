import { useState, useRef } from "react";
import { Button, Dialog, DialogContent, DialogTitle, Select } from "@mui/material";
import { ValidatedTextField } from "../hooks/useValidTextField";
import estilo from "../Styles/TextFieldSelect.module.css";
// import { Grid } from "@mui/material";
import Grid from "@mui/material/Grid";
import MuestraMensaje from "./lib/MuestraMensaje";
import { use } from "react";
import { onRowAdd } from "./onRowAdd";
import { onRowDelete } from "./onRowDelete";
import TablasContexto from "../context/TablasContext";
import estilos from "../Styles/Boton.module.css";
export function DialogoDatos(props) {
	const { formdatos, setFormdatos } = use(TablasContexto);
	const submitButtonRef = useRef(null);
	const { datoborrado, setDatoborrado } = use(TablasContexto);
	const [selectedOption, setSelectedOption] = useState("");
	const { open, handleClose, columns, nombrebtn, paramsbor, titulodial } = props;
	const [error, setError] = useState({
		error: false,
		message: "",
	});

	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
		setFormdatos({
			...formdatos,
			[event.target.id]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault(); // Evita la recarga de la página al enviar el formulario
		setTimeout(() => {
			if (nombrebtn === "Enviar") {
				if (formdatos.datoserroneos === false) {
					onRowAdd(formdatos);
				} else {
					MuestraMensaje(415);

				}
			} else {
				let valorresuelto = onRowDelete(paramsbor.id, formdatos);
				setDatoborrado(valorresuelto);
			}
		}, 300);
	};

	const manejarCambio = (e) => {
		e.stopPropagation()
		formdatos[e.target.id] = e.target.value;
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{titulodial}</DialogTitle>
			<b></b>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2} alignItems="center">
						{columns &&

							// , -1
							columns.slice(length).map(
								(campo, index) => (
									// (!columns[index].editable && <label></label>) || (
									(columns[index].type !== "singleSelect" && (
										<ValidatedTextField
											key={index}
											id={columns[index].field}
											label={columns[index].headerName}
											color={columns[index].color}
											autoFocus={columns[index].autoFocus}
											readOnly={columns[index].readOnly}
											editable={columns[index].editable}
											value={paramsbor[columns[index].field]}
											required={columns[index].required}
											type={columns[index].type}
											margin="dense"
											variant="outlined"
											error={error.error}
											maxLength={columns[index].maxLength}
											placeholder={columns[index].placeholder}
											campo={columns[index].field}
											pattern={columns[index].pattern}
											alignitems={columns[index].alignItems}
											onChange={manejarCambio}
											className={formdatos.datoserroneos ? 'error' : ''}
											onKeyDown={
												!index === columns.slice(length) && { handleSubmit }
											}
										/>
									)) || (
										<select
											className={estilo.selectFieldDialogDatos}
											key={index}
											id={columns[index].field}
											label={columns[index].headerName}
											// variant = "outlined"
											defaultValue={paramsbor[columns[index].field]}
											required={columns[index].required}
											onChange={handleSelectChange}
										>
											<option key="" value="">
												{columns[index].headerName}
											</option>
											{columns[index].valueOptions.map((option) => (
												<option key={option.value} value={option.value}>
													{option.label}
												</option>
											))}
										</select>
									))
								// )
							)}

						<Button
							type="submit"
							className={estilos.botonfincargadatos}
						>
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


