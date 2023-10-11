import React, { useEffect, useState } from "react";
// import { localization } from "../../../lib/material-table/localization";
// import "../../../../Styles/TableHeader.css";

import { Grid, Box, Button, IconButton, TextField } from "@mui/material";
import {
	DataGrid,
	esES,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
	GridFooter,
} from "@mui/x-data-grid";
import estilotabla from "../../Styles/Tabla.module.css";
import { CurrencyTextField } from "../../hooks/useCurrencyTextField";
import PropTypes from "prop-types";
import { leelistaprecios } from "./LeeListaPrecios";
import Imprimir from "../Impresion/Imprimir";
import TablaMuestraStock from "./TablaMuestraStock";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import { deepOrange, red, blue, green, purple } from "@mui/material/colors";
// , { MTableToolbar }
// const useStyles = makeStyles({
//   root: {
//     width: "100%",
//   },
//   container: {
//     maxHeight: 440,
//   },
// });

import { useContext } from "react";
import StaticContexto from "../../context/StaticContext";

export default function ListaPrecios() {
	// const classes = useStyles();

	const { setValor } = useContext(StaticContexto);
	const [paramitems, setParamItems] = useState({
		idGrupo: 0,
		idRubro: 0,
	});
	// const [state, setState] = useState(initial_state);

	const [open, setOpen] = React.useState(false);
	const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
	const [lista, setLista] = useState({
		columns: [
			{
				title: "id",
				field: "id",
			},
			{
				title: "Grupo",
				field: "GrupoDesc",
			},
			{
				title: "Descripción",
				field: "StkRubroDesc",
			},
			{
				title: "Ancho",
				field: "StkRubroAncho",
				type: "numeric",
			},
			{
				title: "Presentación",
				field: "StkRubroPres",
				type: "numeric",
			},
			{
				title: "Público",
				// align: "center",
				// align: "right",
				field: "PPub",
				width: 50,
				type: "currency",
				// render: (rowData) => <span>$ {rowData.PPub}</span>, //Agregado para poder poner las columnas en linea con los datos
			},
			{
				title: "Mayorista",
				field: "PMay",
				type: "currency",
				width: 50,
			},
			{
				title: "Fecha",
				field: "StkRubroFecha",
			},
		],

		data: [],
	});

	async function leerlistaprecios() {
		const result = await leelistaprecios();
		setLista({ ...lista, data: result });
		console.log("resul  ", result);
	}

	useEffect(() => {
		leerlistaprecios();
		setValor("Lista de Precios");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const openApp = (event, StkRubroCodGrp, idStkRubro) => {
		//  console.log('event  ', event)
		setParamItems({ paramitems, idGrupo: StkRubroCodGrp, idRubro: idStkRubro });
		handleClickOpen();
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setParamItems({ paramitems, idGrupo: 0, idRubro: 0 });
		setOpen(false);
	};
	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablapresupuestoslot}>
				{/* <GridToolbarColumnsButton /> */}
				{/* <GridToolbarFilterButton /> */}
				{/* <GridToolbarDensitySelector /> */}
				{/* {state.renglonanexo.length !== 0 && <h3>Tiene Anexos</h3>} */}
				<CurrencyTextField
					size="small"
					label="Total"
					// value={suma}
					// className={EstTF.tfcurrency}
				></CurrencyTextField>
				<b></b>
				<b></b>
				<b></b>
				<b></b>
				<GridToolbarExport></GridToolbarExport>

				{/* onAnimationStartnClick={() => setAnexos({ anexos: true })} */}
				<AttachFileIcon
					onClick={() => setAnexos({ anexos: true })}
					style={{ color: purple[500] }}
					fontSize="medium"
					titleAccess="Sumar"
				/>
				<LocalPrintshopRoundedIcon
					onClick={() => setPPreview({ ppreview: true })}
					style={{ color: blue[500] }}
					fontSize="medium"
					titleAccess="Imprimir"
				/>
				<SaveAsTwoToneIcon
					onClick={() => setFilacuatro({ filacuatro: true })}
					style={{ color: deepOrange[500] }}
					fontSize="medium"
					titleAccess="Grabar"
				/>
				{/* <Button onClick={handleClose}>Cierra</Button> */}
			</GridToolbarContainer>
		);
	}
	return (
		// <Paper className={classes.root}>
		<div>
			<DataGrid
				title="Lista de Precios"
				columns={lista.columns}
				rows={lista.data}
				slots={{
					toolbar: CustomToolbar,
				}}
			/>
			{/* <Imprimir
				columns={lista.columns}
				datos={lista.data}
				open={imprimirTF.imprimir}
				setOpen={setImprimirTF}
			/> */}
			<TablaMuestraStock
				open={open}
				handleClose={handleClose}
				Grupo={paramitems.idGrupo}
				Rubro={paramitems.idRubro}
			/>
			{/* </Paper> */}
		</div>
	);
}
