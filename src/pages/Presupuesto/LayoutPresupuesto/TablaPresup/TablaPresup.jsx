import React, { useState, useEffect } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import { esES } from '@mui/x-data-grid/locales';
import estilotabla from "../../../../Styles/Tabla.module.css";
import { llenarcolumns } from "./columns.jsx";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { deepOrange, red, green, purple, yellow } from "@mui/material/colors";
import { CurrencyTextField } from "../../../../hooks/useCurrencyTextField";
import EstTF from "../../../../Styles/TextField.module.css";
import FilaCuatro from "../FilaCuatro/FilaCuatro";
import FilaAnexo from "../FilaAnexo/FilaAnexo";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant.jsx";
import { Box, Typography } from "@mui/material";


export default function TablaPresup(props) {
	const { state } = use(PresupPant);
	const { datosrenglon, setDatosRenglon } = use(PresupPant);
	const [anexos, setAnexos] = useState({ anexos: false });
	const [filacuatro, setFilacuatro] = useState({ filacuatro: false });
	const [columns, setColumns] = useState([]);
	async function columnsFetch() {
		var col = await llenarcolumns();
		setColumns(() => col);
	}
	const { suma, setSuma } = use(PresupPant);
	let queestilo = 'mn'
	if (datosrenglon.length !== 0) {
		queestilo = datosrenglon[0].dcalculo[0].minmay;
	} else {
		queestilo = 'mn';
	}
	const BorraFila = () => {
		setDatosRenglon((prevDatos) => {
			// 1. Filtramos todos los elementos que NO están en la selección
			const nuevosDatos = prevDatos.filter(
				(item) => !rowSelectionModel.includes(item.id)
			);
			// 2. Reasignamos el ID basado en el nuevo índice (+1 para que empiece en 1)
			return nuevosDatos.map((item, index) => ({
				...item,
				id: index + 1
			}));
		});
	};

	const Reindexar = () => {

		// 2. Reasignamos el ID basado en el nuevo índice (+1 para que empiece en 1)
		const Datosreindexados = datosrenglon.map((item, index) => ({
			...item,
			id: index + 1
		}));
		setDatosRenglon(Datosreindexados);
		setFilacuatro({ filacuatro: true })
	};
	useEffect(() => {
		columnsFetch();
	}, [datosrenglon]); // eslint-disable-line react-hooks/exhaustive-deps



	function CustomToolbar() {
		return (
			<GridToolbarContainer
				className={queestilo === 'mn' ? estilotabla.tablapresupuestoslot : estilotabla.tablapresupuestoslot1}>
				<Box
					sx={{
						width: "100%",
						display: 'static',
						justifyContent: 'center',
						alignItems: 'left',
						padding: '2px 0px 2px 0px'
					}}
				>
					<Typography
						className={queestilo === 'mn' ? estilotabla.titulo : estilotabla.titulomay}
					>
						{queestilo === 'mn' ? 'MINORISTA' : 'MAYORISTA'}
					</Typography>

					<Box
						sx={{
							width: "95%",
							display: 'flex',
							justifyContent: 'right',
							alignItems: 'right',
							gap: 4,
						}}
					>
						{state.renglonanexo.length !== 0 && <h3>Tiene Anexos</h3>}
						<RemoveShoppingCartIcon
							onClick={sumaacero}
							style={{ color: yellow[900] }}
							fontSize="medium"
							titleAccess="Suma a Cero"
						/>
						<CurrencyTextField
							id="Total"
							size="small"
							label="Total"
							value={suma}
							className={EstTF.tfcurrency}
						></CurrencyTextField>
						<b></b>
						<b></b>
						<b></b>
						<b></b>
						{/* <GridToolbarExport></GridToolbarExport> */}
						<GridToolbarExport
							slotProps={{
								tooltip: {
									title: "Cuando se exporta, en LibreCalc, las columnas con números, en Campos Tipo de Columna, elegir Inglés (US)",
									arrow: true
									// Aquí MUI se encarga de que el tooltip se cierre automáticamente al abrir el menú
								}
							}}
						/>
						<DeleteForeverRoundedIcon
							onClick={BorraFila}
							style={{ color: red[500] }}
							fontSize="medium"
							titleAccess="Borrar"
						/>

						<AddShoppingCartIcon
							onClick={sumar}
							style={{ color: green[500] }}
							fontSize="medium"
							titleAccess="Sumar"
						/>

						<AttachFileIcon
							onClick={() => setAnexos({ anexos: true })}
							style={{ color: purple[500] }}
							fontSize="medium"
							titleAccess="Anexos"
						/>
						<SaveAsTwoToneIcon
							onClick={Reindexar}
							style={{ color: deepOrange[500] }}
							fontSize="medium"
							titleAccess="Vista Previa y Grabar"
						/>


					</Box></Box>
			</GridToolbarContainer>
		);
	}
	const sumar = () => {
		var totalpresup = 0;
		var i = 0;
		while (i < datosrenglon.length) {
			totalpresup = totalpresup * 1 + datosrenglon[i].ImpItem * 1;
			i++;
		}
		setSuma(totalpresup);
	};
	const sumaacero = () => {

		setSuma(0);
	};
	const handleClose = () => {
		setFilacuatro(false);
	};

	const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
	return (
		<div>
			<div style={{ margin: 20, height: 600, width: "90%" }}>
				{datosrenglon !== undefined ? (
					<DataGrid
						className={estilotabla.tablapresupuesto}
						rows={datosrenglon}
						columns={columns.filter(
							(column) => column.headerName !== "datospresup"
						)}
						{...datosrenglon}
						onRowSelectionModelChange={(newRowSelectionModel) => {
							setRowSelectionModel(newRowSelectionModel);
						}}
						shape="rounded"
						slots={{
							toolbar: CustomToolbar,
						}}
						getRowHeight={() => 'auto'}
						localeText={esES.components.MuiDataGrid.defaultProps.localeText}
						initialState={{
							...datosrenglon.initialState,
							pagination: {
								...datosrenglon.initialState?.pagination,
								paginationModel: {
									pageSize: 25,
								},
							},
						}}
					/>
				) : (
					""
				)}
			</div>
			<FilaAnexo open={anexos.anexos} setOpen={setAnexos} />
			<FilaCuatro
				open={filacuatro.filacuatro}
				datos={datosrenglon}
				maymin={props.maymin}
				suma={suma}
				setOpen={setFilacuatro}
				handleClose={handleClose}
			/>
		</div>
	);
}
