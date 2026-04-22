import { useState } from "react";
import TextField from "@mui/material/TextField";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export function ValidatedTextField(props) {

	// Extraemos las props de validación que ahora sí llegan
	const { pattern, required, maxLength, id, value, name, onChange, ...restProps } = props;
	const [isDirty, setIsDirty] = useState(false);
	const checkValidation = (val) => {
		if (!val || val.toString().length === 0) return !required;
		if (maxLength && val.length > maxLength) return false;
		if (pattern) {
			const regex = new RegExp(pattern);
			return regex.test(val);
		}
		return true;
	};
	const isValid = checkValidation(value);
	const handleChange = (e) => {
		setIsDirty(true); // El usuario ya interactuó
		onChange(e);      // Avisamos al diálogo para que actualice el formState
	};


	return (
		<TextField
			{...restProps}
			value={value}
			onChange={handleChange}
			error={isDirty && !isValid}
			name={name}
			required={required}
			slotProps={{
				input: {
					startAdornment: (isDirty || value) ? (
						isValid ? <CheckCircleIcon color="success" sx={{ mr: 1 }} />
							: <ThumbDownAltTwoToneIcon color="error" sx={{ mr: 1 }} />
					) : null, // No mostrar íconos hasta que haya acción
				}
			}}
		/>
	);
}