import React, { useState, useEffect } from "react";

import { DialogContent, Dialog, DialogTitle } from "@mui/material";
// Dialogfrom, , Slide
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

import { stkitemsred } from "./StkItemsRed";
import BotonEstilo from "../../Styles/Boton.module.css";
// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

export default function TablaMuestraStock(props) {
	const { open, handleClose, Grupo, Rubro } = props;
	const [stock, setStock] = useState({
		columns: [
			// {
			// 	headerName: "id",
			// 	field: "id",
			// 	width: 50,
			// },
			{
				headerName: "Detalle",
				field: "StkItemsDesc",
				headerClassName: "encabcolumns",
				width: 250,
				align: "left",
			},
			{
				headerName: "Cant.Disponible",
				field: "StkItemsCantDisp",
				type: "numeric",
				headerClassName: "encabcolumns",
				width: 100,
				align: "right",
			},
			{
				headerName: "Cantidad",
				field: "StkItemsCantidad",
				type: "numeric",
				headerClassName: "encabcolumns",
				width: 100,
				align: "right",
			},
		],

		datastock: [],
	});

	async function stkitemsreduc(Grupo, Rubro) {
		const result = await stkitemsred(Grupo, Rubro);
		setStock({ ...stock, datastock: result });
	}

	useEffect(() => {
		stkitemsreduc(Grupo, Rubro);
	}, [Grupo, Rubro]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Dialog
			open={open}
			// TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle id="alert-dialog-slide-title">Stock de Items</DialogTitle>
			<DataGrid
				sx={{
					height: 600,
					width: "100%",
					"& .encabcolumns": {
						backgroundColor: "rgba(235, 240, 241, 0.3)",
						textJustify: "center",
						fontSize: "15px",
						fontWeight: "bold",
						color: "rgba(15, 6, 145, 1)",
						borderRadius: 1,
						boxShadow: 3,
						bgcolor: "rgba(235, 240, 241, 0.3)",
						height: 10,
					},
				}}
				title="Stock"
				columns={stock.columns}
				rows={stock.datastock}
			/>

			<button onClick={handleClose} className={BotonEstilo.botoncerrar}>
				Cerrar
			</button>
		</Dialog>
	);
}
