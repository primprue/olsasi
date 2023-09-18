import React from "react";
import styles from '../styles.module.css'
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import { TextField, Grid } from "@mui/material";
export default function FilaCargaDesc() {
    const { state, setState } = useContext(PresupPantContext);


    const handleChange5 = (event) => {
        setState({ ...state, DetalleRenglon: event.target.value });
        //para que no salga Ancho y Largo en la tabla del presupuesto cuando se carga por descripción
        // setState({ ...state, DescripPresup: '------' });
    };

    const classes = styles;
    return (
        <>
            <Grid container item xs={8}>
                <TextField
                    multiline={true}
                    // inputProps={{ maxLength: 500 }}
                    size="small"
                    variant="outlined"
                    id="DetalleRenglon"
                    margin="dense"
                    label="Descripción "
                    fullWidth
                    value={state.DetalleRenglon}
                    placeholder='no permite los signos % +'
                    helperText='Descripción del trabajo (no permite los signos % +)'
                    onChange={handleChange5}
                    className={classes.textField}
                />

            </Grid>
        </>
    );

}