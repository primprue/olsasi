import { useContext, useState, useRef, useEffect } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import { Button, Dialog, DialogContent } from "@mui/material";
import { format, parse } from "date-fns";
import { OTGrabar } from "./OTGrabar.jsx";
import html2pdf from "html2pdf.js";

export default function OTGenera(props) {
	const { open, handleClose, datospot } = props;
	const { otdatos } = useContext(OrdTrabajo);
	const [pdfUrl, setPdfUrl] = useState(null);
	const [numeroOT, setNumeroOT] = useState(0);
	const reportTemplateRef = useRef(null);

	const formatCurrency = (value) => {
		return new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
		}).format(value || 0);
	};

	const arreglodef = [];
	if (otdatos && otdatos.renglonespresup) {
		for (let i = 0; i < otdatos.renglonespresup.length; i++) {
			arreglodef.push(otdatos.renglonespresup[i][0]);
			if (otdatos.datosconfec && otdatos.datosconfec.idrenglon === otdatos.renglonespresup[i][0].id) {
				arreglodef.push(otdatos.datosconfec);
			}
		}
	}
	const fechaUtc = otdatos?.FechaPromesa ? parse(otdatos.FechaPromesa, "yyyy-MM-dd", new Date()) : new Date();
	const FechaProm = format(fechaUtc, "dd/MM/yyyy");
	const FechaHoy = format(new Date(), "dd/MM/yyyy");

	const tipoorden = otdatos?.datosencab?.[0]?.[0]?.PresupEncabMayMin === "mn" ? "   Minorista  " : "   Mayorista  ";
	const arregloencab = otdatos?.datosencab && otdatos.datosencab.length > 1 ? otdatos.datosencab[1][0] : otdatos?.datosencab?.[0]?.[0] || {};

	let headerBgColor = "#ffffff";
	if (datospot?.minmay === "my") {
		headerBgColor = "rgb(191, 216, 242)";
	} else if (datospot?.minmay === "mn" && datospot?.tipopresup !== "CONFECCIONADA") {
		headerBgColor = "rgb(235, 244, 129)";
	}

	const textoImpI = "Importe c/IVA";
	const textoImp = "Importe s/IVA";
	let valorImpI = formatCurrency(0);
	let valorImp = formatCurrency(0);

	if (otdatos?.OTEncabconIVA === "N") {
		valorImp = formatCurrency(otdatos?.TotalPresupuestoSIVA);
	} else {
		if (otdatos?.TotalPresupuesto) valorImpI = formatCurrency(otdatos.TotalPresupuesto);
		if (otdatos?.TotalPresupuestoSIVA) valorImp = formatCurrency(otdatos.TotalPresupuestoSIVA);
	}

	const textoSeniaI = "Importe Seña";
	const valorSeniaI = otdatos?.ImporteSenia ? formatCurrency(otdatos.ImporteSenia) : formatCurrency(0);
	const arreglorenglon = arreglodef.filter((elemento) =>
		// Object.keys(elemento).some((prop) => prop.startsWith("PresupRenglon") || prop.startsWith("idrenglon"))
		Object.keys(elemento).some((prop) => prop.startsWith("PresupRenglon"))
		// || prop.startsWith("idrenglon"))
	);
	async function OTGraba() {
		const nroOT = await OTGrabar(otdatos);
		setNumeroOT(nroOT);
	}

	const agregarCeros = (numero, digitos) => {
		return numero.toString().padStart(digitos, "0");
	};

	async function creaPDF() {
		const element = reportTemplateRef.current;

		const opt = {
			margin: 0,
			filename: `OT_Nro_${numeroOT}.pdf`,
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2, useCORS: true, logging: false },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
		};

		html2pdf().set(opt).from(element).outputPdf('blob').then((blob) => {
			if (pdfUrl) URL.revokeObjectURL(pdfUrl);
			const url = URL.createObjectURL(blob);
			setPdfUrl(url);

			if (numeroOT !== 0) {
				const clienteNombre = arregloencab.PresupEncabCliente || arregloencab.ClientesDesc || "Cliente";
				const numeroOTcero = agregarCeros(numeroOT, 6);
				const nombrearch = `OT Nro ${numeroOTcero} ${clienteNombre.trim()}.pdf`;
				sendPDFViaWebSocket(blob, nombrearch);
			}
		});
	}

	const sendPDFViaWebSocket = (blobData, nombrearch) => {
		const socket = new WebSocket("ws://localhost:3000");
		const payload = {
			action: "save",
			nombrearch: nombrearch,
			pdfData: blobData,
		};
		socket.onopen = () => {
			socket.send(JSON.stringify(payload));
		};
		socket.onmessage = () => {
			socket.close();
		};
	};

	useEffect(() => {
		return () => { if (pdfUrl) URL.revokeObjectURL(pdfUrl); };
	}, [pdfUrl]);

	return (
		<Dialog open={open} onClose={handleClose} maxWidth={false} fullWidth={true}>
			<DialogContent>
				<div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
					<Button variant="contained" onClick={OTGraba}>Graba</Button>
					<Button variant="contained" color="secondary" onClick={creaPDF}>Genera PDF</Button>
					<Button variant="outlined" onClick={handleClose}>Cierra</Button>
				</div>

				{/* CONTENEDOR GENERADOR CON ALTO TOTAL REDUCIDO PARA PREVENIR 2DA HOJA */}
				<div style={{ position: 'absolute', left: '-9999px', top: '0' }}>
					<div ref={reportTemplateRef} style={{
						boxSizing: 'border-box',
						padding: '10mm 15mm 0mm 15mm', // Removido el padding inferior para ganar recorrido real abajo
						fontFamily: 'Arial, sans-serif',
						width: '210mm',
						height: '293mm', // Reducido levemente de 297 a 293 para eliminar el salto fantasma de html2pdf
						position: 'relative',
						backgroundColor: '#fff',
						color: '#000',
						fontSize: '11px'
					}}>

						{/* ENCABEZADOS Y DATOS */}
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: headerBgColor, padding: '6px', border: '1px solid #000', marginBottom: '8px' }}>
							<h2 style={{ margin: 0, fontSize: '15px' }}>Orden de Trabajo Nro: {numeroOT}</h2>
							<h3 style={{ margin: 0, fontSize: '13px' }}>{tipoorden}</h3>
						</div>

						<table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '8px', fontSize: '12px' }}>
							<thead>
								<tr style={{ backgroundColor: '#f2f2f2' }}>
									<th style={{ border: '1px solid #000', padding: '4px', textAlign: 'left' }}>Cliente</th>
									<th style={{ border: '1px solid #000', padding: '4px', textAlign: 'left' }}>Telefono</th>
									<th style={{ border: '1px solid #000', padding: '4px', textAlign: 'left' }}>Localidad</th>
									<th style={{ border: '1px solid #000', padding: '4px', textAlign: 'left' }}>CUIT</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td style={{ border: '1px solid #000', padding: '4px' }}>
										{arregloencab.idClientes ? `(${arregloencab.idClientes}) ${arregloencab.ClientesDesc}` : `(     ) ${arregloencab.PresupEncabCliente || ''}`}
									</td>
									<td style={{ border: '1px solid #000', padding: '4px' }}>{arregloencab.ClientesTel || ''}</td>
									<td style={{ border: '1px solid #000', padding: '4px' }}>{arregloencab.ClientesLoc || ''}</td>
									<td style={{ border: '1px solid #000', padding: '4px' }}>{arregloencab.ClientesCUIT || ''}</td>
								</tr>
							</tbody>
						</table>

						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '12px', marginBottom: '8px', border: '1px solid #000', padding: '5px' }}>
							<div><strong>Transporte:</strong> {otdatos?.transporte?.TransporteDesc ? otdatos.transporte.TransporteDesc.substring(0, 20) : ''}</div>
							<div><strong>Presup. Nro:</strong> {otdatos?.datosencab?.[0]?.[0]?.idPresupEncab || ''}</div>
							<div><strong>Fecha:</strong> {FechaHoy}</div>
							<div><strong>Promesa:</strong> {FechaProm}</div>
							<div><strong>O.C.:</strong> {otdatos?.OTEncabOC || ''}</div>
							<div><strong>Detalles:</strong> {otdatos?.OTEncabDetalles || ''}</div>
						</div>

						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', marginBottom: '8px', fontSize: '11px', textAlign: 'center' }}>
							<div style={{ border: '1px solid #000', padding: '3px' }}><strong>{textoImpI}</strong><br />{valorImpI}</div>
							<div style={{ border: '1px solid #000', padding: '3px' }}><strong>{textoImp}</strong><br />{valorImp}</div>
							<div style={{ border: '1px solid #000', padding: '3px' }}><strong>{textoSeniaI}</strong><br />{valorSeniaI}</div>
							<div style={{ border: '1px solid #000', padding: '3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>Remito</div>
							<div style={{ border: '1px solid #000', padding: '3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>Fact.Cta.Cte.</div>
							<div style={{ border: '1px solid #000', padding: '3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>Fact.Contado</div>
							<div style={{ border: '1px solid #000', padding: '3px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>Recibo</div>
						</div>

						{/* CUERPO DINÁMICO */}
						<table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '6px', fontSize: '10px' }}>
							<tbody>
								{arreglorenglon.map((row, idx) =>
									<tr key={idx}>
										<td style={{ border: '1px solid #000', padding: '4px' }}>{row.PresupRenglonCant}</td>
										<td style={{ border: '1px solid #000', padding: '4px' }}>{row.PresupRenglonDesc}</td>
										<td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>{row.PresupRenglonLargo}</td>
										<td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>{row.PresupRenglonAncho}</td>
										<td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>{formatCurrency(row.PresupRenglonImpUnit)}</td>
									</tr>

								)}
							</tbody>
						</table>

						{/* BLOQUE DINÁMICO DE DATOSCONFEC */}
						{otdatos?.datosconfec && (
							<div style={{ marginBottom: '8px', padding: '5px', border: '1px solid #000', fontSize: '11px', backgroundColor: '#fcfcfc' }}>
								<div style={{ fontWeight: 'bold', marginBottom: '3px', borderBottom: '1px dashed #000', paddingBottom: '2px' }}>Detalles de Confección:</div>
								<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
									{Object.entries(otdatos.datosconfec).map(([key, value]) => {
										if (key === 'idrenglon') return null;
										return (
											<div key={key}>
												<strong>{key}:</strong> {value}
											</div>
										);
									})}
								</div>
							</div>
						)}
						<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginBottom: '4px' }}>
							<thead>
								<tr style={{ backgroundColor: '#e6e6e6' }}>
									<th style={{ border: '1px solid #000', padding: '3px', width: '100%', textAlign: 'canter' }}>Otros</th>
								</tr>
							</thead>
							<tbody>
								{Array.from({ length: 3 }).map((_, i) => (
									<tr key={i}>
										<td style={{ height: '20px', border: '0.1px solid #000' }}></td>
										<td style={{ border: '0.1px solid #000' }}></td>
									</tr>
								))}
							</tbody>
						</table>
						{/* Cuadrícula de Materiales Utilizados */}
						<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px', marginBottom: '4px' }}>
							<thead>
								<tr style={{ backgroundColor: '#e6e6e6' }}>
									<th style={{ border: '1px solid #000', padding: '3px', width: '5%', textAlign: 'canter' }}>Cant</th>
									<th style={{ border: '1px solid #000', padding: '3px', width: '85%', textAlign: 'canter' }}>MATERIALES UTILIZADOS</th>
									<th style={{ border: '1px solid #000', padding: '3px', width: '10%', textAlign: 'canter' }}>Importe</th>
								</tr>
							</thead>
							<tbody>
								{Array.from({ length: 15 }).map((_, i) => (
									<tr key={i}>
										<td style={{ height: '20px', border: '0.1px solid #000' }}></td>
										<td style={{ border: '0.1px solid #000' }}></td>
										<td style={{ border: '0.1px solid #000' }}></td>
									</tr>
								))}
							</tbody>
						</table>


						{/* PIE DE PÁGINA CLAVADO EN EL FONDO ABSOLUTO (SIN MÁRGENES EXTRA) */}
						<div style={{
							position: 'absolute',
							bottom: '0mm', // Pegado completamente al final físico para encajar en el fichador
							left: '15mm',
							right: '15mm'
						}}>
							{/* <div style={{ border: '1px solid #000', padding: '5px', fontSize: '10px', marginBottom: '4px' }}>
								<strong>Pago :</strong>
							</div> */}

							{/* GRILLA DE FICHADO: Abierta abajo (sin bordes inferiores) */}
							<div style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(10, 1fr)',
								borderTop: '1px solid #000',
								borderLeft: '1px solid #000',
								borderRight: '1px solid #000',
								fontSize: '11px',
								// backgroundColor: '#f9f9f9'
							}}>
								{["Otros", "Embaló", "Plaqueta", "Letras", "Ojales", "Dobladillo", "Chicotes", "Refuerzos", "Unir Paños", "Cor.Paños"].map((item, index) => (
									<div key={index} style={{
										borderRight: index < 9 ? '1px solid #000' : 'none',
										display: 'flex',
										flexDirection: 'column',
										height: '125px', // Altura perfecta para la ranura del reloj marcador
										boxSizing: 'border-box',
										position: 'relative'
									}}>
										{/* Texto alineado estrictamente a la derecha del carril */}
										<div style={{
											position: 'absolute',
											top: '10px', // Altura media del recorrido
											right: '0.1px', // Clavado en el lateral derecho de la columna
											width: '20px',
											display: 'flex',
											justifyContent: 'left'
										}}>
											<span style={{
												fontStyle: 'italic',
												whiteSpace: 'nowrap',
												transform: 'rotate(90deg)',
												transformOrigin: 'left center',
												fontSize: '9px',
												textAlign: 'left'
											}}>
												{item}
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

					</div>
				</div>

				{/* VISTA PREVIA */}
				{pdfUrl && (
					<embed src={pdfUrl} type="application/pdf" width="100%" height="700px" style={{ marginTop: '10px' }} />
				)}
			</DialogContent>
		</Dialog>
	);
}