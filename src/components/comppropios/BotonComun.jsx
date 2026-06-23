import estilo from "../../Styles/Boton.module.css";

import { FormControl, FormLabel, Button } from "@mui/material";
const BotonComun = ({ id, inputRef, disabled, onClick, texto, ...other }) => {
    return (
        <FormControl fullWidth margin="dense">
            {/* <FormLabel sx={{ color: "blue", fontWeight: "bold", fontSize: "15px" }}>{label}</FormLabel> */}
            <Button
                className={estilo.botonfincargadatos}
                disabled={disabled}
                onClick={onClick}
            >
                {texto}
            </Button>
        </FormControl >
    );
};

export default BotonComun;

