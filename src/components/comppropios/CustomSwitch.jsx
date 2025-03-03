
import React from "react";
import { FormHelperText, ToggleButton, ToggleButtonGroup } from "@mui/material";

const CustomSwitch = ({ value, onChange, opcion1, opcion2, titulo1, titulo2, tithelpertext }) => {
    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            onChange(newValue); // Enviar cambio al padre
        }
    };

    return (
        <>
            <FormHelperText sx={{ color: "blue", fontWeight: "bold", fontSize: "15px" }}>{tithelpertext} {value}</FormHelperText>
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
            </ToggleButtonGroup>
        </>
    );
};

export default CustomSwitch;
