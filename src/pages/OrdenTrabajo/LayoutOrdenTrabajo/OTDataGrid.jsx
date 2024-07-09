import React, { useEffect, useState, useContext, useRef } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import swal from "sweetalert";
import { llenarcolumns } from "./columns.jsx";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import OTFilaGral from "../OTFilas/OTFilaGral/OTFilaGral.jsx";
import { Button, Grid } from "@mui/material";
import OTFilasConf from "../OTFilasConf/OTFilasConf.jsx";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FitbitIcon from "@mui/icons-material/Fitbit";
import { common, deepOrange, green, blueGrey } from "@mui/material/colors";
import { CurrencyTextField } from "../../../hooks/useCurrencyTextField.jsx";
import estilotabla from "../../../Styles/Tabla.module.css";
import EstTF from "../../../Styles/TextField.module.css";
import OTGenera from "./OTGenera.jsx";

export default function OTDataGrid() {
	const [columns, setColumns] = useState([]);
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const { datosgenot, setDatosgenot } = useContext(OrdTrabajo);
	const [renglonot, setRenglonot] = useState([]);
	const [renglondef, setRenglondef] = useState();
	const [gridKey, setGridKey] = useState(0);
	const [presuptipo, setPresuptipo] = useState("");
	const [datospot, setDatospot] = useState([]);

	const [totalpresup, setTotalpresup] = useState(0);
	const [abregenera, setAbregenera] = useState(false);

	const handleOpen = () => setAbregenera(true);
	const handleClose = () => setAbregenera(false);
	let datosadicionales = "N";
	let indicenounidad = [];

	const flattenedData = otdatos.renglonespresup.flatMap((nivel1) => nivel1); //flatMap lo que hace es aplanar un array en este caso aplana el array del array
	for (var i = 0; i < flattenedData.length; i++) {
		if (flattenedData[i].PresupRenglonParamInt) {
			let paramObjeto1 = JSON.parse(flattenedData[i].PresupRenglonParamInt);
			console.log(" paramObjeto1 ", flattenedData[i]);
			console.log(" paramObjeto1 ", paramObjeto1.tipopresup);
			if (paramObjeto1.tipopresup !== "UNIDAD") {
				datosadicionales = "S";
				console.log(
					" flattenedData[i].idPresupRenglon ",
					flattenedData[i].idPresupRenglon
				);
				indicenounidad.push(flattenedData[i].idPresupRenglon);
			}
		}
	}
	console.log("indicenounidad  ", indicenounidad);
	async function columnsFetch() {
		var col = await llenarcolumns(flattenedData);
		col.push(actionsColumn);
		setColumns(() => col);
	}

	async function dataFetch() {
		setRenglonot(flattenedData);
	}
	async function initialFetch() {
		dataFetch();
		columnsFetch();
	}

	useEffect(() => {
		initialFetch();
	}, []);

	async function fcionotrosdatos(event) {
		//tomo la fila en la que se hizo click, tiene un id que es el nro de fila
		var datorenglon = event.row;
		console.log("event fcionotrosdatos ", event.row);
		let paramObjeto = JSON.parse(datorenglon.PresupRenglonParamInt);
		paramObjeto.idrenglon = datorenglon.id;
		setPresuptipo(paramObjeto.tipopresup);
		setDatospot(paramObjeto);
	}

	const actionsColumn = {
		field: "actions",
		headerName: "ODatos",
		width: 100,
		headerClassName: "encabcolumns",
		renderCell: (params) => (
			<Button
				variant="text"
				style={
					indicenounidad[params.id - 1] === params.id
						? { color: deepOrange[800] }
						: { color: blueGrey[100] }
				}
				// style={{ color: deepOrange[800] }}
				onClick={
					indicenounidad[params.id - 1] === params.id ? (
						() => fcionotrosdatos(params)
					) : (
						<></>
					)
				}
				startIcon={
					indicenounidad[params.id - 1] === params.id ? <FitbitIcon /> : <></>
				}
			/>
			// (
			// 	<input
			// 		value={
			// 			indicenounidad +
			// 			" " +
			// 			params.id +
			// 			" " +
			// 			indicenounidad[params.id - 1]
			// 		}
			// 	></input>
			// )
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
		} else {
			swal({
				title: "Faltan Datos",
				text: "No cargó los datos suficientes",
				icon: "success",
				button: "OK!",
			});
			handleClose();
		}
		if (datosadicionales === "S" && otdatos.datosconfec === undefined) {
			swal({
				title: "Faltan Datos",
				text: "No cargó los datos suficientes",
				icon: "success",
				button: "OK!",
			});
			handleClose();
		}

		if (renglondef === undefined) {
			setRenglondef(otdatos.renglonespresup);
		}
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
			// }

			setRown(newRow);
			setRowv(oldRow);
			setRown(newRow);
			const response = await mutateRow(newRow);
			const renglonesOT = {
				...otdatos,
				renglonespresup: otdatos.renglonespresup.map((renglon) => {
					renglon.forEach((objeto, index) => {
						if (objeto.id === newRow.id) {
							renglon[index] = newRow;
						}
					});
					return renglon;
				}),
			};

			setOTdatos({ ...otdatos, otrenglon: newRow });
			setRenglondef(renglonesOT.renglonespresup);

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
					renglondef={renglondef}
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
/* 
	const loadData = (data) => {
		// const newData = [...rows, { id: rows.length + 1, data }];
		// setRows(newData);
		const newData = [...renglonot, { id: renglonot.length + 1, data }];
		setRenglonot(newData);
	};

	const handleRowSelect = ({ row }) => {
		setRowSel(row);
	};

const handleChange = (event) => {
		const id = event.target.id;
		setOTdatos({ ...otdatos, [id]: event.target.value });
	};

*/
// if (datosgenot !== "") {
// 	newRow.DatosConf = JSON.stringify(datosgenot);
// } else {
// setSnackbar({
// 	children: "Modificado no confirmado",
// 	severity: "success",
// });

//zotdatos.renglonespresup.splice(newRow.id, 1, newRow);

// otdatos.renglonespresup.map((primer) => {
// 	primer.map((segundo) => {
// 		segundo.id === newRow.id && (segundo = newRow);
// 		console.log("segundo  ", segundo);
// 		setOTdatos({ ...otdatos, renglonespresup: segundo });
// 	});
// });

//setOTdatos({ ...otdatos, renglonpresup: newRow });
