import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {MenuItem} from '@mui/material';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridToolbar,
  esES,
  GridColumnMenu,
  GridPanel,
  GridRowEditStopReasons,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { leerproveedores } from "./ProveedoresLeer.jsx";
import { ProveedoresModificar } from './ProveedoresModificar.jsx';
import { llenarcolumns } from './columns';
import { useEffect } from 'react';
import { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Stack, Slider } from '@mui/material';


function CustomUserItem(props) {
  const { myCustomHandler, myCustomValue } = props;
  return (
    <MenuItem onClick={myCustomHandler}>
      <ListItemIcon>
        <AddIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>{myCustomValue}</ListItemText>
    </MenuItem>
  );
}
function CustomColumnMenu(props) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        // Add new item
        columnMenuUserItem: CustomUserItem,
      }}
      slotProps={{
        columnMenuUserItem: {
          // set `displayOrder` for new item
          displayOrder: 15,
          // pass additional props
          myCustomValue: 'Do custom action',
          myCustomHandler: () => alert('Custom handler fired'),
        },
      }}
    />
  );
}


function EditToolbar(props) {
        const handleClick = () => {
          setElige('Alta')
        const [open, setOpen] = React.useState(true);
        const {selectedRows, setRowModesModel,
        setRows, columns} = props;
        var datosedit = selectedRows
        abredialogo(open, columns)
      console.log('open  ', open)

      console.log('columns  ', columns.headerName
      )
      console.log('datosedit  ', datosedit)
 
  };
  
  return (
    <>
    <GridToolbarContainer>
      <GridToolbar></GridToolbar>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Agrega Fila
      </Button>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Borra Fila
      </Button>
    </GridToolbarContainer>
      {/* <Dialog open={open} columns={columns} >
    <DialogTitle>Edición</DialogTitle>
    <DialogContent>
          {columns.map((column, key) => (
        <TextField
        key={key}
      label={column.headerName}
      name={column.field}
      //  onChange={(e) =>
      //    setValues({ ...values, [e.target.name]: e.target.value })
      //  }
    />
    )
    )}
    </DialogContent>
    </Dialog> */}
    </>
  );
}

export default function Proveedores() {
  // const [rows, setRows] = React.useState(initialRows);

  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);


  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
//empiezan las cosas del sistema
async function columnsFetch() {
  const col = await llenarcolumns()
  setColumns(() => col);
}
async function dataFetch() {
  const data = await leerproveedores();
  setRows(data);
}
async function initialFetch() {
  columnsFetch();
  dataFetch();
}
useEffect(() => {
  initialFetch();
}, []); // eslint-disable-line react-hooks/exhaustive-deps
async function proveedmodifica(newRows) {
  const resultado = await ProveedoresModificar(newRows)
}

const handleProcessRowUpdateError = () => {
  console.log('tenemos un error  ')
}




  const [open, setOpen] = React.useState(false)
  const [datosedit, setDatosedit] = React.useState([])
  const handleClose = () => setOpen(false);


      const [selectedRows, setSelectedRows] = React.useState([]);
console.log('selectedRows  ', selectedRows)

      const modificacion = (updatedRow, originalRow, columns) => {
        console.log('modificacion up  ', updatedRow, originalRow, columns);
       }

  return (
    // style={{ height:1000, width: '100%' }}
    <div>
        <Stack spacing={1} sx={{ width: '100%' }} alignItems="flex-start">
      <DataGrid
        rows={rows}
        columns={columns}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        // columnHeaderHeight={80}
        disableColumnFilter={false}
        autoHeight
         checkboxSelection 
         rowSelection={true}
      
        onRowSelectionModelChange={(id) => {
          console.log(id)
          const selectedIDs = new Set(id);
          const selectedRows = rows.filter((row) =>
            selectedIDs.has(row.id),
          );

          setSelectedRows(selectedRows);
        }}
       
        processRowUpdate={(updatedRow, originalRow, columns) =>
          {
            modificacion(updatedRow, originalRow, columns);
          }
          // mySaveOnServerFunction(updatedRow)
        }
        onProcessRowUpdateError={
          handleProcessRowUpdateError}
    	

    
        // slots={{ toolbar: EditToolbar }}
        // slotProps={{
        //   toolbar: { setRows, setRowModesModel, selectedRows, columns}}}


        slots={{ columnMenu: CustomColumnMenu }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // slots={{
        //   toolbar: EditToolbar(rows, columns),
        // }}

      />
      </Stack>
{/* 
 {columns && 

<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edición</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
         
            {console.log('columns   ', columns)}
         
          </Stack>
          </form>
     
        </DialogContent>
     <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>} */}
      </div>
  );
}


           // {datosedit.map((datedit) => (
        //     <TextField
        //     key={key}
        //    label={column.headerName}
        //    name={column.field}
        //    onChange={(e) =>
        //      setValues({ ...values, [e.target.name]: e.target.value })
        //    }
        //  />


           // resizeTo= {400}
        // autoHeight={autoHeight===false}
        // onRowDoubleClick=   {handleRowClick}  {...rows} //con esta opción es que edito 
        // editMode="row"
        // onCellClick={handleCellClick} {...rows} 
        // onCellEditStop={(params, event) => {
        //   // if (params.reason === GridCellEditStopReasons.cellFocusOut) {
        //   //   event.defaultMuiPrevented = true;
        //   // }
        //   console.log('event edit stop  ', event);
        //   console.log('paramas edit stop  ', params);
        // }}


              	
// Callback called before updating a row with new values in the row and cell editing.

// Signature:
// function(newRow: R, oldRow: R) => Promise<R> | R
// newRow: Row object with the new values.
// oldRow: Row object with the old values.
// returns (Promise | R): The final values to update the row.


    // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
        // renderRowActions={({ rows, table }) => (
      
        // )}

         {/* <pre style={{ fontSize: 10 }}>
        {JSON.stringify(selectedRows, null, 4)}
      </pre> */}


         {/* {Object.entries(datosedit).forEach((key, value) => {  */}
         
           
          {/* })} */}
          {/* console.log(`key ${key} value ${value}` )console.log(`key ${key} value ${value}` ) */}
         {/* Object.entries(datosedit).forEach(([key, value]) => { */}
                    {/* {datosedit.map((datedit) => ( */}
                    {/* {  Object.keys(datosedit).forEach((key, value, label )=>  */}
 
               {/* <TextField
                 label='{label}'
                 value='{value}'
                 onChange={(e) =>
                   setValues({ ...values, [e.target.name]: e.target.value })
                 }
               /> */}
               {/* {datosedit.map((datedit) => (
            <TextField
            key={key}
           label={column.headerName}
           name={column.field}
           onChange={(e) =>
             setValues({ ...values, [e.target.name]: e.target.value })
           }
         />))} */}