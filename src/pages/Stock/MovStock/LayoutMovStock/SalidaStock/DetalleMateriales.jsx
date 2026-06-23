import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import React from 'react';
import TextFieldComun from '../../../../../components/comppropios/TextFieldComun';
import MuestraMensaje from "../../../../../components/lib/MuestraMensaje.js";
import { Row } from "antd";
import { use } from "react";
import { MovStockPantContext } from "../../MovStockPant";
import { useMemo } from 'react';
import { useState } from 'react';
import Grid from "@mui/material/Grid";
import { Card, CardContent, Typography } from "@mui/material";
import CustomSwitch from "../../../../../components/comppropios/CustomSwitch";
import { useRef } from 'react';
import TextFieldSelect from '../../../../../components/comppropios/TextFieldSelect.jsx';
import { datosingreso } from "../Ingreso/DatosIngreso";
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/material/locale';
export default function DetalleMateriales({ open, handleClose, onClick, totalvendidol }) {
    const { state, setState } = use(MovStockPantContext);
    const textInput = useRef(null);
    const textInput1 = useRef(null);
    const Boton1 = useRef(null);
    const [cantidad, setCantidad] = useState(0);
    const [largo, setLargo] = useState(0);
    let controlvendido = 0.00;
    for (let i = 0; i < state.acumulacambios.length; i++) {
        controlvendido = Math.round(controlvendido + state.acumulacambios[i].tingreso)
    }
    let nodescontar = totalvendidol - controlvendido
    const handleChange = (value, id) => {
        setState({ ...state, [id]: value });
        if (id === "cantidad") {
            setCantidad(value);
        }
        if (id === "largo") {
            setLargo(value);
        }

    };
    let abrrrubro;
    let textdatar = [
        {
            id: "StkRubroAbr",
            label: "Rubro",
            value: '',
            options: state.stkrubro.map((option) => ({
                value: option.StkRubroAbr,
                label: option.StkRubroDesc
            }))
        }

    ];
    let textdatai = [];
    if (state.stkitems !== undefined) {
        if (state.stkitems.length > 0) {
            textdatai = [
                {
                    id: "idStkItems",
                    label: "Items",
                    value: state.idStkItems,
                    options: state.stkitems.map((option) => ({
                        value: option.idStkItems,
                        label: option.StkItemsDesc
                    }))
                }
            ];
        }
    }


    const selectedOption = useMemo(() => state.CambiaTela || "N", [state.CambiaTela]);
    // Función para actualizar la opción seleccionada
    const handleOptionChange = (newOption) => {
        setState({ ...state, CambiaTela: newOption });
    };

    const [selectedValues, setSelectedValues] = useState({});
    async function handleSelectChange(value, id) {
        setState({ ...state, [id]: value });
        setSelectedValues((prev) => ({
            ...prev,
            [id]: value,
        }));
        if (id === "StkRubroAbr") {
            abrrrubro = value;
            const result = await datosingreso(abrrrubro);
            setState({ ...state, stkitems: result, idStkRubroCambio: value });
        }
        if (id === "idStkItems") {

            setState({ ...state, idStkItemsCambio: value });

        }
    };

    return (
        <>
            <Grid sx={{ marginTop: "2px" }}>

                <CustomSwitch
                    value={selectedOption}
                    onChange={handleOptionChange}
                    opcion1={'N'}
                    opcion2={'S'}
                    titulo1={'No'}
                    titulo2={'Si'}
                    tithelpertext={'Cambia Tela : '} />

            </Grid>
            {state.CambiaTela === "S" && (
                <>

                    {textdatar.length > 0 &&

                        textdatar.map(({ id, label, value, options }, index) => (

                            <TextFieldSelect
                                key={index}
                                id={id}
                                label={label}
                                value={selectedValues[id] ?? value ?? ''}
                                onChange={handleSelectChange}
                                options={options}
                                width="400px"
                            />
                        ))}

                    {textdatai.length > 0 &&
                        textdatai.map(({ id, label, value, options }, index) => (
                            <TextFieldSelect
                                key={index}
                                id={id}
                                label={label}
                                value={selectedValues[id] ?? value ?? ''}
                                onChange={handleSelectChange}
                                options={options}
                                width="400px"
                            />
                        ))}
                </>
            )}

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
                <TextFieldComun
                    inputRef={textInput}
                    id="cantidad"
                    size="small"
                    type="number"
                    label="Cantidad de paños"
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
                    inputRef={textInput1}
                    size="small"
                    type="number"
                    id="largo"
                    width="100px"
                    label="Largo"
                    onChange={handleChange}
                    value={largo}

                />
            </div>
            <Typography variant="body1" color="text.primary">
                Falta descontar de lo vendido :&nbsp;
                <span style={{ fontSize: '1.5rem', color: '#1976d2', fontWeight: 'bold' }}>
                    {totalvendidol - controlvendido}
                </span>
                &nbsp;

            </Typography>

            <Button
                disabled={nodescontar < -3}
                onClick={(event) => {
                    onClick(cantidad, largo);
                }}
            >
                TOTAL A DESCONTAR :{cantidad * largo}

            </Button>
        </>
    );
}