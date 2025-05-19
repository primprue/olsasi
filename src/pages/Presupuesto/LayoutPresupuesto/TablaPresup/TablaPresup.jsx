import React, { useState, useEffect } from "react";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarExport,
} from "@mui/x-data-grid";
import { esES } from '@mui/material/locale';
import estilotabla from "../../../../Styles/Tabla.module.css";
import { llenarcolumns } from "./columns.jsx";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { deepOrange, red, blue, green, purple, yellow } from "@mui/material/colors";
import { CurrencyTextField } from "../../../../hooks/useCurrencyTextField";
import EstTF from "../../../../Styles/TextField.module.css";
import FilaCuatro from "../FilaCuatro/FilaCuatro";
import { PresupPreview } from "../PresupPreview";
import FilaAnexo from "../FilaAnexo/FilaAnexo";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant.jsx";
import { Box, Typography } from "@mui/material";


export default function TablaPresup(props) {
	const { state } = use(PresupPant);
	const { datosrenglon, setDatosRenglon } = use(PresupPant);
	const [anexos, setAnexos] = useState({ anexos: false });
	const [ppreview, setPPreview] = useState({ ppreview: false });
	const [filacuatro, setFilacuatro] = useState({ filacuatro: false });
	const [columns, setColumns] = useState([]);
	async function columnsFetch() {
		var col = await llenarcolumns();
		setColumns(() => col);
	}
	// const [suma, setSuma] = useState(0);
	const { suma, setSuma } = use(PresupPant);

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


	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablapresupuestoslot}>
				<Box
					sx={{
						width: "100%",
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'left',
						padding: '8px 0px 8px 0px'
					}}
				>
					<Typography
						className={estilotabla.titulo}
					>
						Presupuesto
					</Typography>

					<Box
						sx={{
							width: "80%",
							display: 'flex',
							justifyContent: 'right',
							alignItems: 'right',
							gap: 2,
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
							titleAccess="Anexos"
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
					</Box></Box>
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
	const sumaacero = () => {

		setSuma(0);
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
						// autoHeight={true}
						localeText={esES}
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
