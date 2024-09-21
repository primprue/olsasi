import React, { Component, useEffect } from "react";
import Typography from "@mui/material/Typography";

import { TransporteModificar } from "../pages/Tablas/Transporte/TransporteModificar.jsx";
import { leerTransporte } from "../pages/Tablas/Transporte/TransporteLeer.jsx";

import { ClientesModificar } from "../pages/Tablas/Clientes/ClientesModificar.jsx";
import { ClientesLeer } from "../pages/Tablas/Clientes/ClientesLeer.jsx";

import { leerStkMonedas } from "../pages/Tablas/Monedas/StkMonedasLeer.jsx";
import { StkMonedasModificar } from "../pages/Tablas/Monedas/StkMonedasModificar.jsx";

import { PresupConfTipoLee } from "../pages/Tablas/PresupConfTipo/PresupConfTipoLee.jsx";
import { PresupConfTipoModificar } from "../pages/Tablas/PresupConfTipo/PresupConfTipoModificar.jsx";

import { PresupDetPieLee } from "../pages/Tablas/PresupDetPie/PresupDetPieLee.jsx";
import { PresupDetPieModificar } from "../pages/Tablas/PresupDetPie/PresupDetPieModificar.jsx";

import { proveedoresleer } from "../pages/Tablas/Proveedores/ProveedoresLeer.jsx";
import { ProveedoresModificar } from "../pages/Tablas/Proveedores/ProveedoresModificar.jsx";

import { stkgrupolee } from "../pages/Tablas/StkGrupos/StkGrupoLee.jsx";
import { StkGrupoModificar } from "../pages/Tablas/StkGrupos/StkGrupoModificar.jsx";

import { stkrubroleermezcla } from "../pages/Tablas/StkRubros/StkRubroLeerMezcla.jsx";
import { StkRubroModificar } from "../pages/Tablas/StkRubros/StkRubroModificar.jsx";

import { leeStkItemsDetalles } from "../pages/Tablas/StkItems/leeStkitemsDetalles.jsx";
import { StkItemsModificar } from "../pages/Tablas/StkItems/StkItemsModificar.jsx";

import { StkUnMedLee } from "../pages/Tablas/UnidadMedidas/StkUnMedLee.jsx";
import { StkUnMedModificar } from "../pages/Tablas/UnidadMedidas/StkUnMedModificar.jsx";

import { StkUbFisicaLee } from "../pages/Tablas/UbicacionFisica/StkUbFisicaLee.jsx";

import { ParamCompLeer } from "../pages/CtasCtes/Tablas/ParamComp/ParamCompLeer.jsx";
import { ParamCompModificar } from "../pages/CtasCtes/Tablas/ParamComp/ParamCompModificar.jsx";

import { OTCondPagoLeer } from "../pages/Tablas/OTCondPago/OTCondPagoLeer.jsx";
import { OTCondPagoModificar } from "../pages/Tablas/OTCondPago/OTCondPagoModificar.jsx";

// import { TablaMuestraRenglon } from "../pages/Presupuesto/LayoutPresupuesto/PresupMuestra/TablaMuestraRenglon/index.jsx";
// import { presupDatos } from "../pages/Presupuesto/LayoutPresupuesto/PresupMuestra/presupDatos.jsx";
import { useState } from "react";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import estilotabla from "../Styles/Tabla.module.css";
import { green } from "@mui/material/colors";
//https://www.youtube.com/watch?v=1zYf4Yw1jqs usa custom hooks y en el ejemplo maneja promesas y errores
import {
	DataGrid,
	esES,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DialogoDatos } from "./DialogoDatos.jsx";
