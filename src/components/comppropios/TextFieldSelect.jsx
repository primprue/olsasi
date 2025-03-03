import * as React from 'react';

import estilo from "../../Styles/TextFieldSelect.module.css";


import { TextField, MenuItem } from "@mui/material";
const TextFieldSelect = ({ id, label, value, onChange, options, width = "100%" }) => {

    return (
        <TextField
            className={estilo.selectField}
            key={id}
            select
            label={label}
            value={value}
            onChange={(event) => {
                const selectedValue = event.target.value;
                const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || '';
                onChange(selectedValue, id, selectedLabel)
            }}
            variant="outlined"
            margin="dense"
            sx={{ width }} // Controla el ancho dinámicamente
            fullWidth

        >
            {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default TextFieldSelect;
