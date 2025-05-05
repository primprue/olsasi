import { Button, Card, CardContent, Grid, TextField } from '@mui/material';
import React from 'react'
import Estilos from '../../pages/MovStock/LayoutMovStock/Ingreso/Ingreso.module.css'
export default function CardStock() {
    return (
        <>
            <Card>
                <CardContent className={Estilos.card1}>
                    <Grid container>
                        La presentación de la mercadería es :<br></br>
                        {selectedRow.StkRubroPresDes} de {selectedRow.StkRubroPres}{" "}
                        {selectedRow.StkRubroUM}
                        {selectedRow.StkRubroAncho !== 0 &&
                            " por " +
                            selectedRow.StkRubroAncho +
                            " " +
                            selectedRow.StkItemsDesc}
                    </Grid>
                    <br></br>

                    <label> Ingresaron </label>
                    <TextField
                        input={{ maxLength: 4 }}
                        className={Estilos.input}
                        inputRef={textInput}
                        size="small"
                        type="number"
                        id="cantpres"
                        onChange={cambioingreso}
                        value={cantpres}
                        autoFocus
                        onKeyDown={(e1) => {
                            if (e1.key === "Enter") {
                                setTimeout(() => {
                                    textInput1.current.focus();
                                }, 100);
                            }
                        }}
                    />
                    <label> de </label>

                    <TextField
                        input={{ maxLength: 4 }}
                        className={Estilos.input}
                        inputRef={textInput1}
                        size="small"
                        type="number"
                        id="canting"
                        onChange={cambioingreso}
                        value={canting}
                        onKeyDown={(e2) => {
                            if (e2.key === "Enter") {
                                setTimeout(() => {
                                    textInput2.current.focus();
                                }, 100);
                            }
                        }}
                    />

                    <Button
                        onClick={botonok}
                        ref={textInput2}

                    >
                        {" "}
                        TOTAL INGRESADO: {cantpres * canting}
                    </Button>

                </CardContent>
            </Card>
        </>
    )
}
