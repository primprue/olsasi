
import {React, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { withStyles } from "@mui/material";
import { leerStkMonedas } from "../../Monedas/StkMonedasLeer";
import { leetipoprov } from "./LeeTipoProv";
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SaveIcon from '@mui/icons-material/Save';
import SecurityIcon from '@mui/icons-material/Security';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
//   GridRowModes,
//   DataGridPro,
//   GridToolbarContainer,
 GridActionsCellItem,
} from '@mui/x-data-grid';

//sacado de https://mui.com/x/react-data-grid/editing/ With auto-stop
//https://github.com/mui/mui-x/issues/4437

//https://codesandbox.io/s/columntypesgrid-material-demo-forked-hmb3e9?file=/demo.js
//https://mui.com/x/react-data-grid/column-definition/#column-types


export async function llenarcolumns() {
  const tipoprov = await leetipoprov();

 const stkMonedas = await leerStkMonedas();
  // var objstkMonedas = await stkMonedas.reduce(function (acc, cur) {
  //   acc[cur.idStkMonedas] = cur.StkMonedasDescripcion;
  //   return acc;

  // }, {});

  return columnsFill(tipoprov, stkMonedas);
}
const llamaDialog = () => {
setOpen(true);
}

const CountButton = () => {
  const [count, setCount] = React.useState(0);

  return (
    <Button onClick={() => setCount((prev) => prev + 1)}>{count} click(s)</Button>
  );
};

function columnsFill(tipoprov, stkMonedas) {


  return new Promise(function (resolve) {
    resolve([
      { headerName: "id", field: "id" },
      { headerName: "Descripción", field: "ProveedoresDesc",   flex: 3 , width: 250, minWidth: 100, maxWidth: 400 },
      {
        headerName: "Tipo",
        field: "ProveedoresTipo",
        type: 'singleSelect',
        valueOptions: tipoprov,
        // valueFormatter: ({
        //   value
        // }) => value == null ? void 0 : value.label,
        editable: true,
        flex: 3 , width: 250, minWidth: 100, maxWidth: 400
      },
      {
        headerName: "CUIT", field: "ProveedoresCUIT",
        editable: true,
        // disableColumnFilter: false,
        flex: 3 , width: 100, minWidth: 100, maxWidth: 150
      },
      {
        headerName: "Calle", field: "ProveedoresCalle",
        editable: true,
         width: 300,
        // resizeTo: 400,
        // onCellDoubleClick:  () => { withStyles} ,
        // , minWidth: 100, maxWidth: 400 
        flex: 1
      },
      {
        headerName: "Calle Nro.", field: "ProveedoresNroCalle",
        editable: true
      },
      {
        headerName: "Piso", field: "ProveedoresPiso",
        editable: true
      },
      {
        headerName: "Dto", field: "ProveedoresDto",
        editable: true
      },
      {
        headerName: "CodPos", field: "ProveedoresCodPos",
        editable: true
      },
      {
        headerName: "Loc", field: "ProveedoresLoc",
        editable: true
      },
      {
        headerName: "Pcia", field: "ProveedoresPcia",
        editable: true
      },
      {
        headerName: "Tel", field: "ProveedoresTel",
        editable: true
      },
      {
        headerName: "Contacto", field: "ProveedoresContacto",
        editable: true
      },
      {
        headerName: "Mail", field: "ProveedoresMail",
        editable: true
      },
      {
        headerName: "Web", field: "ProveedoresWeb",
        editable: true
      },
      {
        field: "ProveedoresCodMon",
        headerName: "CodMon",
        type: 'singleSelect',
        valueOptions: stkMonedas,
        editable: true,
      },
      // {
      //   field: 'actions',
      //   headerName: 'Actions',
      //   type: 'actions',
      //   cellClassName: 'actions',
      //   // renderCell: () => <ProveedoresDialog open={true} />,// funciona
      //   //  renderCell: llamaDialog
      //   //  getActions: () => [
      //   //   <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
      //   //   <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      //   // ],
      // },
      
          ],
          );
        });
             }
      // {
      //   headerName: "CodMon",
      //   field: "ProveedoresCodMon",
      //   select: true,
      // },
      // acciones
      // {
      //   field: 'actions',
      //   type: 'actions',
      //   headerName: 'Actions',
      //   width: 100,
      //   cellClassName: 'actions',
      //   getActions: ({ id }) => {
      //     const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
      //     if (isInEditMode) {
      //       return [
      //         <GridActionsCellItem
      //           icon={<SaveIcon />}
      //           label="Save"
      //           sx={{
      //             color: 'primary.main',
      //           }}
      //           onClick={handleSaveClick(id)}
      //         />,
      //         <GridActionsCellItem
      //           icon={<CancelIcon />}
      //           label="Cancel"
      //           className="textPrimary"
      //           onClick={handleCancelClick(id)}
      //           color="inherit"
      //         />,
      //       ];
      //     }
  
      //     return [
      //       <GridActionsCellItem
      //         icon={<EditIcon />}
      //         label="Edit"
      //         className="textPrimary"
      //         onClick={handleEditClick(id)}
      //         color="inherit"
      //       />,
      //       <GridActionsCellItem
      //         icon={<DeleteIcon />}
      //         label="Delete"
      //         onClick={handleDeleteClick(id)}
      //         color="inherit"
      //       />,
      //     ];
      //   },
      // },
      //fin de acciones


