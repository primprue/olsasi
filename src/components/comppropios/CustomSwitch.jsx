
import React, { useState } from "react";
import { FormControl, FormLabel, ToggleButton, ToggleButtonGroup } from "@mui/material";

const CustomSwitch = ({ value, onChange, opcion1, opcion2, opcion3, titulo1, titulo2, titulo3, ancho, tithelpertext }) => {
    const [selectedText, setSelectedText] = useState(titulo1);

    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            onChange(newValue); // Enviar cambio al padre
            setSelectedText(event.target.textContent)
        }
    };
    var colorbackeleg = "#a8aeecfd";
    var colorbacknoeleg = "#05a1fc7a"
    var colorbacknoeleg2 = "#ecf3f8be"
    var colorbacknoeleg3 = "#0e046d"
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
                        color: value === opcion1 ? colorbacknoeleg3 : colorbackeleg,
                        width: ancho,  // Ancho del botón
                        height: "50px",  // Alto del botón
                        border: `2px solid ${value === opcion1 ? colorbacknoeleg3 : colorbackeleg}`, // Borde en hover
                        borderRadius: "5px", // Agregar bordes redondeados para evitar solapamientos

                        "&:hover": {
                            backgroundColor: value === opcion1 ? colorbacknoeleg : colorbacknoeleg2,
                            color: value === opcion1 ? colorbacknoeleg3 : colorbackeleg, // Asegura que cambie en hover también
                        },
                        "&.Mui-selected": {
                            color: colorbacknoeleg3, // Color cuando está seleccionado
                        },
                        "&.Mui-selected:hover": {
                            color: colorbacknoeleg3, // Color cuando está seleccionado y en hover
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
                        color: value === opcion2 ? colorbacknoeleg3 : colorbackeleg,
                        width: ancho,  // Ancho del botón
                        height: "50px",  // Alto del botón
                        border: `2px solid ${value === opcion2 ? colorbacknoeleg3 : colorbackeleg}`, // Borde en hover
                        borderRadius: "5px", // Agregar bordes redondeados para evitar solapamientos
                        "&:hover": {
                            backgroundColor: value === opcion1 ? colorbacknoeleg : colorbacknoeleg2,
                            color: value === opcion1 ? colorbacknoeleg3 : colorbackeleg, // Asegura que cambie en hover también
                        },
                        "&.Mui-selected": {
                            color: colorbacknoeleg3, // Color cuando está seleccionado
                        },
                        "&.Mui-selected:hover": {
                            color: colorbacknoeleg3, // Color cuando está seleccionado y en hover
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
                            color: value === opcion3 ? colorbacknoeleg3 : colorbackeleg,
                            width: ancho,  // Ancho del botón
                            height: "50px",  // Alto del botón
                            border: `2px solid ${value === opcion3 ? colorbacknoeleg3 : colorbackeleg}`, // Borde en hover
                            borderRadius: "5px", // Agregar bordes redondeados para evitar solapamientos
                            "&:hover": {
                                backgroundColor: value === opcion1 ? colorbacknoeleg : colorbacknoeleg2,
                                color: value === opcion1 ? colorbacknoeleg3 : colorbackeleg, // Asegura que cambie en hover también
                            },
                            "&.Mui-selected": {
                                color: colorbacknoeleg3, // Color cuando está seleccionado
                            },
                            "&.Mui-selected:hover": {
                                color: colorbacknoeleg3, // Color cuando está seleccionado y en hover
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
