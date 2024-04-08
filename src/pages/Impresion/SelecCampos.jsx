import React, { useState, useEffect } from "react";
import {
	ListItemText,
	List,
	ListItem,
	ListItemIcon,
	Checkbox,
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
} from "@mui/material";

import ImprimirPantalla from "./ImprimirPantalla";
import { checkout } from "superagent";

export default function SelecCampos(props) {
	// const classes = useStyles();
	// columns = { columns };
	// datos = { rows };
	// open = { imprimirTF };
	// setOpen = { setImprimirTF };
	// handleClose = { handleCloseImprimir };

	// const { columns, datos, open, handleClose } = props;
	const [checked, setChecked] = React.useState([]);
	// const [open, setOpen] = React.useState(false);
	const [abreprint, setAbrePrint] = React.useState(false);
	// const [cerrar, setCerrar] = React.useState(false);
	const [properties, setProperties] = React.useState(false);
	const [checkOff, setCheckoff] = React.useState(true);
	// props.headerTabla.pop() //Saco el campo borrar
	function checkAll() {
		setCheckoff(!checkOff);
		if (checkOff) {
			var campoVisible = [];
			props.columns.map((valor) => {
				campoVisible.push(valor);
				return null; //agregado para que no tire un warning
			});
			setChecked(campoVisible);
		} else setChecked([]);
	}
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
	};

	// La siguiente función la uso para hacer el mapeo correcto de los encabezados a mostrar*********

	const mapeo = () => {
		var campoVisible = [];
		checked.map((valor) => {
			const encabezado = {
				displayName: valor.headerName,
				field: valor.field,
			};
			campoVisible.push(encabezado);
			return null; //agregado para que no tire un warning
		});
		setProperties(campoVisible);
	};

	// *********
	function CieraSelecCampos() {
		props.setOpen({ open: false });
	}

	return (
		<>
			<Dialog
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle>Elija los Campos a IMPRIMIR !!!!!!!</DialogTitle>
				{props.columns.length > 0 && (
					<List>
						{props.columns.slice(length, -1).map((value, index) => {
							const labelId = `checkbox-list-label-${value}`;
							return (
								<ListItem
									key={value.headerName}
									role={undefined}
									dense
									// button
									onClick={handleToggle(value)}
								>
									<ListItemIcon>
										<Checkbox
											edge="start"
											checked={checked.indexOf(value) !== -1}
											tabIndex={-1}
											disableRipple
											inputProps={{ "aria-labelledby": labelId }}
										/>
									</ListItemIcon>
									<ListItemText id={labelId} primary={`${value.headerName}`} />
								</ListItem>
							);
						})}
					</List>
				)}

				<DialogActions>
					<Button variant="contained" color="primary" onClick={checkAll}>
						Seleccionar Todos
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							mapeo();
							setAbrePrint(true);
						}}
					>
						Imprimir
					</Button>

					<Button
						variant="contained"
						color="secondary"
						onClick={props.handleClose}
						// onClick={props.ImprimirTF(false)}
						// onClick={() => props.toggleImprimir()}
					>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>
			{/* {console.log(
				"props antes de llamar a imprimirpantalla  ",
				props,
				"abreprint  ...",
				abreprint
			)} */}
			{abreprint && (
				<ImprimirPantalla
					datos={props.datos}
					properties={properties}
					// abreprint={abreprint}
					onClose={setAbrePrint}
					// toggleImprimir={props.toggleImprimir}
					// properties={checked}
				/>
			)}
		</>
	);
}

{
	/* <List className={classes.root}> */
}

{
	/* // <List>
						// 	{props.columns[index].headerName.map((value, index) => {
						// 		const labelId = `checkbox-list-label-${value}`;

						// 		return (
						// 			<ListItem
						// 				key={value.title}
						// 				role={undefined}
						// 				dense
						// 				// button
						// 				onClick={handleToggle(value)}
						// 			>
						// 				<ListItemIcon>
						// 					<Checkbox
						// 						edge="start"
						// 						checked={checked.indexOf(value) !== -1}
						// 						tabIndex={-1}
						// 						disableRipple
						// 						inputProps={{ "aria-labelledby": labelId }}
						// 					/>
						// 				</ListItemIcon>
						// 				<ListItemText id={labelId} primary={`${value.title}`} />
						// 			</ListItem>
						// 		);
						// 	})}
						// </List> */
}
{
	/* Aca llamo a ImprimirPantalla y le paso datos y columnas */
}
{
	/* <ImprimirPantalla elegidos={checked} datos={props.datos} /> */
}
