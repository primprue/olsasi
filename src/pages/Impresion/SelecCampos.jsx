import React from "react";
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

export default function SelecCampos(props) {
	const { columns, datos, open, handleClose } = props;
	const [checked, setChecked] = React.useState([]);
	const [abreprint, setAbrePrint] = React.useState(false);
	const [properties, setProperties] = React.useState([]);
	const [checkOff, setCheckoff] = React.useState(true);

	function checkAll() {
		setCheckoff(!checkOff);
		if (checkOff) {
			const campoVisible = [...columns];
			setChecked(campoVisible);
		} else {
			setChecked([]);
		}
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

	const mapeo = () => {
		const campoVisible = checked.map((valor) => ({
			displayName: valor.headerName,
			field: valor.field,
		}));
		setProperties(campoVisible);
	};

	const abredialog = () => {
		mapeo();
		setAbrePrint(true);
	};

	const cerrarTodo = () => {
		setAbrePrint(false);
		handleClose();
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={() => {
					setAbrePrint(false); // evitar que quede abierto
					handleClose();
				}}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle>Elija los Campos a IMPRIMIR !!!!!!!</DialogTitle>

				{columns.length > 0 && (
					<List>
						{columns.map((value) => {
							const labelId = `checkbox-list-label-${value.field}`;
							return (
								<ListItem
									key={value.field}
									role={undefined}
									dense
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
									<ListItemText id={labelId} primary={value.headerName} />
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
						onClick={abredialog}
						disabled={checked.length === 0}
					>
						Imprimir
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {
							setAbrePrint(false);
							handleClose();
						}}
					>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>

			{abreprint && (
				<ImprimirPantalla
					datos={datos}
					properties={properties}
					onClose={cerrarTodo}
					open={abreprint}
				/>
			)}
		</>
	);
}
