import React from "react";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import AddToPhotosTwoToneIcon from "@mui/icons-material/AddToPhotosTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import TablasContexto from "../context/TablasContext.jsx";

// export async function actionsColumn() {
export const actionsColumn = (props) => {
	// 	return columnsacc();
	// }

	const handleEdit = (params) => {
		console.log("params handleEdit  ", params.row);
	};

	const handleModifica = (params) => {
		console.log("params handleModifica  ", params.row);
		// setTimeout(() => {
		// 	StkGrupoModificar(params.row);
		// }, 1000);
	};

	const handleDelete = (params) => {
		// setTimeout(() => {
		// 	StkGrupoBorrar(params.row);
		// }, 1000);
		console.log("params handleDelete  ", params.row);
	};

	// function columnsacc() {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "Código",
				field: "id",
				value: 1,
			},
			{
				field: "actions",
				headerName: "Acciones",
				headerClassName: "encabcolumns",
				width: 180,
				renderCell: (params) => (
					<ButtonGroup>
						<Button
							variant="contained"
							color="success"
							onClick={() => handleModifica(params)}
							// console.log("handleModifica(params)")}
							startIcon={<CheckCircleTwoToneIcon />}
						/>
						<Button
							variant="contained"
							color="warning"
							// onClick={() => onRowDelete(params.row)}
							onClick={() => handleDelete(params)}
							startIcon={<DeleteForeverTwoToneIcon />}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={() => handleEdit(params)}
							//console.log("handleEdit(params)")}
							startIcon={<AddToPhotosTwoToneIcon />}
						/>
					</ButtonGroup>
				),
			},
		]);
	});
};

// export const stkGrupoLeerRedRubro = () => {
// 	return new Promise((resolve) => {
// 		const url = IpServidor + "/stkgrupoleerredrubros";
// 		request
// 			.get(url)
// 			.set("Content-Type", "application/json")
// 			.then((res) => {
// 				const stkgrupo = JSON.parse(res.text);
// 				resolve(stkgrupo);
// 			});
// 	});
// };
