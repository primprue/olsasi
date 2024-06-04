import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import { llenarcolumns } from "./columns.jsx";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import OTFilaGral from "../OTFilas/OTFilaGral/OTFilaGral.jsx";
import { Button, Grid, TextField } from "@mui/material";
import OTFilasConf from "../OTFilasConf/OTFilasConf.jsx";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import { deepOrange, red, blue, green, purple } from "@mui/material/colors";
import { CurrencyTextField } from "../../../hooks/useCurrencyTextField.jsx";
import estilotabla from "../../../Styles/Tabla.module.css";
import EstTF from "../../../Styles/TextField.module.css";
export default function OTDataGrid({ data }) {
	const [columns, setColumns] = useState([]);
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const [rows, setRows] = useState([]);

	const [open, setOpen] = useState(false);
	const [gridKey, setGridKey] = useState(0);
	// Transforma el arreglo multidimensional en un arreglo plano
	const [presuptipo, setPresuptipo] = useState("");
	const [datospot, setDatospot] = useState("");
	const flattenedData = data.flatMap((nivel1) => nivel1); //flatMap lo que hace es aplanar un array en este caso aplana el array del array
	const [totalpresup, setTotalpresup] = useState(0);
	const [rowsel, setRowSel] = useState();
	async function columnsFetch() {
		var col = await llenarcolumns(flattenedData);
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
		var datorenglon = event.row;
		const paramObjeto = JSON.parse(datorenglon.PresupRenglonParamInt);
		setPresuptipo(paramObjeto.tipopresup);
		setDatospot("");
		setDatospot(paramObjeto);
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
		otdatos.renglonespresup.map((renglon) => {
			TotalPresupuesto = renglon[0].PresupRenglonImpItem + TotalPresupuesto;
			console.log("renglon  ", renglon[0].PresupRenglonImpItem);
			console.log("TotalPresupuesto  ", TotalPresupuesto);
		});
		setTotalpresup(TotalPresupuesto);
		setOTdatos({ ...otdatos, TotalPresupuesto: TotalPresupuesto });
	};

	const loadData = (data) => {
		const newData = [...rows, { id: rows.length + 1, data }];
		setRows(newData);
	};

	const tomaseña = (selectedIndex, event) => {
		setOTdatos({ ...otdatos, senia: event.target.value });
		console.log("selectedIndex  ", selectedIndex);
		console.log(" event.target.id;  ", event.target.id);
		console.log("event.target.value  ", event.target.value);
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
					//	onChange={(e) => setInputValue(e.target.value)}
					// onChange={tomaseña}
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
		console.log("viene aca  ", row);
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
				//onCellClick={handleRowSelect}
				onCellClick={handleCellClick}
				pageSize={5}
				// onRowClick={handleCellClick}
				// onRowClick={handleRowSelect}
				rowsPerPageOptions={[5]}
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
