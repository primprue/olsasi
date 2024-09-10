import React, { useState, useEffect } from "react";
import estilotabla from "../../../../Styles/Tabla.module.css";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { OTRenglonLeer } from "./OTRenglonLeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import { useContext } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
export function TablaMuestraRenglon(props) {
	const { open, handleClose, OTNro } = props;
	let OTNroBuscar = OTNro;
	const [renglon, setRenglon] = useState([]);
	const [columns, setColumns] = useState([]);
	const Cierra = () => {
		OTNroBuscar = 0;
		setRenglon([]);
		handleClose();
	};
	async function columnsFetch() {
		var col = await llenarcolumns();
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await OTRenglonLeer(OTNroBuscar);
		setRenglon(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
	}, [OTNro]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div>
			<Dialog
				fullWidth={false}
				maxWidth={"xl"}
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				{/* <DialogTitle id="alert-dialog-slide-title">{titulo}</DialogTitle> */}
				<DialogContent>
					<Box
						sx={{ height: 500, width: "100%" }}
						id="alert-dialog-slide-description"
					>
						<DataGrid
							columnHeaderHeight={35}
							columns={columns}
							rows={renglon}
						></DataGrid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={Cierra}
						className={estilotabla.botontablamuestrarenglon}
					>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
