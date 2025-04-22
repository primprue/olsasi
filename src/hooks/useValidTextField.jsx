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
	const { editable, ...restProps } = props;

	const handleKeyPress = (event) => {
		//if (event.key === "Enter" || event.key === "Tab") {
		if (event.key === "Tab") {
			// Realiza la verificación o ejecución aquí
			handleChange(event);
		}
		if (event.key === "Enter") {
			// Realiza la verificación o ejecución aquí
			event.preventDefault();
		}
	};
	const handleChange = (event) => {
		const formato = props.pattern;
		const id = props.id;
		const { value } = event.target;
		const pattern = formato;
		const isValidValue = new RegExp(pattern).test(value);
		setIsValid(isValidValue);
		var error = 0
		if (value.length > props.maxLength) error++
		if (props.required && value.length === 0) error++

		if (error > 0) setIsValid(false); else setIsValid(true)
		if (error === 0) {
			setFormdatos({
				...formdatos,
				[id]: value,
				datoserroneos: !isValidValue,
			});
		} else {
			setFormdatos({
				...formdatos,
				[id]: value,
				datoserroneos: isValidValue,
			})
			event.preventDefault();

		}

	};

	const handleMouseDown = (event) => {
		event.preventDefault(); // Evita que el campo reciba foco
	};

	// valueFormatter: ({ value }) => {
	// 	if (!value || typeof value !== "number") {
	// 		return value;
	// 	}
	// 	return `${value.toLocaleString()}$`;
	// };
	// Realiza aquí tu lógica de validación según tus requerimientos
	//setIsValid(value.length >= 5); // Ejemplo de validación: longitud mínima de 5 caracteres

	// const classes = CssTextField();
	//inputProps={{ "data-testid": `validated-textfield-${label}` }} Añade un	atributo data-testid 	único
	return (
		<TextField
			{...restProps}
			label={label}
			helperText="<Tab> pasa al siguiente campo"
			// inputProps={{ "data-testid": `validated-textfield-${label}` }}
			required={props.required}
			autoFocus={props.autoFocus}
			slotProps={{
				input: {
					"data-testid": `validated-textfield-${label}`,
					readOnly: props.readOnly,
					// readOnly: !editable,
					startAdornment: isValid ? (
						<CheckCircleIcon color="success" />
					) : (
						<ThumbDownAltTwoToneIcon color="error" />
					),
				}
			}}
			//   InputProps={{
			// 		readOnly: props.readOnly,
			// 		startAdornment: isValid ? (
			// 			<CheckCircleIcon color="success" />
			// 		) : (
			// 			<ThumbDownAltTwoToneIcon color="error" />
			// 		),
			// 		// startAdornment: isValid ? <CheckCircleIcon /> : <ErrorIcon />,
			// 	}}
			onKeyDown={handleKeyPress}
		// onMouseDown={handleMouseDown}
		// onChange={handleChange}
		/>
	);
}

// export default ValidatedTextField;
