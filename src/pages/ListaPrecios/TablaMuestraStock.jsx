import React, { useState, useEffect } from "react";

import { DialogContent, Dialog } from "@mui/material";
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
			{
				title: "Detalle",
				field: "StkItemsDesc",
				width: "50%",
			},
			{
				title: "Cant.Disponible",
				field: "StkItemsCantDisp",
				type: "numeric",
				width: "25%",
			},
			{
				title: "Cantidad",
				field: "StkItemsCantidad",
				type: "numeric",
				width: "25%",
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
			{/* <DialogTitle id="alert-dialog-slide-title">
        Stock de Items
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description"> */}
			<DialogContent>
				<DataGrid
					// icons={tableIcons}
					// localization={localization}
					title="Stock"
					columns={stock.columns}
					rows={stock.datastock}
				/>
			</DialogContent>
			{/* </DialogContentText>
       </DialogContent>
       <DialogActions>
       
      </DialogActions> */}
			<button onClick={handleClose} className={BotonEstilo.botoncerrar}>
				Cerrar
			</button>
		</Dialog>
	);
}
