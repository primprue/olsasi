import React, { useEffect, useState, useContext, useRef } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import swal from "sweetalert";
import Alert from "@mui/material/Alert";
import { llenarcolumns } from "./columns.jsx";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import OTFilaGral from "../OTFilas/OTFilaGral/OTFilaGral.jsx";
import { Button, Grid, TextField } from "@mui/material";
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
	const [totalpresupsiva, setTotalpresupsiva] = useState(0);
	const [seniapresup, setSeniapresup] = useState();
	const [fechaprom, setFechaProm] = useState();
	const [abregenera, setAbregenera] = useState(false);

	const handleOpen = () => setAbregenera(true);
	const handleClose = () => setAbregenera(false);
	let datosadicionales = "N";
	let indicenounidad = [];
	let tieneiva = "";
	const flattenedData = otdatos.renglonespresup.flatMap((nivel1) => nivel1);
	//flatMap lo que hace es aplanar un array en este caso aplana el array del array
	for (var i = 0; i < flattenedData.length; i++) {
		if (flattenedData[i].PresupRenglonParamInt) {
			let paramObjeto1 = JSON.parse(flattenedData[i].PresupRenglonParamInt);
			tieneiva = paramObjeto1.ivasn;

			if (paramObjeto1.tipopresup !== "UNIDAD") {
				datosadicionales = "S";
				//creo el array con el mismo indice que id del renglón del preuspuesto para poder manejar el ícono de agregar datos en la tabla
				indicenounidad[flattenedData[i].idPresupRenglon] =
					flattenedData[i].idPresupRenglon;
			}
		}
	}
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
		// if (indicenounidad[event.row.id - 1] === event.row.id) {
		if (indicenounidad[event.row.id] === event.row.id) {
			var datorenglon = event.row;

			let paramObjeto = JSON.parse(datorenglon.PresupRenglonParamInt);
			paramObjeto.idrenglon = datorenglon.id;
			setPresuptipo(paramObjeto.tipopresup);
			setDatospot(paramObjeto);
		}
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
					indicenounidad[params.id] === params.row.idPresupRenglon
						? { color: deepOrange[800] }
						: { color: blueGrey[100] }
				}
				onClick={() => fcionotrosdatos(params)}
				startIcon={
					indicenounidad[params.id] === params.row.idPresupRenglon ? (
						<FitbitIcon />
					) : (
						<></>
					)
				}
			/>
		),
	};

	const handleChange = (event) => {
		let impsenia = event.target.value;
		setSeniapresup(impsenia);

		setOTdatos({ ...otdatos, ImporteSenia: impsenia });
	};
	const handleChangeFP = (event) => {
		const fechahoy = new Date().toJSON().slice(0, 10);

		if (fechahoy > event.target.value) {
			swal({
				title: "Fecha Promesa",
				text: "La fecha de promesa no puede ser menor a la de hoy",
				icon: "success",
				button: "OK!",
			});
			<Alert severity="warning">
				La fecha de promesa no puede ser menor a la de hoy
			</Alert>;
		}
		//setFechaProm(event.target.value);
		setOTdatos({ ...otdatos, FechaPromesa: event.target.value });
	};
	const handleChange1 = (event) => {};
	const sumaimporte = () => {
		let TotalPresupuesto = 0;
		let TotalPresupuestoSIVA = 0;
		// if (rown === undefined)
		otdatos.renglonespresup.map((renglon) => {
			//TotalPresupuesto += renglon[0].PresupRenglonImpItem;
			if (tieneiva === "CIVA") {
				TotalPresupuestoSIVA += Math.round(
					renglon[0].PresupRenglonImpItem / 1.21,
					2
				);
				TotalPresupuesto += Math.round(renglon[0].PresupRenglonImpItem);
			} else {
				TotalPresupuesto += Math.round(
					renglon[0].PresupRenglonImpItem * 1.21,
					2
				);
				TotalPresupuestoSIVA += Math.round(renglon[0].PresupRenglonImpItem, 2);
			}
		});

		setOTdatos({
			...otdatos,
			TotalPresupuesto,
			TotalPresupuestoSIVA,
			OTsinIVA: "N",
		});
	};

	const sacaiva = () => {
		setOTdatos({
			...otdatos,
			OTsinIVA: "S",
		});
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
		if (otdatos.FechaPromesa === undefined) {
			swal({
				title: "Fecha de Promesa",
				text: "Por favor elija fecha de Promesa",
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
				{/* <CurrencyTextField
					id="Total"
					size="small"
					label="Importe Total"
					value={totalpresup}
					className={EstTF.tfcurrencyI}
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
			{abregenera && (
				<OTGenera
					open={abregenera}
					handleClose={handleClose}
					datospot={datospot}
					renglondef={renglondef}
				></OTGenera>
			)}
			<Grid container spacing={2}>
				{/* {tieneiva === "CIVA" && ( */}
				<Grid item>
					<h5>Importe total c/IVA</h5>
					<CurrencyTextField
						id="Total"
						size="small"
						label="Importe Total"
						value={otdatos.TotalPresupuesto}
						onChange={handleChange1}
						className={EstTF.tfcurrencyI}
					></CurrencyTextField>
				</Grid>
				{/* )}{" "} */}
				<Grid item>
					<h5>Importe s/IVA</h5>
					<CurrencyTextField
						id="TotalSIVA"
						size="small"
						label="Importe SIVA"
						value={otdatos.TotalPresupuestoSIVA}
						onChange={handleChange1}
						className={EstTF.tfcurrencyI}
					></CurrencyTextField>
				</Grid>
				<Button onClick={sacaiva}>.</Button>
				<Grid item>
					<h5>Importe Seña</h5>
					<CurrencyTextField
						id="seniapresup"
						size="small"
						label="Importe Seña"
						value={seniapresup}
						onChange={handleChange}
						className={EstTF.tfcurrencyI}
					></CurrencyTextField>
				</Grid>
				<Grid item>
					<h5>Fecha Promesa</h5>
					<TextField
						id="fechaprom"
						size="small"
						type="date"
						value={fechaprom}
						onChange={handleChangeFP}
					></TextField>
				</Grid>
			</Grid>
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
