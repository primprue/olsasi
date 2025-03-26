import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormLabel } from '@mui/material';
const TildeSiNo = ({ onChange, label, checked, tithelpertext }) => {
    // const [selectedText, setSelectedText] = React.useState("");

    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            onChange(newValue); // Enviar cambio al padre
            // setSelectedText(event.target.textContent)
        }
    };

    return (
        <FormControl fullWidth margin="dense">
            <FormLabel sx={{ color: "blue", fontWeight: "bold", fontSize: "15px", padding: "5px" }}>{tithelpertext} {label}</FormLabel>

            <FormControlLabel
                value={checked} // Controlado por el padre
                onChange={handleChange} // Manejar cambios
                control={<Checkbox defaultChecked />} label={label} />
        </FormControl>
    );
}
export default TildeSiNo;