
import React, { useState } from "react";
import { FormControl, FormLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";

const CustomSwitch = ({ value, onChange, opcion1, opcion2, opcion3, titulo1, titulo2, titulo3, tithelpertext }) => {
    const [selectedText, setSelectedText] = useState(titulo1);

    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            onChange(newValue); // Enviar cambio al padre
            setSelectedText(event.target.textContent)
        }
    };
    var colorbackeleg = "#a8aeec";
    var colorbacknoeleg = "#fc2205"
    var colorbacknoeleg2 = "#d8e1e9"

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
                        backgroundColor: value === opcion1 ? colorbackeleg : colorbacknoeleg2,
                        color: value === opcion1 ? "#fff" : colorbackeleg,
                        "&:hover": {
                            backgroundColor: value === opcion1 ? colorbacknoeleg : colorbacknoeleg2,
                        },
                    }}

                >
                    {titulo1}
                </ToggleButton>
                <ToggleButton
                    value={opcion2}
                    sx={{
                        fontWeight: "bold",
                        backgroundColor: value === opcion2 ? colorbackeleg : colorbacknoeleg2,
                        color: value === opcion2 ? "#fff" : colorbackeleg,
                        "&:hover": {
                            backgroundColor: value === opcion2 ? colorbacknoeleg : colorbacknoeleg2,
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
                            backgroundColor: value === opcion3 ? colorbackeleg : colorbacknoeleg2,
                            color: value === opcion3 ? "#fff" : colorbackeleg,
                            "&:hover": {
                                backgroundColor: value === opcion3 ? colorbacknoeleg : colorbacknoeleg2,
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
