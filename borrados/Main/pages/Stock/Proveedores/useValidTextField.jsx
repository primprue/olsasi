import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useContext } from "react";
import { ProveedoresContext } from "./Proveedores";

export default function ValidatedTextField(props) {
	const { formdatos, setFormdatos } = useContext(ProveedoresContext);

	const [isValid, setIsValid] = useState(true);
	const label = props.label;
	const handleChange = (event) => {
		const formato = props.pattern;
		const id = props.id;
		const { value } = event.target;
		const pattern = formato;
		const isValidValue = new RegExp(pattern).test(value);
		setIsValid(isValidValue);
		if (isValidValue) {
			setFormdatos({
				...formdatos,
				[id]: value,
				datoserroneos: !isValidValue,
			});
		}

		// Realiza aquí tu lógica de validación según tus requerimientos
		//setIsValid(value.length >= 5); // Ejemplo de validación: longitud mínima de 5 caracteres
	};

	return (
		<TextField
			{...props}
			label={label}
			inputProps={{ "data-testid": `validated-textfield-${label}` }} // Añade un atributo data-testid único
			InputProps={{
				startAdornment: isValid ? (
					<CheckCircleIcon color="success" />
				) : (
					<ThumbDownAltTwoToneIcon color="error" />
				),
				// startAdornment: isValid ? <CheckCircleIcon /> : <ErrorIcon />,
			}}
			onChange={handleChange}
		/>
	);
}

// export default ValidatedTextField;
