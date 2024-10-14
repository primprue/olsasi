import React, { useState, useEffect } from "react";
import { Grid, Box, TextField } from "@mui/material";
import {
	DataGrid,
	esES,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import estilotabla from "../../../../Styles/Tabla.module.css";
import { llenarcolumns } from "./columns.jsx";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import { deepOrange, red, blue, green, purple } from "@mui/material/colors";
import { CurrencyTextField } from "../../../../hooks/useCurrencyTextField";
import EstTF from "../../../../Styles/TextField.module.css";
import FilaCuatro from "../FilaCuatro/FilaCuatro";
import { PresupPreview } from "../PresupPreview";
import FilaAnexo from "../FilaAnexo/FilaAnexo";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant.jsx";

// export function CustomFooterStatusComponent(suma) {
// 	const sumar = suma.suma;
// 	return (
// 		<Box sx={{ p: 1, display: "flex" }}>
// 			<TextField value={sumar}></TextField>

// 			{/* Status {props.status} */}
// 		</Box>
// 	);
// }
export default function TablaPresup(props) {
	const { state } = useContext(PresupPant);
	const { datosrenglon, setDatosRenglon } = useContext(PresupPant);
	const [anexos, setAnexos] = useState({ anexos: false });
	const [ppreview, setPPreview] = useState({ ppreview: false });
	const [filacuatro, setFilacuatro] = useState({ filacuatro: false });
	const [columns, setColumns] = useState([]);

	async function columnsFetch() {
		var col = await llenarcolumns();
		setColumns(() => col);
	}
	const [suma, setSuma] = useState(0);

	const BorraFila = () => {
		// var datosrenglon1 = [];
		if (rowSelectionModel.length !== 0) {
			rowSelectionModel.map((row) =>
				setDatosRenglon(datosrenglon.filter((rows) => rows.id !== row))
			);
		}
	};
	useEffect(() => {
		columnsFetch();
	}, [datosrenglon]); // eslint-disable-line react-hooks/exhaustive-deps

	// const handleDeleteClick = (id: GridRowId) => () => {
	// 	setRows(rows.filter((row) => row.id !== id));
	// };
	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablapresupuestoslot}>
				{/* <GridToolbarColumnsButton /> */}
				{/* <GridToolbarFilterButton /> */}
				{/* <GridToolbarDensitySelector /> */}
				{state.renglonanexo.length !== 0 && <h3>Tiene Anexos</h3>}
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
				<GridToolbarExport></GridToolbarExport>
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
				{/* onAnimationStartnClick={() => setAnexos({ anexos: true })} */}
				<AttachFileIcon
					onClick={() => setAnexos({ anexos: true })}
					style={{ color: purple[500] }}
					fontSize="medium"
					titleAccess="Sumar"
				/>
				<SaveAsTwoToneIcon
					onClick={() => setFilacuatro({ filacuatro: true })}
					style={{ color: deepOrange[500] }}
					fontSize="medium"
					titleAccess="Grabar"
				/>
				<LocalPrintshopRoundedIcon
					onClick={() => setPPreview({ ppreview: true })}
					style={{ color: blue[500] }}
					fontSize="medium"
					titleAccess="Imprimir"
				/>
				{/* <Button onClick={handleClose}>Cierra</Button> */}
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
	const handleClose = () => {
		setFilacuatro(false);
	};
	const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
	return (
		<div>
			<div style={{ margin: 80, height: 300, width: "100%" }}>
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
						autoHeight={true}
						localeText={esES.components.MuiDataGrid.defaultProps.localeText}
						shape="rounded"
						slots={{
							toolbar: CustomToolbar,
						}}
					/>
				) : (
					""
				)}
			</div>
			<FilaAnexo open={anexos.anexos} setOpen={setAnexos} />;
			<PresupPreview
				open={ppreview.ppreview}
				setOpen={setPPreview}
			></PresupPreview>
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
