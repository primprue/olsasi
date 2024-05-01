import React, { useEffect, useState } from "react";

import { presupcalculador } from "../../PresupCalculador";
import { filaanexosColumns } from "./filaanexosColumns";
import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";
import CloseIcon from "@mui/icons-material/Close";
import { CurrencyTextField } from "../../../../hooks/useCurrencyTextField";
// import filaanexosData from "./filaanexosData";
import { Dialog, IconButton, TextField, Box } from "@mui/material";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

import Estilos from "../../../../Styles/Tabla.module.css";
import EstDial from "../../../../Styles/Dialog.module.css";
import EstTF from "../../../../Styles/TextField.module.css";
import { DataGrid, esES, GridToolbarContainer } from "@mui/x-data-grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { blue, green, purple, teal, red } from "@mui/material/colors";

let idContador = 0;

export default function FilaAnexo(props) {
	const { state, setState } = useContext(PresupPant);
	const [columns, setColumns] = useState([]);

	const [snackbar, setSnackbar] = React.useState(null);
	const [datosanexo, setDatosAnexo] = useState([]);
	const [sumaanexo, setSumaAnexo] = React.useState(0.0);
	const [infoanexo, setInfoAnexo] = React.useState();
	const [anexomed, setAnexomed] = React.useState(0.0);
	// const [detalle, setDetalle] = useState('')
	const [rows, setRows] = useState([]);
	async function columnsFetch() {
		const col = await filaanexosColumns();
		// col.push(actionsColumn);
		setColumns(() => col);
	}

	async function cargaAnexos() {
		const tipoanexo = await leePresupConfTipoLeeAnexo("S", "");
		setDatosAnexo(tipoanexo);
	}

	var dcalculo = [
		{
			StkRubroAbr: state.StkRubroAbr,
			minmay: state.PresupMnMy,
			cantidad: state.PresupCantidad,
			largo: state.PresupLargo,
			ancho: state.PresupAncho,
			tipoconf: state.PresupCsSs,
			tipoojale: state.PresupOB,
			ivasn: state.PresupIVA,
		},
	];

	function sumar() {
		var nombre = "";
		var importetotal = 0.0;
		var i = 0;
		while (i < rows.length) {
			importetotal = importetotal + rows[i].importet;
			if (rows[i].PresupConfTipoImprime === "S") {
				nombre =
					nombre +
					" c/" +
					rows[i].AnexoMedida +
					" " +
					rows[i].PresupConfTipoDesc;
			}
			i++;
		}
		setSumaAnexo(importetotal);

		var datospresup = [
			{
				StkRubroDesc: nombre,
				ImpItemAnexo: importetotal,
			},
		];
		setState({ ...state, renglonanexo: datospresup[0] });
		//  cierraanexos();
	}

	function cierraanexos() {
		props.setOpen({ anexos: false });
	}
	function cierraanexos1() {
		setState({ ...state, renglonanexo: [] });
		props.setOpen({ anexos: false });
	}

	async function initialFetch() {
		columnsFetch();
		cargaAnexos();
		// createRandomRow();
	}

	const BorraFila = () => {
		const updatedRows = rows.filter((row) => row.id !== selectedRow.id);
		setRows(updatedRows);
		setSelectedRow("");
	};

	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				{textdata.map((data) => (
					<TextField
						key={data.id}
						id={data.id}
						size="small"
						inputProps={{ maxLength: 3 }}
						select
						label={data.label}
						value={data.value}
						onChange={handleChange}
						SelectProps={{ native: true }}
						className={EstTF.tfselect}
					>
						{data.mapeo}
					</TextField>
				))}

				<AddShoppingCartIcon
					onClick={sumar}
					style={{ color: green[500] }}
					fontSize="medium"
					titleAccess="Suma Anexo"
				/>

				<CurrencyTextField
					size="small"
					label="Total"
					value={sumaanexo}
					className={EstTF.tfcurrency}
				></CurrencyTextField>
				{/* <IconButton onClick={cierraanexos}> */}
				<RuleFolderIcon
					onClick={cierraanexos}
					style={{ color: green[500] }}
					fontSize="medium"
					titleAccess="Cierra y Suma Anexos"
				/>
				{/* </IconButton> */}
				<CloseIcon
					onClick={cierraanexos1}
					style={{ color: red[500] }}
					fontSize="medium"
					titleAccess="Cierra no Suma Anexos"
				></CloseIcon>
			</GridToolbarContainer>
		);
	}

	async function handleChange(event) {
		idContador++;
		var anexoelegido = event.target.value;
		var datoscalculos = JSON.stringify(dcalculo);
		const datosrenglon1 = await presupcalculador(
			// "", "",
			"",
			datoscalculos,
			anexoelegido
		);
		setInfoAnexo(datosrenglon1);
		const datoincial = {
			id: idContador,
			PresupConfTipoDesc: event.target.value,
			AnexoMedida: 1,
			importea: datosrenglon1[0],
			PresupConfTipoImprime: datosrenglon1[1],
			importet: datosrenglon1[0],
		};
		setRows([...rows, datoincial]);
	}

	const handleCellEditCommit = (params) => {
		const updatedRows = rows.map((row) =>
			row.id === params.id
				? {
						...row,
						importet: params.importea * params.AnexoMedida,
						AnexoMedida: params.AnexoMedida,
				  }
				: row
		);
		setRows(updatedRows);
	};

	const [selectedRow, setSelectedRow] = useState(null);
	const handleRowSelection = (params) => {
		// Maneja el evento de selección de fila y actualiza el estado con la fila seleccionada
		setSelectedRow(params.row);
	};

	const handleProcessRowUpdateError = React.useCallback((error) => {
		setSnackbar({ children: error.message, severity: "error" });
	}, []);

	const textdata = [
		{
			id: "AnexoEleg",
			label: "Anexo",
			value: state.NroConfTipo,
			mapeo: (
				<>
					<option></option>
					{datosanexo.map((option) => (
						<option key={option.NroConfTipo} value={option.PresupConfTipoDesc}>
							{option.PresupConfTipoDesc}
						</option>
					))}
				</>
			),
		},
	];

	return (
		<>
			<Dialog
				open={props.open}
				maxWidth="xl" // Puedes ajustar el tamaño aquí (sm, md, lg, xl, etc.)
				className={EstDial.dialogoanexo}
			>
				<Box open={props.open} className={Estilos.tablaanexo}>
					<div className={Estilos.tablaanexo}>
						<h4 className={EstDial.h4}>
							Anexo Seleccionado :<b> </b>
							{selectedRow && (
								<>
									{selectedRow.PresupConfTipoDesc},
									<IconButton onClick={BorraFila}>
										<DeleteForeverIcon
											style={{ color: red[500] }}
											fontSize="medium"
											titleAccess="Borra Seleccionado"
										/>
									</IconButton>
								</>
							)}
						</h4>
						<DataGrid
							disableColumnMenu={true}
							rows={rows}
							columns={columns}
							autoHeight={true}
							localeText={esES.components.MuiDataGrid.defaultProps.localeText}
							onProcessRowUpdateError={handleProcessRowUpdateError}
							processRowUpdate={(params) => handleCellEditCommit(params)}
							onRowClick={handleRowSelection}
							// checkboxSelection
							slots={{
								toolbar: CustomToolbar,
							}}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 10 },
								},
							}}
							pageSizeOptions={[10, 10]}
							// slots={{
							// 	toolbar: CustomToolbar,
							// }}
							// onCellEditCommit={(params) => {
							// 	const updatedRows = rows.map((row) =>
							// 		row.id === params.id
							// 			? { ...row, [params.field]: params.props.value }
							// 			: row
							// 	);
							// 	setRows(updatedRows);
							// }}
						/>

						{/* <button onClick={handleAddRow}>Add Row</button> */}
						{/* <DataGrid
							columns={columns}
							rows={datosanexo}
							autoPageSize
							slots={{
								toolbar: CustomToolbar,
							}}
						></DataGrid> */}
					</div>
					{/* </Grid> */}
				</Box>
			</Dialog>
		</>
	);
}
/*

	<MaterialTable
						localization={localization}
						style={props.style}
						title={
							<CurrencyTextField
								label={
									<tableIcons.AddShoppingCart
										style={{ color: teal[500] }}
										onClick={() => sumar()}
									/>
								}
								//label='Suma Total'
								color="#FF0000"
								value={sumaanexo}
							>
								{" "}
							</CurrencyTextField>
						}
						icons={tableIcons}
						columns={columns}
						data={datosanexo}
						options={{
							search: false,
							addRowPosition: "first",
							actionsColumnIndex: -1,
							pagesize: 2,
						}}
						actions={[
							{
								icon: () => <tableIcons.Cancel style={{ color: red[500] }} />,
								tooltip: "Cerrar",
								isFreeAction: true,
								onClick: () => cierraanexos1(),
							},
						]}
						editable={{
							onRowAdd: (newData) =>
								new Promise((resolve) => {
									setTimeout(() => {
										var datoscalculos = JSON.stringify(dcalculo);
										var datosrenglon1 = presupcalculador(
											// "", "",
											"",
											datoscalculos,
											newData.PresupConfTipoDesc
										);

										Promise.resolve(datosrenglon1).then((jsonResults) => {
											newData.importea = jsonResults[0] * newData.AnexoMedida;
											newData.PresupConfTipoImprime = jsonResults[1];
											//   newData.importea = jsonResults * newData.AnexoMedida
											setDatosAnexo([...datosanexo, newData]);
										});
										resolve();
									}, 1000);
								}),

							onRowUpdate: (newData, oldData) =>
								new Promise((resolve) => {
									setTimeout(() => {
										const dataUpdate = [...datosanexo];
										var datoscalculos = JSON.stringify(dcalculo);
										var datosrenglon1 = presupcalculador(
											// "", "",
											"",
											datoscalculos,
											newData.PresupConfTipoDesc
										);
										Promise.resolve(datosrenglon1).then((jsonResults) => {
											//   newData.importea = jsonResults[0].ImpUnitario * newData.AnexoMedida
											// newData.importea = jsonResults * newData.AnexoMedida
											newData.importea = jsonResults[0] * newData.AnexoMedida;
											newData.PresupConfTipoImprime = jsonResults[1];
											const index = oldData.tableData.id;
											dataUpdate[index] = newData;

											setDatosAnexo([...dataUpdate]);
										});
										resolve();
									}, 1000);
								}),

							onRowDelete: (oldData) =>
								new Promise((resolve) => {
									setTimeout(() => {
										const dataDelete = [...datosanexo];
										const index = oldData.tableData.id;
										dataDelete.splice(index, 1);
										setDatosAnexo([...dataDelete]);

										resolve();
									}, 1000);
								}),
						}}
					/>
*/
