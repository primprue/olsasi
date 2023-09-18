import { Button, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ThumbDownAltTwoToneIcon from "@mui/icons-material/ThumbDownAltTwoTone";
import ValidatedTextField from "./useValidTextField";
import { useRef } from "react";
const Register = () => {
	const [inputValue, setInputValue] = useState("");
	const [isValid, setIsValid] = useState(true);
	// const myRef = useRef();

	const handleChange = (event) => {
		const { value } = event.target;
		let campo = event.target.id;
		let ubicacion = event.target.selectionStart;
		// if (inputRef.current) {
		//   inputRef.current.setSelectionRange(3, 6); // Define la posición inicial (3) y final (6) del cursor
		//   inputRef.current.focus(); // Hace foco en el input
		// }
		// Expresión regular para el patrón "XX-XXXXXXXX-X"
		const pattern = /^[0-9]{0,2}-[0-9]{0,8}-[0-9]{0,1}$/;
		const isValidValue = pattern.test(value);

		setInputValue(value);
		setIsValid(isValidValue);
		// const myRefValue = myRef.current;
		// console.log(' myRefValue   ', myRefValue);

		// console.log('isValidValue  ', isValidValue)

		// if (!isValidValue) {campo.current.setSelectionRange(ubicacion, 1)
		//   campo.current.focus()
		// }
	};
	const abrirventana = () => {
		window.open("", "abrirventana", "");
	};
	return (
		<div>
			<ValidatedTextField
				label="Nombre de usuario"
				variant="outlined"
				placeholder="Escribe algo..."
				id="username" // Proporciona un id único
			/>
			<ValidatedTextField
				label="Correo electrónico"
				variant="outlined"
				placeholder="Escribe algo..."
				id="email" // Proporciona un id único
			/>
			<input
				// ref={myRef}
				type="text"
				id="CUIT1"
				value={inputValue}
				onChange={handleChange}
				bordercolor="blue.100"
				borderwidth="0.3px"
				bordertop={0}
				placeholder="Ejemplo: 12-12345678-9"
				style={{
					icon: CheckIcon,
					// borderColor: isValid ? 'green' : 'red',
					// bordertop: 0,
					// borderWidth: isValid ? '8px' : '8px', // Ajusta el ancho del borde en caso de error
				}}
				pattern="[0-9]{2}-[0-9]{8}-[0-9]{1}"
			/>

			<TextField
				label="TextField1"
				type="text"
				id="CUIT2"
				value={inputValue}
				onChange={handleChange}
				placeholder="99-99999999-9"
				InputProps={{
					pattern: "[0-9]{2}-[0-9]{8}-[0-9]{1}",
					startAdornment: isValid ? (
						<InputAdornment position="start">
							<CheckIcon color="success" />
						</InputAdornment>
					) : (
						<InputAdornment position="start">
							<ThumbDownAltTwoToneIcon color="error" />
						</InputAdornment>
					),
				}}
				variant="standard"
			/>

			<TextField
				label="TextField2"
				type="text"
				id="CUIT3"
				value={inputValue}
				onChange={handleChange}
				placeholder="99-99999999-9"
				InputProps={{
					"data-testid": "my-unique-id",
					pattern: "[0-9]{2}-[0-9]{8}-[0-9]{1}",
					startAdornment: isValid ? (
						<InputAdornment position="start">
							<CheckIcon color="success" />
						</InputAdornment>
					) : (
						<InputAdornment position="start">
							<ThumbDownAltTwoToneIcon color="error" />
						</InputAdornment>
					),
				}}
				variant="standard"
			/>
			{/* {!isValid && <p>El valor ingresado no coincide con el patrón.</p>} */}
		</div>
	);
};

export default Register;

// import { Box, Button, TextField } from "@mui/material";
// import { useState } from "react";
// import  React, { Component } from 'react';
// import InputAdornment from '@mui/material/InputAdornment';
// import FilledInput from '@mui/material/FilledInput';
// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [fecha, setfecha] = useState("");
//   const [error, setError] = useState({
//     error: true,
//     message: "",
//   });

//   const emailValidation = (email) => {
//     // expresion regular para validar email
//     const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     return regex.test(email);
//   };
//   const fechaValidation = (fecha) => {
//     const regex = /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/;
//     return regex.test(fecha);
// };

// const onChange = (event) => {
// console.log('event.target.value  ', event.target.value)
// console.log('event.target.id  ', event.target.id)
// console.log('event.target  ', event.target)
// console.log('event.target.selectionStart  ', event.target.selectionStart)
// }

// const onFocus = (event) => {
//   console.log('event.target.value onFocus ', event.target.value)

//   }
//   const onSubmit = (e) => {
//     const { URL } = this.state;
//     console.log("Here is the site url: ", URL);
//     console.log('e  ', e)
//     e.preventDefault();
//     // if (!emailValidation(email)) {
//     //   setError({
//     //     error: true,
//     //     message: "El email no es valido",
//     //   });
//     //   return;
//     // }
//     // if (!fechaValidation(fecha)) {
//     //     setError({
//     //       error: true,
//     //       message: "El fecha no es valido",
//     //     });
//     //     return;
//     //   }
//     // console.log(email);
//     // setError({
//     //   error: false,
//     //   message: "",
//     // });
//   };
//   const regexp = ".a.o";

//   const [inputValue, setInputValue] = useState('');
//   const [isValid, setIsValid] = useState(true);

//   const handleChange = (event) => {
// //     console.log('event.target.value  ', event.target.value)
// // console.log('event.target.id  ', event.target.id)
// // console.log('event.target  ', event.target)
// // console.log('event.target.selectionStart  ', event.target.selectionStart)
//     const { value } = event.target;
//     setInputValue(value);

//     // Verificar si el valor ingresado coincide con el patrón
//     const pattern = /^[0-9]{2}-[0-9]{8}-[0-9]{1}$/;
//     setIsValid(pattern.test(value));
//     console.log('isValid  ', isValid)
//   };

//   return (
//     <>
//       <h1>Register</h1>
//       <Box
//         // component="form"
//         // onSubmit={onSubmit}
//         // autoComplete="off"
//       >

//         {/* <TextField
//           label="Email"
//           variant="outlined"
//           id="email"
//           type="email"
//           fullWidth
//           required
//           error={error.error}
//           helperText={error.message}
//           onChange={(e) => setEmail(e.target.value)}
//           value={email}
//         />
//            <TextField
//           label="fecha"
//           variant="outlined"
//           id="fecha"
//           type="fecha"
//           fullWidth
//           required
//           error={error.error}
//           helperText={error.message}
//           onChange={(e) => setfecha(e.target.value)}
//           value={fecha}
//         /> */}
//          {/* <FilledInput

//             id="filled-adornment-weight"
//             endAdornment={<InputAdornment position="end">kg</InputAdornment>}
//             aria-describedby="filled-weight-helper-text"
//             inputProps={{
//               'aria-label': 'weight',
//             }}
//           /> */}
//                   <TextField
//                   //  regexp = {regexp}
//           label="caso"
//           variant="outlined"
//           id="caso"
//           // type="CUIT"
//           fullWidth
//           placeholder='.a.o'
//           onChange={onChange}
//           inputProps={{
//             pattern: regexp }}
//          />
//                     <input
//                   //  regexp = {regexp}
//           label="nro"
//           variant="outlined"
//           id="nro"
//           // type="CUIT"
//           // fullWidth
//           // onFocus={onFocus}
//           placeholder='99-99999999-99'
//           onChange={handleChange}
//           style={{ borderColor: isValid ? 'green' : 'red' }}
//           // inputProps={{
//             pattern= "[0-9]{2}-[0-9]{8}-[0-9]{1}"
//           //  }}
//          />
//            {isValid ? null : <p>isValid</p>}
//              {/* <TextField
//           label="CUIT"
//           variant="outlined"
//           id="CUIT"
//           // type="CUIT"
//           fullWidth
//           placeholder="99-999999999-9"
//           required
//                 inputProps={{
//                   pattern: "/[0-9]{0,1}\/-\/[0-9]{3-11}\/-\/[0-9]{13,14}" }}

//                 // inputProps={{
//                 //   pattern: "[a-z]{1,15}" }} FUnciona

//           // error={error.error}
//           // helperText={error.message}
//           // onChange={(e) => setfecha(e.target.value)}
//           // value={fecha}
//         /> */}
//         <Button
//           variant="outlined"
//           type="submit"
//           sx={{ mt: 2 }}
//         >
//           Submit
//         </Button>
//       </Box>
//     </>
//   );
// }
