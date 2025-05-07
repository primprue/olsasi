import React, { useState, useRef } from "react";
import Estilos from "../Ingreso/Ingreso.module.css";
import { Card, CardContent, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

// Context
import { use } from "react";
import { MovStockPantContext } from "../../MovStockPant";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";

// export default function PantallaIngreso({ onClick }) {
const SalidaDisponible = ({ onClick, ...other }) => {
	const { state, setState } = use(MovStockPantContext);

	const [cantidad, setCantidad] = useState(1);
	const [largo, setLargo] = useState(0);
	const [ancho, setAncho] = useState(0);
	const textInput = useRef(null);
	const textInput1 = useRef(null);
	const textInput2 = useRef(null);
	const textInput3 = useRef(null);
	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
		if (id === "cantidad") {
			setCantidad(value);
		}
		if (id === "largo") {
			setLargo(value);
		}
		if (id === "ancho") {
			setAncho(value);
		}

	};

	return (
		<div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
			{state.selectRow &&
				<Card>
					<CardContent className={Estilos.card1}>
						<Grid container>
							La presentación de la mercadería es :<br></br>
							{state.selectRow.StkRubroPresDes} de {state.selectRow.StkRubroPres}{" "}
							{state.selectRow.StkRubroUM}
							{state.selectRow.StkRubroAncho !== 0 &&
								" por " +
								state.selectRow.StkRubroAncho +
								" " +
								state.selectRow.StkItemsDesc}
						</Grid>
						<br></br>

						<label> Ingresaron </label>
						<TextFieldComun
							inputRef={textInput}
							id="cantidad"
							type="number"
							label="Cantidad "
							value={cantidad}
							onChange={handleChange}
							width="100px"
							autoFocus
							onKeyDown={(e1) => {
								if (e1.key === "Enter") {
									setTimeout(() => {
										textInput1.current.focus();
									}, 100);
								}
							}}
						/>

						<TextFieldComun
							input={{ maxLength: 4 }}
							className={Estilos.input}
							inputRef={textInput1}
							size="small"
							type="number"
							id="largo"
							width="100px"
							label="Largo "
							onChange={handleChange}
							value={largo}
							onKeyDown={(e2) => {
								if (e2.key === "Enter") {
									setTimeout(() => {
										textInput2.current.focus();
									}, 100);
								}
							}}
						/>
						<TextFieldComun
							input={{ maxLength: 4 }}
							className={Estilos.input}
							inputRef={textInput2}
							size="small"
							type="number"
							id="ancho"
							width="100px"
							label="Ancho "
							onChange={handleChange}
							value={ancho}
							onKeyDown={(e2) => {
								if (e2.key === "Enter") {
									setTimeout(() => {
										textInput3.current.focus();
									}, 100);
								}
							}}
						/>
						<Button
							onClick={(event) => {
								onClick(event.target.value, cantidad, largo, ancho);
							}}
							ref={textInput3}

						>
							{" "}
							TOTAL A DESCONTAR: {cantidad * (largo / state.selectRow.StkRubroAncho * ancho)}
						</Button>

					</CardContent>
				</Card>
			}
		</div>
		// </div >
	);
}
export default SalidaDisponible;


