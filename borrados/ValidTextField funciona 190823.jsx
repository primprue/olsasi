import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { formdata } from "./formdata";
const ValidatedTextField = ({ label, id, ...props }) => {
	const [isValid, setIsValid] = useState(true);
	const [formData, setFormData] = useState(formdata);
	const label1 = props.label1;

	console.log("formData  ", formData);
	const handleChange = (event) => {
		console.log("event.targe  ", event.target.id);
		const formato = props.pattern;
		const id1 = props.id1;
		console.log("props  ", props);
		const { value } = event.target;
		const pattern = formato;
		const isValidValue = new RegExp(pattern).test(value);
		setIsValid(isValidValue);

		isValidValue
			? setFormData({
					...formData,
					[id1]: value,
			  })
			: console.log("Is input valid handleChange?", isValidValue);
		// Realiza aquí tu lógica de validación según tus requerimientos
		//setIsValid(value.length >= 5); // Ejemplo de validación: longitud mínima de 5 caracteres
	};

	return (
		<TextField
			{...props}
			label={label1}
			inputProps={{ "data-testid": `validated-textfield-${label1}` }} // Añade un atributo data-testid único
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
};

export default ValidatedTextField;
