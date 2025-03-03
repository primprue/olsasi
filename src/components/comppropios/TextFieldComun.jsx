import * as React from 'react';

import estilo from "../../Styles/TextField.module.css";


import { TextField } from "@mui/material";
const TextFieldComun = ({ id, type, label, value, onChange, width = "100%" }) => {

    return (
        <TextField
            className={estilo.textfcantpadchico}
            key={id}
            id={id}
            type={type}
            label={label}
            value={value}
            onChange={(event) => {
                onChange(event.target.value, id);
            }}
            variant="outlined"
            margin="dense"
            fullWidth
            sx={{ width }} // Controla el ancho dinámicamente

        >

        </TextField>
    );
};

export default TextFieldComun;
