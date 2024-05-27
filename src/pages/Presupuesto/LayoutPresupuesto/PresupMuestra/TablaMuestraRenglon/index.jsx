import React, { useState, useEffect } from "react";
// import { tableIcons } from "../../../../../lib/material-table/tableIcons";
// import { localization } from "../../../../../lib/material-table/localization";
import estilotabla from "../../../../../Styles/Tabla.module.css";
import CompressSharpIcon from "@mui/icons-material/CompressSharp";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { presuprenglonleer } from "./PresupRenglonLeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import { PresupBorrar } from "../PresupBorrar.jsx";
import { useContext } from "react";
import OrdTrabajo from "../../../../../context/OrdTrabajo.jsx";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
export function TablaMuestraRenglon(props) {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const { open, handleClose, Presup, origen } = props;
	const [renglon, setRenglon] = useState([]);
	const [columns, setColumns] = useState([]);
	const [selectionModel, setSelectionModel] = useState([]);
	let titulo =
		origen === "Borrar"
			? `Borrará el Presupuesto nro. ${Presup.id} de ${Presup.NombreCliente}`
			: `Renglones de Presupuesto nro. ${Presup.id} de ${Presup.NombreCliente}`;
	// let boton = origen === "Borrar" ? "Borrar" : "Cerrar";

	const AceptaBorrar = () => {
		PresupBorrar(Presup.id);
		handleClose();
	};
	async function AceptaItemOT() {
		//campos de la orden de trabajo original
		//idOTRenglon, OTRenglonNroPresup, OTRenglonCant, OTRenglonDesc, OTRenglonLargo, OTRenglonAncho, OTRenglonImpUnit, OTRenglonImpItem, OTRenglonParamInt
		//los mando por Context a la OT
		setOTdatos({ ...otdatos, renglonespresup: selectionModel });
		// handleClose();
	}

	const Cierra = () => {
		handleClose();
	};

	useEffect(() => {
		async function fetchRenglones() {
			const result = await presuprenglonleer(Presup.id);
			setRenglon(result);
		}
		fetchRenglones();
	}, [Presup]);

	useEffect(() => {
		async function fetchColumns() {
			const col = await llenarcolumns();
			setColumns(col);
		}
		fetchColumns();
	}, []);

	const handleSelectionModelChange = (selectionModel) => {
		const itemelegoc = selectionModel.map((row, i) =>
			renglon.filter((rows) => rows.id == row)
		);
		setSelectionModel(itemelegoc);
	};

	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablamuestrarenglon}>
				Seleccione Items de Orden de Trabajo
			</GridToolbarContainer>
		);
	}
	return (
		<div>
			<Dialog
				fullWidth={true}
				maxWidth={"xl"}
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{titulo}</DialogTitle>
				<DialogContent>
					<Box
						sx={{ height: 500, width: "100%" }}
						id="alert-dialog-slide-description"
					>
						<DataGrid
							columnHeaderHeight={35}
							columns={columns}
							rows={renglon}
							checkboxSelection
							onRowSelectionModelChange={handleSelectionModelChange}
							selectionModel={selectionModel}
							slots={{
								toolbar: CustomToolbar,
							}}
						></DataGrid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={Cierra} color="secondary">
						Cerrar
					</Button>
					{(origen === "Borrar" && (
						<Button onClick={AceptaBorrar} color="secondary">
							Borrar
						</Button>
					)) || (
						<Button onClick={AceptaItemOT} color="secondary">
							Aceptar
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}
