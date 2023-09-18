import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { onRowAdd } from "./onRowAdd";
import ValidatedTextField from "./useValidTextField";
import { Box } from "@mui/material";
import { useContext } from "react";
import { ProveedoresContext } from "./Proveedores";

export function DialogoDatosM(props) {
	const { formdatos, setFormdatos } = useContext(ProveedoresContext);

	const { open, columns, handleClose } = props;
	const [error, setError] = useState({
		error: false,
		message: "",
	});

	const handleSubmit = (event) => {
		event.preventDefault(); // Evita la recarga de la página al enviar el formulario
		onRowAdd(formdatos);
	};

	//para ver pattern https://bluuweb.dev/04-javascript/08-form.html

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Modificación de información</DialogTitle>
			<DialogContent>
				<Box component="form" onSubmit={handleSubmit} autoComplete="off">
					{columns &&
						columns.map(
							(campo, index) =>
								columns[index].editable &&
								// https://codesandbox.io/s/new-klqlh?file=/src/components/Form/Birthday/index.tsx
								columns[index].type !== "singleSelect" && (
									<ValidatedTextField
										key={index}
										id={columns[index].field}
										label={columns[index].headerName}
										color={columns[index].color}
										autoFocus
										required={columns[index].required}
										type={columns[index].type}
										margin="dense"
										fullWidth
										variant="outlined"
										error={error.error}
										maxLength={columns[index].maxLength}
										placeholder={columns[index].placeholder}
										campo={columns[index].field}
										pattern={columns[index].pattern}
									/>
								)
						)}

					<Button
						type="submit"
						variant="outlined"
						sx={{ mt: 2 }}
						disabled={formdatos.datoserroneos}
					>
						Enviar
					</Button>
					<Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>
						Cancelar
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
}

{
}
