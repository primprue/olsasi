import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ValidatedTextField } from "../hooks/useValidTextField";
import { Box, Grid } from "@mui/material";

import { useContext } from "react";
import { onRowAdd } from "./onRowAdd";
import TablasContexto from "../context/TablasContext";
export function DialogoDatos(props) {
	const { formdatos, setFormdatos } = useContext(TablasContexto);
	const [selectedOption, setSelectedOption] = React.useState("");
	const { open, columns, handleClose } = props;
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
			onRowAdd(formdatos);
			// console.log("formdatos.datoserroneos  ", formdatos.datoserroneos);
			// if (formdatos.datoserroneos === false) {
			// 	handleClose();
			// }
		}, 1000);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Alta de información</DialogTitle>
			<b></b>
			<DialogContent>
				<Box component="form" onSubmit={handleSubmit} autoComplete="off">
					<Grid container spacing={2} alignItems="center">
						{columns &&
							columns.slice(length, -1).map(
								(campo, index) => (
									columns[index].editable && <label></label>,
									(
										<script>
											const primerTextField=
											document.getElementById(columns[1].field);
											primerTextField.focus();
										</script>
									),
									(columns[index].type !== "singleSelect" && (
										<ValidatedTextField
											key={index}
											id={columns[index].field}
											label={columns[index].headerName}
											color={columns[index].color}
											autoFocus
											required={columns[index].required}
											type={columns[index].type}
											margin="dense"
											variant="outlined"
											error={error.error}
											maxLength={columns[index].maxLength}
											placeholder={columns[index].placeholder}
											campo={columns[index].field}
											pattern={columns[index].pattern}
											alignItems={columns[index].alignItems}
										/>
									)) || (
										<select
											key={index}
											id={columns[index].field}
											label={columns[index].headerName}
											variant="outlined"
											defaultValue={columns[index].field}
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
									)
								)
							)}
					</Grid>
					<Button type="submit" variant="outlined" sx={{ mt: 2 }}>
						Enviar
					</Button>
					<Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>
						Cerrar
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

{
}
