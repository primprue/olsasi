import React, { Component, useEffect } from "react";

import { useState } from "react";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import { RecargaIcon, BorrarIcono, AgregarIcon, ImpresionEsp, ActividadEsp } from "../components/comppropios/CustomIcons.jsx";
import estilotabla from "../Styles/Tabla.module.css";
//https://www.youtube.com/watch?v=1zYf4Yw1jqs usa custom hooks y en el ejemplo maneja promesas y errores
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
	GridToolbar,
	GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { esES } from '@mui/x-data-grid/locales';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DialogoDatos } from "./DialogoDatos.jsx";
import { use } from "react";
import TablasContexto from "../context/TablasContext.jsx";
import SelecCampos from "../pages/Impresion/SelecCampos.jsx";
import { DatosModificar } from "./DatosModificar.jsx";
import { DatosLeer } from "./DatosLeer.jsx";
import { Tooltip } from "@mui/material";
import { ImpresionesEsp } from "./ImpresionesEsp.jsx";
import { ActividadesEsp } from "./ActividadesEsp.jsx";

/*props viene de IndexTablas, que hace una lectura de los datos de las tablas, según
el backend que se haya cargado en formdata de la tabla en si */

export default function TablaMuestra(props) {
	const { rows1, columns1, formdatos } = props;
	const { datoborrado, setDatoborrado } = use(TablasContexto);
	const [imprimirTF, setImprimirTF] = useState(false);
	const [columns, setColumns] = useState([]);
	const [rows, setRows] = useState([]);
	const [nombreboton, setNombreBoton] = useState("");
	const [titulodial, setTituloDial] = useState("");
	const [paramsbor, setParamsBor] = useState(0);
	const estiloBoton = {
		backgroundColor: formdatos.color,
		'& .MuiButton-root': {
			color: 'rgb(10, 0, 0)',
			transition: 'all 0.2s ease-in-out', // hace que el agrandamiento sea suave
			fontSize: '0.9rem', // tamaño base
			'&:hover': {
				fontStyle: 'italic',
				fontSize: '1.05rem', // más grande al pasar el mouse
				backgroundColor: formdatos.color,
			},
		}
	}


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
		const data = await DatosLeer(formdatos.nombackleer);
		setRows(data);


	}
	// async function handleClose() {
	const handleClose = () => {
		relee();
		if (datoborrado !== 0)
			setRows(rows.filter((row) => row.id !== paramsbor.id));
		setOpen(false);
	};

	const handleAlta = () => {
		setNombreBoton("Enviar");
		setTituloDial(
			`Alta de ${formdatos.tablabase}`
		);
		setOpen(true);
		// }
	};

	const impresionesespeciales = () => {
		ImpresionesEsp(formdatos.impresionesp);
	};
	const activdadesesepeciales = (rowsel) => {

		ActividadesEsp(rowsel, formdatos.otraactividad);
	};
	const handleModifica = async (params) => {

		let resultado;
		resultado = await DatosModificar(params, formdatos.nombackmodificar);
		if (resultado === 200) {
			// 2. Solo después de la confirmación, refrescamos el DataGrid
			await relee();
		}
		// }, 50);
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
			<GridToolbarContainer sx={estiloBoton}
			>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport
					slotProps={{
						tooltip: {
							title: "Cuando se exporta, en LibreCalc, las columnas con números, en Campos Tipo de Columna, elegir Inglés (US)",
							arrow: true
							// Aquí MUI se encarga de que el tooltip se cierre automáticamente al abrir el menú
						}
					}}
				/>

				<GridToolbarQuickFilter placeholder="Buscar" />
				{(formdatos.tablabase !== "MuestraPresupuesto" && (
					<React.Fragment>
						{(formdatos.nombackagregar !== '' && (
							<AgregarIcon
								className={estilotabla.iconoagregar}
								size="large"
								titleAccess="Agregar"
								onClick={() => handleAlta()}
							/>)) ||
							(formdatos.nombackagregar === '' && (
								<AgregarIcon
									variant="contained"
									titleAccess="Agregar"
									className={estilotabla.iconoagregardeshabilitado}
								/>
							))
						}
						{(formdatos.nombackmodificar !== '' && (
							<CheckCircleTwoToneIcon
								variant="contained"
								titleAccess="Confirma Modificación"
								className={estilotabla.iconomodificar}
								onClick={() => handleModifica(rown)}
							/>)) ||
							(formdatos.nombackmodificar === '' && (
								<CheckCircleTwoToneIcon
									variant="contained"
									titleAccess="Confirma Modificación"
									className={estilotabla.iconomodificardeshabilitado}
								/>))}
					</React.Fragment>

				)) ||
					(formdatos.tablabase === "MuestraPresupuesto" &&
						(

							<PreviewTwoToneIcon
								onClick={() => handleModifica(rowsel.id)}
								className={estilotabla.iconomodificar}
								titleAccess="Ve datos Presupuesto"
							/>
						))

				}
				<LocalPrintshopRoundedIcon
					onClick={() => setImprimirTF(true)}
					className={estilotabla.iconoimpresora}
					titleAccess="Imprimir"
				/>
				{(formdatos.nombackborrar !== '' && (
					<BorrarIcono
						variant="contained"
						titleAccess="Borrar"
						className={estilotabla.iconoborrar}
						onClick={() => handleDelete(rowsel)}
					/>
				)) ||
					(formdatos.nombackborrar === '' && (
						<BorrarIcono
							variant="contained"
							titleAccess="Borrar"
							className={estilotabla.iconoborrardeshabilitado}
						// onClick={() => handleDelete()}
						/>
					))
				}

				<RecargaIcon
					variant="contained"
					titleAccess="Recargar"
					sx={{ color: '#0954ec' }}
					className={estilotabla.iconorecarga}
					onClick={() => relee()}
				/>

				{(formdatos.impresionesp && (
					<ImpresionEsp
						variant="contained"
						titleAccess={formdatos.impresiontitulo}
						className={estilotabla.iconoimpresiones}
						onClick={() => impresionesespeciales()}
					/> || <ImpresionEsp
						variant="contained"
						titleAccess="Impresiones"
						className={estilotabla.iconoimpresionesdeshabilitado}
					/>
				))}
				{(formdatos.otraactividad && (
					<ActividadEsp
						variant="contained"
						titleAccess={formdatos.titulootraactividad}
						className={estilotabla.iconoimpresiones}
						onClick={() => activdadesesepeciales(rowsel)}
					/> || <ActividadEsp
						variant="contained"
						titleAccess="Impresiones"
						className={estilotabla.iconoimpresionesdeshabilitado}
					/>
				))}
			</GridToolbarContainer>
		);
	}
	return (
		// <div style={{ margin: 6, height: 600, width: "85%" }}>
		<div style={{ margin: 6, height: 600, width: "100vw", flexDirection: 'column' }} >
			{/* div style={{ height: '90vh', width: '100vw', display: 'flex', flexDirection: 'column' }} */}
			{/* <div style={{ flex: 1, width: '100%' }}> */}
			<DataGrid
				rows={rows}
				columns={columns}
				processRowUpdate={processRowUpdate}
				className={estilotabla.tablasgenerales}
				onRowClick={handleRowSelect}
				onProcessRowUpdateError={handleProcessRowUpdateError}
				columnHeaderHeight={30}
				sx={{
					'& .MuiDataGrid-row:hover': {
						backgroundColor: '#1976d2a4', // azul fuerte
						color: '#fff',              // texto blanco
					},
					'& .MuiDataGrid-row.Mui-selected': {
						backgroundColor: '#2fd3a25c', // rojo fuerte
						color: '#0a0000',
					},
					'& .MuiDataGrid-row.Mui-selected:hover': {
						backgroundColor: '#2fd3a25c', // rojo más oscuro al hover si está seleccionada
					},

				}}
				slots={{
					toolbar: CustomToolbar,
					csvOptions: {
						fileName: 'datos_exportados',
						delimiter: ';', // Cambiar separador CSV
						includeHeaders: true,
						utf8WithBom: true,
					},
				}}
				localeText={esES.components.MuiDataGrid.defaultProps.localeText}
				initialState={{
					...rows.initialState,
					pagination: {
						paginationModel: {
							pageSize: 10,
						},
					},

				}}
				pageSizeOptions={[10]}

			/>

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
				handleClose={handleCloseImprimir}
			/>
			{snackbar && (
				<Snackbar
					open
					autoHideDuration={100}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
					onClose={handleCloseSnackbar}
				>
					<Alert {...snackbar} variant="filled" onClose={handleCloseSnackbar} />
				</Snackbar>
			)}
			{/* </div> */}
		</div>
	);
}
