import { TextField, MenuItem } from "@mui/material";

import estilo from "../../Styles/TextFieldSelect.module.css";
const TextFieldSelectObject = ({ dato, onChange }) => {
    const opciones = Object.keys(dato.opciones || {});
    const ancho = dato.anchocomp ?? "100%";
    return (
        <TextField
            id={dato.nombre}
            size="small"
            select
            onChange={(e) => {
                const value = e.target.value;
                const label = value; // Si querés usar otro texto visible como label, podés ajustarlo
                onChange(value, dato.nombre, label); // similar al otro componente
            }}
            defaultValue={dato.valor || ""}
            label={dato.nombre}

            placeholder={dato.nombre}
            helperText={dato.requerido === "S" ? "Requerido" : "------"}
            variant="outlined"
            margin="dense"
            fullWidth
            // className={estilo.selectField}
            style={{
                background:
                    dato.requerido === "S" ? "#7a7af318" : "#94fcd42b",
                // ancho dinámico aplicado aquí
            }}

            sx={{
                width: `${ancho}%`,
                input: { color: "#00000f" },
                '& .MuiInputBase-root': {
                    height: '35px',
                },
            }}
        >
            {opciones.map((opcion, index) => (
                <MenuItem key={index} value={opcion}>
                    {opcion}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default TextFieldSelectObject;
