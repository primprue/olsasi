
import  React, {useState} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, FormControl, InputLabel, Select, Input } from "@mui/material";
import { Stack } from '@mui/material';
import { formdata } from './formdata';
import { onRowAdd } from './onRowAdd';
import InputMask from 'react-input-mask';
import {Box} from '@mui/material';
import Mensaje from '../../../../lib/Mensaje';
import { Label } from '@mui/icons-material';

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
      validateInput (event)
      isInputValid ?
      setFormData({
        ...formData,
        [event.target.id]: event.target.value
      }) :  console.log('Is input valid handleChange?', isInputValid);
    };
    const [inputValue, setInputValue] = useState('');
    const [isInputValid, setisInputValid] = useState(false);
    const validateInput = (event) => {
      const inputElement = document.getElementById(event.target.id);
      const isInputValid = inputElement.checkValidity();
      setisInputValid(isInputValid)
      console.log('Is input valid?', isInputValid, ' ', document.getElementById(event.target.id));
    
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
{/*             
               <InputMask mask="(999) 999-9999">
        {(inputProps) => 
      //   <TextField label="Teléfono" {...inputProps} />}
      // </InputMask>

                <TextField
                        // id="lunafield"
                        label=" lunaheaderName"
                        // onChange={handleChange}
                        // color="secondary"
                        // autoFocus
                        // margin="dense"
                        // fullWidth
                        // variant="outlined"
                        // helperText="99-99999999-9"
                        // inputProps={{ inputMode: 'text', pattern: '"\d{2}+-\d{8}+-\d{1}"', title: 'Nros con formato 99-99999999-9'}}
                       // inputProps={{ inputMode: 'text', pattern: '"\d{2}+-\d{8}+-\d{1}"', title: 'Nros con formato 99-99999999-9'}}
                        // inputmode="numeric" pattern="\d*"
                        {...inputProps}
                        maxLength={10}
                        />}
                          </InputMask> */}
            {columns &&
              (
                columns.map((campo, index) =>
                (    
                  columns[index].editable && 
                  (
                    // https://codesandbox.io/s/new-klqlh?file=/src/components/Form/Birthday/index.tsx
                    columns[index].type !== 'singleSelect' && 
                    ( 
                      // <InputMask mask={columns[index].mask}>
                      // {(inputProps) => 
                      <TextField
                      key= {index}
       
                      id={columns[index].field}
                       label={columns[index].headerName}
                       onChange={handleChange}
                      color={columns[index].color}
                      autoFocus
                      onBlur={validateInput}
                      required={columns[index].required}
                      type={columns[index].type}
                      margin="dense"
                      fullWidth
                      variant="outlined"
                      helpertext={''}
                      error={error.error}
                      maxLength={columns[index].maxLength}
                      inputProps={
                        columns[index].inputProps
                      }
                      
                      // inputProps= {columns[index].inputProps}
                      // inputProps={{ inputMode: 'text', pattern: '"[0-9]{0,2}+-[0-9]{0,8}+-[0-9]{0,1}"', title: 'Nros con formato 99-99999999-9'}}

                      />
                        // <TextField
                        //   key= {index}
                        //   id={columns[index].field}
                        //   label={columns[index].headerName}
                        //   // onChange={handleChange}
                        //   color={columns[index].color}
                        //   autoFocus
                        //   required={columns[index].required}
                        //   type={columns[index].type}
                        //   margin="dense"
                        //   fullWidth
                        //   variant="outlined"
                        //   helperText={columns[index].helperText}
                        //   error={error.error}
                        //   maxLength={columns[index].maxLength}
                        //   inputProps={{
                        //     placeholder: 'x-xxxx-xxxxx-xx-x',
                        //     style: {
                        //       textAlign: 'center'
                        //     }
                        //   }}
                        //   // inputProps= {columns[index].inputProps}
                        //   // inputProps={{ inputMode: 'text', pattern: '"[0-9]{0,2}+-[0-9]{0,8}+-[0-9]{0,1}"', title: 'Nros con formato 99-99999999-9'}}

                        //   />
                        // }
                        //    </InputMask>
                      )
                    ||
                      (
               
                        <select 
                          key={index}
                          id={columns[index].field} 
                          // value={selectedOption} 
                          variant="outlined"
                          defaultValue={columns[index].field}
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
                )
              )
            }
  
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

