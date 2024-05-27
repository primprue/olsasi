import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import { llenarcolumns } from "./columns";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import OTFilaGral from "../OTFilas/OTFilaGral/OTFilaGral";
import { Button, Grid, TextField } from "@mui/material";
import OTFilasConf from "../OTFilasConf/OTFilasConf";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import FitbitIcon from "@mui/icons-material/Fitbit";

import { deepOrange, red, blue, green, purple } from "@mui/material/colors";
import { CurrencyTextField } from "../../../hooks/useCurrencyTextField";
import estilotabla from "../../../Styles/Tabla.module.css";
import EstTF from "../../../Styles/TextField.module.css";

export default function OTDataGrid({ data }) {
	const [columns, setColumns] = useState([]);
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const [rows, setRows] = useState([]);
	const [gridKey, setGridKey] = useState(0);
	console.log("dataen OTDataGrid  ", data);
	// Transforma el arreglo multidimensional en un arreglo plano
	const [presuptipo, setPresuptipo] = useState("");
	const [datospot, setDatospot] = useState("");
	const flattenedData = data.flatMap((nivel1) => nivel1); //flatMap lo que hace es aplanar un array en este caso aplana el array del array
	const [totalpresup, setTotalpresup] = useState(0);
	const [rowsel, setRowSel] = useState();
	async function columnsFetch() {
		var col = await llenarcolumns(flattenedData);
		console.log("col flattenedData ", col);
		// col.push(actionsColumn);

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
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function handleCellClick(event) {
		console.log("estoy en handleCellClic  ", event);
		// var datorenglon = event.row;
		// const paramObjeto = JSON.parse(datorenglon.PresupRenglonParamInt);
		// setPresuptipo(paramObjeto.tipopresup);
		// setDatospot("");
		// setDatospot(paramObjeto);
		// setOpen(true);
	}
	async function fcionotrosdatos(event) {
		console.log("estoy en fcionotrosdatos  ", event);
		// var datorenglon = event.row;
		// const paramObjeto = JSON.parse(datorenglon.PresupRenglonParamInt);
		// setPresuptipo(paramObjeto.tipopresup);
		// setDatospot("");
		// setDatospot(paramObjeto);
		// setOpen(true);
	}
	const handleChange = (event) => {
		const id = event.target.id;
		setOTdatos({ ...otdatos, [id]: event.target.value });
		console.log("id  ", id);
		console.log(
			'<event className="target value"></event>  ',
			event.target.value
		);
		// console.log("Cantidad  ", items[indice].StkItemsCantDisp);
		// console.log("datospot.anchor ", datospot.ancho);
		// console.log("datospot.largo ", datospot.largo);
	};
	const sumaimporte = () => {
		let TotalPresupuesto = 0;

		if (rown === undefined)
			otdatos.renglonespresup.map((renglon) => {
				TotalPresupuesto = renglon[0].PresupRenglonImpItem + TotalPresupuesto;
			});
		else TotalPresupuesto = rown.PresupRenglonImpItem + TotalPresupuesto;
		setTotalpresup(TotalPresupuesto);
		setOTdatos({ ...otdatos, TotalPresupuesto: TotalPresupuesto });
	};

	const loadData = (data) => {
		const newData = [...rows, { id: rows.length + 1, data }];
		setRows(newData);
	};

	const tomaseña = (selectedIndex, event) => {
		setOTdatos({ ...otdatos, senia: event.target.value });
	};
	function CustomToolbar({ onLoadData }) {
		const [inputValue, setInputValue] = useState("");
		const handleLoadData = () => {
			onLoadData(inputValue);
		};
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

				<CurrencyTextField
					id="totalseña"
					size="small"
					label="Importe Seña"
					value={inputValue}
					onChange={(event) => tomaseña(event.target.selectedIndex, event)}
					className={EstTF.tfcurrency}
				></CurrencyTextField>

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

				{/* <Button onClick={handleClose}>Cierra</Button> */}
			</GridToolbarContainer>
		);
	}
	const handleRowSelect = ({ row }) => {
		setRowSel(row);
	};

	const actionsColumn = {
		field: "actions",
		// type: "actions",
		headerName: "ODatos",
		// width: 100,
		// headerClassName: "encabcolumns",
		renderCell: (params) => (
			<Button
				variant="text"
				style={{ color: deepOrange[800] }}
				placeholder="Otros Datos"
				fontSize="large"
				onClick={() => fcionotrosdatos(params)}
				startIcon={<FitbitIcon />}
			/>
		),
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
			newRow.PresupRenglonImpUnit =
				(oldRow.PresupRenglonImpUnit /
					oldRow.PresupRenglonLargo /
					oldRow.PresupRenglonAncho) *
				newRow.PresupRenglonLargo *
				newRow.PresupRenglonAncho;
			newRow.PresupRenglonImpItem =
				newRow.PresupRenglonImpUnit * newRow.PresupRenglonCant;
			setRown(newRow);
			setRowv(oldRow);
			setRown(newRow);
			const response = await mutateRow(newRow);
			// setSnackbar({
			// 	children: "Modificado no confirmado",
			// 	severity: "success",
			// });
			return response;
		},
		[mutateRow]
	);
	return (
		<Grid style={{ height: 400, width: "100%" }}>
			{datospot !== "" && <OTFilaGral datospot={datospot}></OTFilaGral>}
			{presuptipo !== "" && <OTFilasConf datospot={datospot}></OTFilasConf>}

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
				getRowClassName={() => `super-app-theme--Open`}
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
