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
import { common, deepOrange, green, blue } from "@mui/material/colors";
import { CurrencyTextField } from "../../../hooks/useCurrencyTextField.jsx";
import estilotabla from "../../../Styles/Tabla.module.css";
import EstTF from "../../../Styles/TextField.module.css";
import { AlignVerticalCenterSharp } from "@mui/icons-material";
import OTGenera from "./OTGenera tiene cosas que pueden servir.jsx";

export default function OTDataGrid() {
	const [columns, setColumns] = useState([]);
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const { datosgenot, setDatosgenot } = useContext(OrdTrabajo);
	const [renglonot, setRenglonot] = useState([]);
	const [gridKey, setGridKey] = useState(0);
	const [presuptipo, setPresuptipo] = useState("");
	const [datospot, setDatospot] = useState([]);
	const [rowsel, setRowSel] = useState();
	const [totalpresup, setTotalpresup] = useState(0);
	const [abregenera, setAbregenera] = useState(false);
	let senia = 0;
	const [open, setOpen] = useState(false);
	const [marcaaccion, setMarcaAccion] = useState(false);
	const cambiamarcaaccion = () => setMarcaAccion(true);
	const [idfiladc, setidfiladc] = useState();
	const handleOpen = () => setAbregenera(true);
	const handleClose = () => setAbregenera(false);
	const [snackbar, setSnackbar] = React.useState(null);
	const handleCloseSnackbar = () => setSnackbar(null);
	const flattenedData = otdatos.renglonespresup.flatMap((nivel1) => nivel1); //flatMap lo que hace es aplanar un array en este caso aplana el array del array

	async function columnsFetch() {
		var col = await llenarcolumns(flattenedData);
		col.push(actionsColumn);
		setColumns(() => col);
	}

	async function dataFetch() {
		setRenglonot(flattenedData);
		// setRows(flattenedData);
	}
	async function initialFetch() {
		dataFetch();
		columnsFetch();
	}

	useEffect(() => {
		initialFetch();
	}, []);

	async function fcionotrosdatos(event) {
		//console.log("event  ", event);
		//tomo la fila en la que se hizo click, tiene un id que es el nro de fila
		var datorenglon = event.row;
		setidfiladc(event.row);
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
		presuptipo === "UNIDAD" ? handleOpen() : handleClose();

		if (
			Object.keys(datosgenot).length > otdatos.totaldatos ||
			Object.keys(datosgenot).length === 0
		) {
			handleOpen();
		} else handleClose();
	};
	const loadData = (data) => {
		// const newData = [...rows, { id: rows.length + 1, data }];
		// setRows(newData);
		const newData = [...renglonot, { id: renglonot.length + 1, data }];
		setRenglonot(newData);
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

	const cargadatosconf = () => {
		let claves = Object.keys(datosgenot);
		let valores = Object.values(datosgenot);
		for (let i = 0; i < claves.length; i++) {
			const columnasnuevas = {
				headerName: claves[i],
				field: claves[i],
				value: valores[i],
			};
			columns.push(columnasnuevas);
			setColumns(() => columns);
		}
	};

	const processRowUpdate = React.useCallback(
		async (newRow, oldRow) => {
			// if (datosgenot !== "") {
			// 	newRow.DatosConf = JSON.stringify(datosgenot);
			// } else {
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
			// }

			setRown(newRow);
			setRowv(oldRow);
			setRown(newRow);
			const response = await mutateRow(newRow);
			// setSnackbar({
			// 	children: "Modificado no confirmado",
			// 	severity: "success",
			// });

			setOTdatos({ ...otdatos, otrenglon: newRow });

			//zotdatos.renglonespresup.splice(newRow.id, 1, newRow);

			// otdatos.renglonespresup.map((primer) => {
			// 	primer.map((segundo) => {
			// 		segundo.id === newRow.id && (segundo = newRow);
			// 		console.log("segundo  ", segundo);
			// 		setOTdatos({ ...otdatos, renglonespresup: segundo });
			// 	});
			// });

			//setOTdatos({ ...otdatos, renglonpresup: newRow });
			return response;
		},
		[mutateRow]
	);
	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablapresupuestoslot}>
				<CurrencyTextField
					id="Total"
					size="small"
					label="Importe Total"
					value={totalpresup}
					className={EstTF.tfcurrency}
				></CurrencyTextField>

				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<GridToolbarExport></GridToolbarExport>

				<AddShoppingCartIcon
					onClick={cargadatosconf}
					style={{ color: blue[500] }}
					fontSize="medium"
					titleAccess="Sumar"
				/>

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
			{/* {datosgenot !== "" && cargadatosconf()} */}
			{abregenera && (
				<OTGenera
					open={abregenera}
					handleClose={handleClose}
					datospot={datospot}
				></OTGenera>
			)}

			<DataGrid
				columnHeaderHeight={35}
				key={gridKey}
				rows={renglonot}
				columns={columns}
				processRowUpdate={processRowUpdate}
				pageSize={5}
				rowsPerPageOptions={[5]}
				getCellClassName={() => `super-app-theme--Open`}
				getRowClassName={() => `super-app-theme--Open`} //son las propiedades de las filas
				slots={{
					toolbar: CustomToolbar,
				}}
				// slotProps={{
				// 	toolbar: { onLoadData: loadData },
				// }}
			/>
		</Grid>
	);
}
