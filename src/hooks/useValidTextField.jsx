import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TablasContexto from "../context/TablasContext";
export function ValidatedTextField(props) {
	const { formdatos, setFormdatos } = useContext(TablasContexto);
	const [isValid, setIsValid] = useState(true);
	const label = props.label;

	const handleChange = (event) => {
		const formato = props.pattern;
		const id = props.id;
		const { value } = event.target;
		const pattern = formato;
		const isValidValue = new RegExp(pattern).test(value);
		setIsValid(isValidValue);
		setIsValid(value.length > 0 && value.length <= props.maxLength);
		if (isValidValue) {
			setFormdatos({
				...formdatos,
				[id]: value,
				datoserroneos: !isValidValue,
			});
		}

		// valueFormatter: ({ value }) => {
		// 	if (!value || typeof value !== "number") {
		// 		return value;
		// 	}
		// 	return `${value.toLocaleString()}$`;
		// };
		// Realiza aquí tu lógica de validación según tus requerimientos
		//setIsValid(value.length >= 5); // Ejemplo de validación: longitud mínima de 5 caracteres
	};
	// const classes = CssTextField();
	//inputProps={{ "data-testid": `validated-textfield-${label}` }} Añade un	atributo data-testid 	único
	return (
		<TextField
			{...props}
			label={label}
			inputProps={{ "data-testid": `validated-textfield-${label}` }}
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