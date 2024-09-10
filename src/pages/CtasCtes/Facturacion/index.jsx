import React, { useEffect, useState } from "react";
import estilotabla from "../../../Styles/Tabla.module.css";
import {
	Box,
	Button,
	Card,
	CardContent,
	Dialog,
	DialogActions,
	DialogContent,
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useContext } from "react";
import CtasCtesContext from "../../../context/CtasCtesContext.jsx";
import { DataGrid } from "@mui/x-data-grid";
import { clientesleercod } from "../../Tablas/Clientes/ClientesLeerCod";
import { OTRenglonLeer } from "../../OrdenTrabajo/OTMovimiento/TablaMuestraRenglon/OTRenglonLeer";
export default function Facturacion() {
	const { fcdatos, setFCdatos } = useContext(CtasCtesContext);
	const [datosclientes, setDatosClientes] = useState();
	const [renlgones, setRenglones] = useState();

	console.log("fcdatos Facturacion ", fcdatos);
	async function leecliente() {
		const cliente = await clientesleercod(fcdatos.nroordafac.OTEncabCliente);
		console.log("cliente  ", cliente);
		setDatosClientes(cliente);
	}
	async function OTRenglones() {
		const detallefact = await OTRenglonLeer(fcdatos.nroordafac.id);
		console.log("detallefact  ", detallefact);
		setRenglones(detallefact);
	}

	useEffect(() => {
		leecliente();
		OTRenglones();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const Cierra = () => {
		handleClose1();
	};
	return (
		<div>
			{/* <Dialog
				fullWidth={false}
				maxWidth={"xl"}
				open={open1}
				// TransitionComponent={Transition}
				keepMounted
				onClose={handleClose1}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogContent> */}
			{datosclientes && (
				<Card sx={{ marginBottom: 2 }}>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							{datosclientes[0].ClientesDesc.trim()}
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>Domicilio:</strong>{" "}
									{datosclientes[0].ClientesDomicilio.trim()}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>Localidad:</strong>{" "}
									{datosclientes[0].ClientesLoc.trim()}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>Provincia:</strong>{" "}
									{datosclientes[0].ClientesPcia.trim()}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>Cod. Postal:</strong>{" "}
									{datosclientes[0].ClientesCodPos}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>Teléfono:</strong>{" "}
									{datosclientes[0].ClientesTel.trim() || "N/A"}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>Email:</strong>{" "}
									{datosclientes[0].ClientesMail.trim() || "N/A"}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>CUIT:</strong> {datosclientes[0].ClientesCUIT.trim()}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>IVA:</strong> {datosclientes[0].ClientesIVA}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>Tipo:</strong> {datosclientes[0].ClientesTipo}
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography variant="body1">
									<strong>Fecha:</strong>{" "}
									{new Date(
										datosclientes[0].ClientesFecha
									).toLocaleDateString()}
								</Typography>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			)}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>#</TableCell>
							<TableCell>Descripción</TableCell>
							<TableCell align="right">Cantidad</TableCell>
							<TableCell align="right">Largo</TableCell>
							<TableCell align="right">Ancho</TableCell>
							<TableCell align="right">Importe</TableCell>
						</TableRow>
					</TableHead>
					{/* <TableBody>
						{renlgones.map((detalle, index) => (
							<TableRow key={index}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{detalle.OTRenglonDesc.trim()}</TableCell>
								<TableCell align="right">{detalle.OTRenglonCant}</TableCell>
								<TableCell align="right">{detalle.OTRenglonLargo}</TableCell>
								<TableCell align="right">{detalle.OTRenglonAncho}</TableCell>
								<TableCell align="right">
									{(detalle.OTRenglonImpItem / 100).toFixed(2)}
								</TableCell>
							</TableRow>
						))}
					</TableBody> */}
				</Table>
			</TableContainer>
			{/* <Box
						sx={{ height: 500, width: "100%" }}
						id="alert-dialog-slide-description"
					>
						<DataGrid
							columnHeaderHeight={35}
							columns={columns}
							rows={renglon}
						></DataGrid>
					</Box> */}
			{/* </DialogContent>
				<DialogActions>
					<Button
						onClick={Cierra}
						className={estilotabla.botontablamuestrarenglon}
					>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog> */}
		</div>
	);
}
