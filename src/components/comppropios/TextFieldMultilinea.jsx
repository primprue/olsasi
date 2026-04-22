
import estilo from "../../Styles/TextField.module.css";

import { FormControl, FormLabel, TextField } from "@mui/material";
const TextFieldMultilinea = ({ id, type, label, value, onChange, tooltip, limite, width = "100%", ...other }) => {
    return (
        <FormControl fullWidth margin="dense">
            <FormLabel sx={{ color: "blue", fontWeight: "bold", fontSize: "15px" }}>{label}</FormLabel>
            <TextField
                {...other}
                className={estilo.textfcantidad}
                key={id}
                id={id}
                type={type}
                value={value}
                onChange={(event) => {
                    onChange(event.target.value, id);
                }}
                variant="outlined"
                margin="dense"
                sx={{
                    width
                }}
                // Bloquea físicamente que se escriba más allá del límite
                slotProps={{
                    htmlInput: {
                        maxLength: limite,
                    },
                }}
                helperText={`Lleva escrito ${value.length} de ${limite} caracteres máximos, que puede escribir`}
                // Cambia el color a error cuando llega al límite (opcional)
                error={value.length === limite}

            >
            </TextField>
        </FormControl >
    );
};

export default TextFieldMultilinea;
