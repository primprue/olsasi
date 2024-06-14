import React, { useEffect, useState, useContext } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import { llenarcolumns } from "./columns.jsx";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import OTFilaGral from "../OTFilas/OTFilaGral/OTFilaGral.jsx";
import { Alert, Button, Grid, TextField } from "@mui/material";
import OTFilasConf from "../OTFilasConf/OTFilasConf.jsx";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FitbitIcon from "@mui/icons-material/Fitbit";
import { deepOrange, green } from "@mui/material/colors";
import { CurrencyTextField } from "../../../hooks/useCurrencyTextField.jsx";
import estilotabla from "../../../Styles/Tabla.module.css";
import EstTF from "../../../Styles/TextField.module.css";
import { AlignVerticalCenterSharp } from "@mui/icons-material";
import OTGenera from "./OTGenera.jsx";

export default function OTDataGrid({ data }) {
	const [columns, setColumns] = useState([]);
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const { datosgenot, setDatosgenot } = useContext(OrdTrabajo);
	const [rows, setRows] = useState([]);
	const [gridKey, setGridKey] = useState(0);
	const [presuptipo, setPresuptipo] = useState("");
	const [datospot, setDatospot] = useState("");
	const [rowsel, setRowSel] = useState();
	const [totalpresup, setTotalpresup] = useState(0);
	const [abregenera, setAbregenera] = useState(false);
	let senia = 0;
	const handleOpen = () => setAbregenera(true);
	const handleClose = () => setAbregenera(false);
	const [snackbar, setSnackbar] = React.useState(null);
	const handleCloseSnackbar = () => setSnackbar(null);
	const flattenedData = data.flatMap((nivel1) => nivel1); //flatMap lo que hace es aplanar un array en este caso aplana el array del array

	async function columnsFetch() {
		var col = await llenarcolumns(flattenedData);
		col.push(actionsColumn);
		setColumns(() => col);
	}

	async function dataFetch() {
		setRows(flattenedData);
	}
	async function initialFetch() {
		dataFetch();
		columnsFetch();
	}

	useEffect(() => {
		initialFetch();
	}, []);

	async function fcionotrosdatos(event) {
		var datorenglon = event.row;
		const paramObjeto = JSON.parse(datorenglon.PresupRenglonParamInt);
		setPresuptipo(paramObjeto.tipopresup);
		setDatospot(paramObjeto);
	}
	const handleChange = (event) => {
		const id = event.target.id;
		setOTdatos({ ...otdatos, [id]: event.target.value });
	};

	const actionsColumn = {
		field: "actions",
		headerName: "ODatos",
		width: 100,
		headerClassName: "encabcolumns",
		renderCell: (params) => (
			<Button
				variant="text"
				style={{ color: deepOrange[800] }}
				onClick={() => fcionotrosdatos(params)}
				startIcon={<FitbitIcon />}
			/>
		),
	};
	const sumaimporte = () => {
		let TotalPresupuesto = 0;

		if (rown === undefined)
			otdatos.renglonespresup.map((renglon) => {
				TotalPresupuesto += renglon[0].PresupRenglonImpItem;
			});
		else TotalPresupuesto += rown.PresupRenglonImpItem;
		setTotalpresup(TotalPresupuesto);

		setOTdatos({ ...otdatos, TotalPresupuesto: TotalPresupuesto });
	};

	const generaorden = () => {
		// presuptipo === "UNIDAD" ? handleOpen() : handleClose();
		console.log(
			"Object.keys(datosgenot).length  ",
			Object.keys(datosgenot).length
		);
		console.log("otdatos.totaldatos  ", otdatos.totaldatos);
		if (
			Object.keys(datosgenot).length > otdatos.totaldatos ||
			Object.keys(datosgenot).length === 0
		) {
			handleOpen();
		} else handleClose();
	};
	const loadData = (data) => {
		const newData = [...rows, { id: rows.length + 1, data }];
		setRows(newData);
	};

	const handleRowSelect = ({ row }) => {
		setRowSel(row);
	};

	const [rowv, setRowv] = useState();
	const [rown, setRown] = useState();

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
			if (oldRow.PresupRenglonLargo !== 0 || oldRow.PresupRenglonAncho !== 0)
				newRow.PresupRenglonImpUnit = Math.round(
					(oldRow.PresupRenglonImpUnit /
						oldRow.PresupRenglonLargo /
						oldRow.PresupRenglonAncho) *
						newRow.PresupRenglonLargo *
						newRow.PresupRenglonAncho,
					2
				);
			newRow.PresupRenglonImpItem = Math.round(
				newRow.PresupRenglonImpUnit * newRow.PresupRenglonCant,
				2
			);
			setRown(newRow);
			setRowv(oldRow);
			setRown(newRow);
			const response = await mutateRow(newRow);
			// setSnackbar({
			// 	children: "Modificado no confirmado",
			// 	severity: "success",
			// });
			setOTdatos({ ...otdatos, otrenglon: newRow });
			return response;
		},
		[mutateRow]
	);

	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablapresupuestoslot}>
				{/* <GridToolbarColumnsButton /> */}
				{/* <GridToolbarFilterButton /> */}
				{/* <GridToolbarDensitySelector /> */}

				<CurrencyTextField
					id="Total"
					size="small"
					label="Importe Total"
					value={totalpresup}
					className={EstTF.tfcurrency}
				></CurrencyTextField>

				{/* <CurrencyTextField
					id="totalseña"
					size="small"
					label="Importe Seña"
					placeholder="Seña"
					value={senia}
					// value={otdatos.senia}
					onChange={() => {
						senia;
					}}
					// onChange={handleChange}
					className={EstTF.tfcurrency}
				></CurrencyTextField> */}

				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<GridToolbarExport></GridToolbarExport>

				<AddShoppingCartIcon
					onClick={sumaimporte}
					style={{ color: green[500] }}
					fontSize="medium"
					titleAccess="Sumar"
				/>

				<Button onClick={generaorden} variant="contained" color="primary">
					Genera Orden
				</Button>
			</GridToolbarContainer>
		);
	}

	return (
		<Grid style={{ height: 400, width: "100%" }}>
			{datospot !== "" && <OTFilaGral datospot={datospot}></OTFilaGral>}
			{presuptipo !== "" && <OTFilasConf datospot={datospot}></OTFilasConf>}
			{/* {(datospot == "" || presuptipo == "") && abregenera && ( */}
			{/* {Object.keys(datosgenot).length <= otdatos.totaldatos && abregenera && (
				<div>
					{setAbregenera(false)}
					<Snackbar
						open
						anchorOrigin={{ vertical: "top", horizontal: "center" }}
						onClose={handleCloseSnackbar}
						autoHideDuration={900}
					>
						<Alert severity="warning">
							Faltan Datos para generar la Orden de Trabajo
						</Alert>
					</Snackbar>
				</div>
			)} */}
			{datospot !== "" && presuptipo !== "" && abregenera && (
				<>
					<OTGenera datospot={datospot}></OTGenera>
				</>
			)}
			{presuptipo !== "UNIDAD" && (
				<>
					<OTGenera datospot={rows}></OTGenera>
				</>
			)}
			{/* {console.log("abregenera OTDataGrid ", abregenera)}
			{console.log("presuptipo ", presuptipo)}
			{presuptipo === "UNIDAD" && abregenera && (
				<>
					<OTGenera datospot={datospot}></OTGenera>
				</>
			)} */}
			<DataGrid
				columnHeaderHeight={35}
				key={gridKey}
				rows={rows}
				columns={columns}
				processRowUpdate={processRowUpdate}
				// onCellClick={handleCellClick}
				pageSize={5}
				rowsPerPageOptions={[5]}
				getCellClassName={() => `super-app-theme--Open`}
				getRowClassName={() => `super-app-theme--Open`} //son las propiedades de las filas
				slots={{
					toolbar: CustomToolbar,
				}}
				slotProps={{
					toolbar: { onLoadData: loadData },
				}}
			/>
		</Grid>
	);
}

//async function handleCellClick(event) {
//console.log("estoy en handleCellClic  ", event);
// var datorenglon = event.row;
// const paramObjeto = JSON.parse(datorenglon.PresupRenglonParamInt);
// setPresuptipo(paramObjeto.tipopresup);
// setDatospot("");
// setDatospot(paramObjeto);
// setOpen(true);
//}
