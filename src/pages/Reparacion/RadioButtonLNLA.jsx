import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import estilo from "../../Styles/Reparacion.module.css";


function RadioButtonLNLA({ lonaAN, handleChange }) {

    return (
        <RadioGroup
            className={estilo.radioGroup}
            row
            size="small"
            name="lonadeAca"
            value={lonaAN}
            onChange={handleChange}
            margin="dense"
        >
            <FormControlLabel
                size="small"
                value="LN"
                classes={{ label: estilo.label }}
                control={<Radio className={estilo.radio} />}
                label="LN"
                labelPlacement="top"
                margin="dense"
            />
            <FormControlLabel
                size="small"
                value="LA"
                classes={{ label: estilo.label }}
                control={<Radio className={estilo.radio} />}
                label="LA"
                labelPlacement="top"
                margin="dense"
            />
        </RadioGroup>

    )
}

export default RadioButtonLNLA