import estilo from "../../Styles/TextField.module.css";

import { FormControl, FormLabel, TextField, Tooltip } from "@mui/material";
const TextFieldComunChico = ({ id, type, label, value, onChange, tooltip, width = "80%", ...other }) => {
    return (
        <FormControl fullWidth margin="dense">
            <FormLabel sx={{ color: "green", fontWeight: "bold", fontSize: "12px" }}>{label}</FormLabel>
            <TextField
                {...other}
                className={estilo.textfcomunchico}
                key={id}
                id={id}
                type={type}
                value={value}
                onChange={(event) => {
                    onChange(event.target.value, id);
                }}
                variant="standard"
                margin="dense"
                sx={{
                    width,
                    '& .MuiInputBase-root': {
                        height: '20px', // altura total
                    },
                    '& input': {
                        padding: '8px 10px', // padding del campo de texto
                    },
                    '& .MuiFormHelperText-root': {
                        fontSize: '10px',         // Tamaño del texto
                        color: 'green',            // Color opcional
                        marginTop: '1px',         // Espacio superior
                    },
                }}// Controla el ancho dinámicamente// Controla el ancho dinámicamente

            >

            </TextField>
            {/* // </Tooltip > */}
        </FormControl >
    );
};

export default TextFieldComunChico;