import { useContext } from "react";
import TablasContexto from "../context/TablasContext.jsx";
import SelecCampos from "../pages/Impresion/SelecCampos.jsx";
import { Box, IconButton, Tooltip } from "@mui/material";
export default function TablaMuestra(props) {
	const { rows1, columns1, formdatos } = props;
	const { datoborrado, setDatoborrado } = useContext(TablasContexto);
	const [imprimirTF, setImprimirTF] = useState(false);
	const [columns, setColumns] = useState([]);
	const [rows, setRows] = useState([]);
	const [nombreboton, setNombreBoton] = useState("");
	const [titulodial, setTituloDial] = useState("");
	const [paramsbor, setParamsBor] = useState(0);

	useEffect(() => {
		initialFetch();
	}, [rows1, columns1]); // eslint-disable-line react-hooks/exhaustive-deps

	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	async function columnsFetch() {
		var col = columns1;
		setColumns(() => col);
	}
	async function dataFetch() {
		var data = rows1;
		setRows(data);
	}

	const [open, setOpen] = React.useState(false);
	const [rowv, setRowv] = useState();
	const [rown, setRown] = useState();
	const [rowsel, setRowSel] = useState();

	const handleCloseImprimir = () => {
		setImprimirTF(false);
	};

	async function relee() {
		if (formdatos.tablabase === "Transportes") {
			const data = await leerTransporte();
			setRows(data);
		}
		if (formdatos.tablabase === "Clientes") {
			const data = await ClientesLeer();
			setRows(data);
		}
		if (formdatos.tablabase === "Monedas") {
			const data = await leerStkMonedas();
			setRows(data);
		}
		if (formdatos.tablabase === "PresupConfTipo") {
			const data = await PresupConfTipoLee();
			setRows(data);
		}
		if (formdatos.tablabase === "PresupDetPie") {
			const data = await PresupDetPieLee();
			setRows(data);
		}
		if (formdatos.tablabase === "Proveedores") {
			const data = await proveedoresleer();
			setRows(data);
		}
		if (formdatos.tablabase === "Grupos") {
			const data = await stkgrupolee();
			setRows(data);
		}
		if (formdatos.tablabase === "Rubros") {
			const data = await stkrubroleermezcla();
			setRows(data);
		}
		if (formdatos.tablabase === "Items") {
			const data = await leeStkItemsDetalles();
			setRows(data);
		}
		if (formdatos.tablabase === "UniMedidas") {
			const data = await StkUnMedLee();
			setRows(data);
		}

		if (formdatos.tablabase === "UbiFisica") {
			const data = await StkUbFisicaLee();
			setRows(data);
		}

		if (formdatos.tablabase === "ParamComp") {
			const data = await ParamCompLeer();
			setRows(data);
		}

		if (formdatos.tablabase === "OTCondPago") {
			const data = await OTCondPagoLeer();
			setRows(data);
		}
	}
	const handleClose = () => {
		relee();
		if (datoborrado !== 0)
			setRows(rows.filter((row) => row.id !== paramsbor.id));
		setOpen(false);
	};

	const handleAlta = () => {
		setNombreBoton("Enviar");
		setTituloDial(
			`Alta de ${formdatos.tablabase} (moverse por los campos con enter o tab)`
		);
		setOpen(true);
	};

	const handleModifica = (params) => {
		setTimeout(() => {
			if (formdatos.tablabase === "Transportes") TransporteModificar(params);
			if (formdatos.tablabase === "Clientes") ClientesModificar(params);
			if (formdatos.tablabase === "Monedas") StkMonedasModificar(params);
			if (formdatos.tablabase === "PresupConfTipo")
				PresupConfTipoModificar(params);
			if (formdatos.tablabase === "PresupDetPie") PresupDetPieModificar(params);
			if (formdatos.tablabase === "Proveedores") ProveedoresModificar(params);
			if (formdatos.tablabase === "Grupos") StkGrupoModificar(params);
			if (formdatos.tablabase === "Rubros") StkRubroModificar(params);
			if (formdatos.tablabase === "Items") StkItemsModificar(params);
			if (formdatos.tablabase === "UniMedidas") StkUnMedModificar(params);
			if (formdatos.tablabase === "ParamComp") ParamCompModificar(params);
			if (formdatos.tablabase === "OTCondPago") OTCondPagoModificar(params);

			relee();
		}, 100);
	};

	const handleDelete = () => {
		setDatoborrado(0);
		setNombreBoton("Borrar");
		setTituloDial("BORRA ESTE DATO!!!!!");
		setParamsBor(rowsel);
		setOpen(true);
	};

	const useFakeMutation = () => {
		return React.useCallback(
			(user) =>
				new Promise((resolve, reject) => {
					setTimeout(() => {
						if (user.name?.trim() === "") {
							reject(new Error("Error el campo no puede estar vacío"));
						} else {
							resolve({ ...user, name: user.name?.toUpperCase() });
						}
					}, 200);
				}),
			[]
		);
	};

	const mutateRow = useFakeMutation();
	const processRowUpdate = React.useCallback(
		async (newRow, oldRow) => {
			setRown(newRow);
			setRowv(oldRow);
			const response = await mutateRow(newRow);
			setSnackbar({
				children: "Modificado no confirmado",
				severity: "success",
			});
			return response;
		},
		[mutateRow]
	);
	const handleRowSelect = ({ row }) => {
		setRowSel(row);
	};

	const [snackbar, setSnackbar] = React.useState(null);
	const handleCloseSnackbar = () => setSnackbar(null);
	const handleProcessRowUpdateError = React.useCallback((error) => {
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablasgenerales}>
				<GridToolbarColumnsButton className={estilotabla.coloropcioncol} />
				<GridToolbarFilterButton className={estilotabla.coloropcioncol} />
				<GridToolbarDensitySelector className={estilotabla.coloropcioncol} />
				<GridToolbarExport className={estilotabla.coloropcioncol} />
				{(formdatos.tablabase !== "MuestraPresupuesto" && (
					<React.Fragment>
						<AddToPhotosTwoToneIcon
							className={estilotabla.iconoagregar}
							size="large"
							titleAccess="Agregar"
							onClick={() => handleAlta()}
						/>
						<CheckCircleTwoToneIcon
							variant="contained"
							titleAccess="Confirma Modificación"
							className={estilotabla.iconomodificar}
							onClick={() => handleModifica(rown)}
						/>
					</React.Fragment>
				)) || (
					<PreviewTwoToneIcon
						onClick={() => handleModifica(rowsel.id)}
						className={estilotabla.iconomodificar}
						titleAccess="Ve datos Presupuesto"
					/>
				)}
				<LocalPrintshopRoundedIcon
					onClick={() => setImprimirTF(true)}
					className={estilotabla.iconoimpresora}
					titleAccess="Imprimir"
				/>
				<DeleteSharpIcon
					variant="contained"
					titleAccess="Borrar"
					className={estilotabla.iconoborrar}
					onClick={() => handleDelete(rowsel)}
				/>
			</GridToolbarContainer>
		);
	}

	return (
		<Box
			sx={{
				width: "100%",
				align: "center",
				justifycontent: "center",
				boxShadow: 5,
				padding: 5,
			}}
		>
			<DataGrid
				//
				rows={rows}
				columns={columns}
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				processRowUpdate={processRowUpdate}
				onRowClick={handleRowSelect}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				showCellVerticalBorder={true}
				columnHeaderHeight={35}
				slots={{
					toolbar: CustomToolbar,
				}}
				initialState={{
					...rows.initialState,
					pagination: {
						...rows.initialState?.pagination,
						paginationModel: {
							pageSize: 25,
						},
					},
				}}
			/>
			{/* )} */}
			<DialogoDatos
				open={open}
				columns={columns}
				handleClose={handleClose}
				nombrebtn={nombreboton}
				paramsbor={paramsbor}
				titulodial={titulodial}
			/>

			<SelecCampos
				columns={columns}
				datos={rows}
				open={imprimirTF}
				setOpen={setImprimirTF}
				handleClose={handleCloseImprimir}
			/>
			{!!snackbar && (
				<Snackbar
					open
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					onClose={handleCloseSnackbar}
					autoHideDuration={900}
				>
					<Alert {...snackbar} variant="filled" onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
		</Box>
	);
}
