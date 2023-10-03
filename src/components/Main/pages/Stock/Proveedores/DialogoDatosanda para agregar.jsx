
import  React, {useState} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Stack } from '@mui/material';
import { formdata } from './formdata';
import { onRowAdd } from './onRowAdd';
import InputMask from 'react-input-mask';
import {Box} from '@mui/material';

export function DialogoDatos( props) {
  const {open, columns,  handleClose} = props
    const [selectedOption, setSelectedOption] =  React.useState('');
    const [formData, setFormData] = useState({formdata});
    const [error, setError] = useState({
      error: false,
      message: "",
    });

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
      setFormData({
        ...formData,
        [event.target.id]: event.target.value
      });
    };
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value
      });
    };
    const handleSubmit = (event) => {
      event.preventDefault(); // Evita la recarga de la página al enviar el formulario
      // Aquí puedes realizar cualquier lógica que necesites con los datos del formulario
      onRowAdd(formData)
    };
  
        return (
          <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Ingreso de información</DialogTitle>
          <DialogContent>
            {/* <form onSubmit={handleSubmit}> */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
             >
            {/* <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            > */}
    
          {columns &&
            columns.map((campo, index) =>
                (    
                 columns[index].editable && 
                (
                columns[index].type !== 'singleSelect' && 
                  ( 
                 
                   <TextField
                    key= {index}
                    id={columns[index].field}
                    label={columns[index].headerName}
                    onChange={handleChange}
                    color={columns[index].color}
                    autoFocus
                    required={columns[index].required}
                    type={columns[index].type}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText={columns[index].helperText}
                    error={error.error}
                    />
                  )
                ||
                  (
                    <label htmlFor="selectField">Selecciona una opción:</label>,
                    <select 
                      id={columns[index].field} 
                      value={selectedOption} 
                      required={columns[index].required}
                      onChange={handleSelectChange}>
                      <option key="" value="">{columns[index].headerName}</option>
                      {columns[index].valueOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    )
                )
                )
  
         )}
  
            {/* </Stack> */}
            <Button type="submit" variant="outlined" sx={{mt:2}}>Enviar</Button>
            {/* </form> */}
            <Button onClick={handleClose}  variant="outlined" sx={{mt:2 }}>Cancelar</Button>
            </Box>
          </DialogContent>
          {/* <DialogActions>
           
          </DialogActions> */}
        </Dialog>
        )}

