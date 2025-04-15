import React, { useEffect, useState } from "react";

import estilo from "../../Styles/TextFieldSelect.module.css";


import { TextField, MenuItem, FormControl, FormLabel } from "@mui/material";
const TextFieldSelect = ({ id, label, value, onChange, options, width = "100%", ...other }) => {
    const [selectedValue, setSelectedValue] = useState(value ?? id); // Si value es null/undefined, usa id

    useEffect(() => {
        setSelectedValue(value ?? id); // Si value cambia, actualizar estado
    }, [value, id]);

    return (
        <FormControl fullWidth margin="dense">
            <FormLabel sx={{ color: "blue", fontWeight: "bold", fontSize: "15px" }}>{label}</FormLabel>
            <TextField
                className={estilo.selectField}
                key={id}
                select
                {...other}
                value={selectedValue}
                onChange={(event) => {
                    const newValue = event.target.value;
                    setSelectedValue(newValue);
                    const selectedLabel = options.find(opt => opt.value === newValue)?.label || "";
                    onChange(newValue, id, selectedLabel);
                }}
                margin="dense"
                sx={{ width }}
                fullWidth
            >

                {options.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>
    );
};

export default TextFieldSelect;
