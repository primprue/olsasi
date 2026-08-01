import { useState, useEffect } from "react";
import estilotabla from "../../../../../Styles/Tabla.module.css";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Alert,
	Snackbar
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { presuprenglonleer } from "./PresupRenglonLeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import { PresupBorrar } from "../PresupBorrar.jsx";
import { use } from "react";
import OrdTrabajo from "../../../../../context/OrdTrabajo.jsx";
import MuestraMensaje from "../../../../../components/lib/MuestraMensaje";


export function TablaMuestraRenglon(props) {
	const [snackbar, setSnackbar] = useState(null);
	const handleCloseSnackbar = () => setSnackbar(null);
	const { otdatos, setOTdatos } = use(OrdTrabajo);
	const { open, handleClose, Presup, origen } = props;
	const [renglon, setRenglon] = useState([]);
	const [columns, setColumns] = useState([]);
	const [selectionModel, setSelectionModel] = useState([]);
	let titulo =
		origen === "Borrar"
			? `Borrará el Presupuesto nro. ${Presup.id} de ${Presup.NombreCliente}`
			: `Renglones de Presupuesto nro. ${Presup.id} de ${Presup.NombreCliente}`;

	const AceptaBorrar = () => {
		PresupBorrar(Presup.id);
		handleClose();
	};
	async function AceptaItemOT() {
		//campos de la orden de trabajo original
		//idOTRenglon, OTRenglonNroPresup, OTRenglonCant, OTRenglonDesc, OTRenglonLargo, OTRenglonAncho, OTRenglonImpUnit, OTRenglonImpItem, OTRenglonParamInt
		//los mando por Context a la OT

		if (selectionModel.length !== 0)
			setOTdatos({
				...otdatos,
				renglonespresup: selectionModel,
			})
		else {
			setSnackbar({
				children: "Por favor, seleccione un renglón",
				severity: "error",
			});
		}
	}


	// En tu componente:
	useEffect(() => {
		if (otdatos.renglonespresup) {
			// Aquí ejecutas lo que deba pasar CUANDO el estado ya cambió
			handleClose();
		}
	}, [otdatos]); // Se dispara cada vez que otdatos cambia

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
				// TransitionComponent={Transition}
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
					<Button
						onClick={Cierra}
						className={estilotabla.botontablamuestrarenglon}
					>
						Cerrar
					</Button>
					{(origen === "Borrar" && (
						<Button
							onClick={AceptaBorrar}
							className={estilotabla.botontablamuestrarenglon}
						>
							Borrar
						</Button>
					)) || (
							<Button
								onClick={AceptaItemOT}
								className={estilotabla.botontablamuestrarenglon}
							>
								Ir a Orden de Trabajo
							</Button>
						)}
				</DialogActions>
			</Dialog>
			{!!snackbar && (
				<Snackbar
					open
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					onClose={handleCloseSnackbar}
					autoHideDuration={5200}
					sx={{ width: '100%' }}
				>
					<Alert {...snackbar} variant="filled" onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
		</div>
	);
}
