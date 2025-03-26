
import React, { useState } from "react";
import { FormControl, FormLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";

const CustomSwitch = ({ value, onChange, opcion1, opcion2, opcion3, titulo1, titulo2, titulo3, tithelpertext }) => {
    const [selectedText, setSelectedText] = useState("");

    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            onChange(newValue); // Enviar cambio al padre
            setSelectedText(event.target.textContent)
        }
    };

    return (
        <FormControl fullWidth margin="dense">
            <FormLabel sx={{ color: "blue", fontWeight: "bold", fontSize: "15px", padding: "5px" }}>{tithelpertext} {selectedText}</FormLabel>
            <ToggleButtonGroup
                value={value} // Controlado por el padre
                exclusive
                onChange={handleChange} // Manejar cambios
                aria-label="Opciones"
            >
                <ToggleButton
                    value={opcion1}
                    sx={{
                        fontWeight: "bold",
                        backgroundColor: value === opcion1 ? "#14415c" : "#1e8bd313",
                        color: value === opcion1 ? "#fff" : "#14415c",
                        "&:hover": {
                            backgroundColor: value === opcion1 ? "#0f3246" : "#1e8bd313",
                        },
                    }}

                >
                    {titulo1}
                </ToggleButton>
                <ToggleButton
                    value={opcion2}
                    sx={{
                        fontWeight: "bold",
                        backgroundColor: value === opcion2 ? "#14415c" : "#1e8bd313",
                        color: value === opcion2 ? "#fff" : "#14415c",
                        "&:hover": {
                            backgroundColor: value === opcion2 ? "#0f3246" : "#1e8bd313",
                        },
                    }}

                >
                    {titulo2}
                </ToggleButton>
                {opcion3 &&
                    <ToggleButton
                        value={opcion3}
                        sx={{
                            fontWeight: "bold",
                            backgroundColor: value === opcion3 ? "#14415c" : "#1e8bd313",
                            color: value === opcion3 ? "#fff" : "#14415c",
                            "&:hover": {
                                backgroundColor: value === opcion3 ? "#0f3246" : "#1e8bd313",
                            },
                        }}
                    >
                        {titulo3}
                    </ToggleButton>}
            </ToggleButtonGroup>
        </FormControl>
    );
};

export default CustomSwitch;
