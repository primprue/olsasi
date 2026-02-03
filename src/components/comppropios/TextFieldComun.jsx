
import estilo from "../../Styles/TextField.module.css";

import { FormControl, FormLabel, TextField } from "@mui/material";
const TextFieldComun = ({ id, type, label, value, onChange, tooltip, width = "100%", ...other }) => {
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
                    width,
                    '& .MuiInputBase-root': {
                        height: '30px', // altura total
                    },
                    '& input': {
                        padding: '8px 10px', // padding del campo de texto
                    },
                }}// Controla el ancho dinámicamente

            >
            </TextField>
        </FormControl >
    );
};

export default TextFieldComun;