// Without getOptionValue and getOptionLabel


/*  

import * as React from 'react';
import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';

function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native
      autoFocus
    >
      <option>Back-end Developer</option>
      <option>Front-end Developer</option>
      <option>UX Designer</option>
    </Select>
  );
}

SelectEditInputCell.propTypes = {
 
field: PropTypes.string.isRequired,
 
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
   
    value: PropTypes.any,
};

const renderSelectEditInputCell = (params) => {
  return <SelectEditInputCell {...params} />;
};

export default function AutoStopEditComponent() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
*/


/* 24-06-23
{
  field: 'country',
  headerName: 'Country',
  type: 'singleSelect',
  valueOptions: COUNTRY_ISO_OPTIONS_SORTED,
  valueFormatter: ({
    value
  }) => value == null ? void 0 : value.label,
  generateData: randomCountry,
  renderCell: renderCountry,
  renderEditCell: renderEditCountry,
  sortComparator: (v1, v2, param1, param2) => gridStringOrNumberComparator(v1.label, v2.label, param1, param2),
  width: 150,
  editable: true
}

los datos están
export
 const COUNTRY_ISO_OPTIONS = [{
  value: 'AD',
  code: 'AD',
  label: 'Andorra',
  phone: '376'
}, {
  value: 'AE',
  code: 'AE',
  label: 'United Arab Emirates',
  phone: '971'
}, {
  value: 'AF',
  code: 'AF',
  label: 'Afghanistan',
  phone: '93'
}, {
  value: 'AG',
  code: 'AG',
  label: 'Antigua and Barbuda',
  phone: '1-268'
},
*/


/*  

https://mui.com/x/react-data-grid/column-definition/#special-properties
import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';

const initialRows = [
  {
    id: 1,
    name: 'Damien',
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    isAdmin: true,
    country: 'Spain',
    discount: '',
  },
  {
    id: 2,
    name: 'Nicolas',
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    isAdmin: false,
    country: 'France',
    discount: '',
  },
  {
    id: 3,
    name: 'Kate',
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    isAdmin: false,
    country: 'Brazil',
    discount: 'junior',
  },
];

export default function ColumnTypesGrid() {
  const [rows, setRows] = React.useState(initialRows);

  const deleteUser = React.useCallback(
    (id) => () => {
      setTimeout(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      });
    },
    [],
  );

  const toggleAdmin = React.useCallback(
    (id) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
        ),
      );
    },
    [],
  );

  const duplicateUser = React.useCallback(
    (id) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === id);
        return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
      });
    },
    [],
  );

  const columns = React.useMemo(
    () => [
      { field: 'name', type: 'string' },
      { field: 'age', type: 'number' },
      { field: 'dateCreated', type: 'date', width: 130 },
      { field: 'lastLogin', type: 'dateTime', width: 180 },
      { field: 'isAdmin', type: 'boolean', width: 120 },
      {
        field: 'country',
        type: 'singleSelect',
        width: 120,
        valueOptions: [
          'Bulgaria',
          'Netherlands',
          'France',
          'United Kingdom',
          'Spain',
          'Brazil',
        ],
      },
      {
        field: 'discount',
        type: 'singleSelect',
        width: 120,
        editable: true,
        valueOptions: ({ row }) => {
          if (row === undefined) {
            return ['EU-resident', 'junior'];
          }
          const options = [];
          if (!['United Kingdom', 'Brazil'].includes(row.country)) {
            options.push('EU-resident');
          }
          if (row.age < 27) {
            options.push('junior');
          }
          return options;
        },
      },
      {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label="Toggle Admin"
            onClick={toggleAdmin(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label="Duplicate User"
            onClick={duplicateUser(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, toggleAdmin, duplicateUser],
  );

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
}
*/