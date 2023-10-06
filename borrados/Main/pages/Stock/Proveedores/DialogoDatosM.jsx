
import  React, {useState} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Stack } from '@mui/material';
import { formdata } from './formdata';
import { onRowAdd } from './onRowAdd';
import {Box} from '@mui/material';
 import InputMask from 'react-input-mask';
export function DialogoDatosM( props) {
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

      // console.log('Is input valid handleChange?', isInputValid)
    };

    // const [inputValue, setInputValue] = useState('');
    // const [isInputValid, setisInputValid] = useState(false);
    // const validateInput = (event) => {
    //   const inputElement = document.getElementById(event.target.id);
    //   const isInputValid = inputElement.checkValidity();
    //   setisInputValid(isInputValid)
    //   console.log('Is input valid?', isInputValid, ' ', document.getElementById(event.target.id));
    
    // };


  
    const handleSubmit = (event) => {
      event.preventDefault(); // Evita la recarga de la página al enviar el formulario
      // Aquí puedes realizar cualquier lógica que necesites con los datos del formulario
      onRowAdd(formData)
    };


    //  const ref = useMask({ mask: '+7 (___) ___-__-__', replacement: { _: /\d/ } });



  //   state = {
  //     value: '',
  //     mask: '9999-9999-9999-9999'
  //   }
    
  //  const onChange = (event) => {
  //     var value = event.target.value;
  //     var newState = {
  //       mask: '9999-9999-9999-9999',
  //       value: value
  //     };
  //     if (/^3[47]/.test(value)) {
  //       newState.mask = '9999-999999-99999';
  //     }
  //     setState(newState);
  //   }
 

  //para ver pattern https://bluuweb.dev/04-javascript/08-form.html

        return (
          <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Modificación de información</DialogTitle>
          <DialogContent>
          <label>Fecha de nacimiento:</label>

          {columns &&
              (
                columns.map((campo, index) =>
                (    
                  columns[index].editable && 
                  (
                    // https://codesandbox.io/s/new-klqlh?file=/src/components/Form/Birthday/index.tsx
                    columns[index].type !== 'singleSelect' && 
                    ( 
                    <input
                          key= {index}
                          id={columns[index].field}
                          label={columns[index].headerName}
                          // onChange={handleChange}
                          color={columns[index].color}
                          autoFocus
                          required={columns[index].required}
                          type={columns[index].type}
                          margin="dense"
                          // fullWidth
                          variant="outlined"
                          // helperText={columns[index].helperText}
                          error={error.error}
                          maxLength={columns[index].maxLength}
                          placeholder={columns[index].placeholder}
                          // inputProps={{
                          //   mask:"99-99-9999",
                          //   style: {
                          //     textAlign: 'center'
                          //   }
                          // }}
                    
                          />
                          )))))}
          {/* <InputMask mask="99-99-9999" defaultValue="02-08-2023" /> */}
            {/* <Box
                component="form"
                onSubmit={handleSubmit}
                autoComplete="off"
             >
  
            <Button type="submit" variant="outlined" sx={{mt:2}}>Enviar</Button>
            <Button onClick={handleClose}  variant="outlined" sx={{mt:2 }}>Cancelar</Button>
            </Box> */}
          </DialogContent>
        </Dialog>
        )}
        
        {/* <InputMask {...this.state} onChange={this.onChange} /> */}
