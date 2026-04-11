import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormLabel } from '@mui/material';
const TildeSiNo = ({ onChange, label, checked, tithelpertext }) => {
    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            onChange(newValue); // Enviar cambio al padre
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