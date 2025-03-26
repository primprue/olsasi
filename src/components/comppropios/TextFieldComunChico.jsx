import * as React from 'react';

import estilo from "../../Styles/TextField.module.css";

import { green } from "@mui/material/colors";
import { FormControl, FormLabel, TextField, Tooltip } from "@mui/material";
const TextFieldComunChico = ({ id, type, label, value, onChange, tooltip, width = "80%", ...other }) => {

    return (
        <FormControl fullWidth margin="dense">
            {/* // <Tooltip title={tooltip} arrow sx={{ "& .MuiTooltip-tooltip": { backgroundColor: 'green', color: "white" } }}> */}
            <FormLabel sx={{ color: "green", fontWeight: "bold", fontSize: "12px" }}>{label}</FormLabel>
            <TextField
                {...other}
                className={estilo.textfcomunchico}
                key={id}
                id={id}
                type={type}
                // label={label}
                value={value}
                onChange={(event) => {
                    onChange(event.target.value, id);
                }}
                variant="standard"
                margin="dense"
                // fullWidth
                sx={{ width }} // Controla el ancho dinámicamente

            >

            </TextField>
            {/* // </Tooltip > */}
        </FormControl >
    );
};

export default TextFieldComunChico;
