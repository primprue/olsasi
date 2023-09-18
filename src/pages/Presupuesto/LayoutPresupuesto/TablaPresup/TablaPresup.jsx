import React, { useState } from "react";
import { Grid, Box, Button, IconButton, TextField } from "@mui/material";
import {
	DataGrid,
	esES,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
	GridFooter,
} from "@mui/x-data-grid";
import estilotabla from "../../../../Styles/Tabla.module.css";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { red, blue, green, purple } from "@mui/material/colors";
// import MaterialTable, { MTableToolbar } from "material-table";
// import { tableIcons } from "../../../../../lib/material-table/tableIcons";
// import { localization } from "../../../../../lib/material-table/localization";
// import FilaCuatro from "../FilaCuatro/FilaCuatro";
// import CurrencyTextField from "@unicef/material-ui-currency-textfield";
// import { PresupPreview } from "../PresupPreview";

// import { blue, green, purple, teal } from "@material-ui/core/colors";

import FilaAnexo from "../FilaAnexo/FilaAnexo";
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export function CustomFooterStatusComponent(suma) {
	console.log("suma  ", suma);
	const sumar = suma.suma;
	return (
		<Box sx={{ p: 1, display: "flex" }}>
			<TextField value={sumar}></TextField>

			{/* Status {props.status} */}
		</Box>
	);
}
export default function TablaPresup(props) {
	const { state, setState } = useContext(PresupPantContext);
	const { datosrenglon, setDatosRenglon } = useContext(PresupPantContext);
	const [anexos, setAnexos] = useState({ anexos: false });
	const [ppreview, setPPreview] = useState({ ppreview: false });
	const [filacuatro, setFilacuatro] = useState({ filacuatro: false });
	const columns = state.columns;
	const [suma, setSuma] = useState(0);

	const BorraFila = () => {
		var datosrenglon1 = [];
		if (rowSelectionModel.length !== 0) {
			rowSelectionModel.map((row, i) =>
				setDatosRenglon(datosrenglon.filter((rows) => rows.id !== row))
			);
		}
	};

	// const handleDeleteClick = (id: GridRowId) => () => {
	// 	setRows(rows.filter((row) => row.id !== id));
	// };
	function CustomToolbar() {
		return (
			<GridToolbarContainer className={estilotabla.tablapresupuestoslot}>
				{/* <GridToolbarColumnsButton /> */}
				{/* <GridToolbarFilterButton /> */}
				{/* <GridToolbarDensitySelector /> */}
				<GridToolbarExport></GridToolbarExport>
				<IconButton onClick={BorraFila}>
					<DeleteForeverRoundedIcon
						style={{ color: red[500] }}
						fontSize="medium"
						titleAccess="Borrar"
					/>
				</IconButton>
				<IconButton onClick={sumar}>
					<AddShoppingCartIcon
						style={{ color: green[500] }}
						fontSize="medium"
						titleAccess="Sumar"
					/>
				</IconButton>
				<IconButton onClick={() => setAnexos({ anexos: true })}>
					<AttachFileIcon
						style={{ color: purple[500] }}
						fontSize="medium"
						titleAccess="Sumar"
					/>
				</IconButton>
				<Button onClick={handleClose}>Cierra</Button>
			</GridToolbarContainer>
		);
	}
	const sumar = () => {
		var totalpresup = 0,
			i = 0;
		while (i < datosrenglon.length) {
			totalpresup = totalpresup * 1 + datosrenglon[i].ImpItem * 1;
			i++;
		}
		setSuma(totalpresup);
		console.log("totalpresup  ", totalpresup);
	};

	const handleClose = () => {
		console.log("datosrenglo  ", datosrenglon);
		//setFilacuatro(false);
	};
	const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

	return (
		<div>
			{/* // <div style={{ height: 400, width: "80%", padding: "3px" }}> */}
			{/* <Grid container item direction="column" spacing={3} xs={12}>
        <Grid item xs> */}
			<Grid container item direction="column">
				<Grid>
					<DataGrid
						className={estilotabla.tablapresupuesto}
						rows={datosrenglon}
						columns={columns.filter(
							(column) => column.headerName !== "datospresup"
						)}
						checkboxSelection
						onRowSelectionModelChange={(newRowSelectionModel) => {
							setRowSelectionModel(newRowSelectionModel);
						}}
						autoHeight={true}
						localeText={esES.components.MuiDataGrid.defaultProps.localeText}
						shape="rounded"
						// processRowUpdate={processRowUpdate}
						// onProcessRowUpdateError={handleProcessRowUpdateError}
						slots={{
							toolbar: CustomToolbar,
							footer: CustomFooterStatusComponent,
						}}
						slotProps={{
							footer: { suma },
						}}

						// initialState={{
						// 	pagination: {
						// 		paginationModel: { page: 0, pageSize: 10 },
						// 	},
						// }}
						// pageSizeOptions={[10, 10]}
					/>
				</Grid>
			</Grid>
			<FilaAnexo open={anexos.anexos} setOpen={setAnexos} />;
		</div>
	);
}

{
	/* <MaterialTable
            icons={tableIcons}
            title=""
            columns={columns}
            data={datosrenglon}
            localization={localization}

            options={{
              search: false,
              exportAllData: true,
              exportButton: true,

            }}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    const dataDelete = [...datosrenglon];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setDatosRenglon([...dataDelete]);
                    resolve();
                  }, 1000);
                }),

            }}
            actions={[

              {
                icon: () => (
                  <tableIcons.AddShoppingCart style={{ color: teal[500] }} />
                ),
                tooltip: "Suma",
                isFreeAction: true,
                onClick: () => sumar(),
              },
              {
                icon: () => <tableIcons.Save style={{ color: blue[500] }} />,
                tooltip: "Graba",
                isFreeAction: true,
                onClick: () => setFilacuatro({ filacuatro: true })
              },

              {
                icon: () => <tableIcons.Print style={{ color: green[500] }} />,
                tooltip: "Imprimir",
                isFreeAction: true,
                onClick: () => setPPreview({ ppreview: true })
              },
              {
                icon: () => (
                  <tableIcons.Attachment style={{ color: purple[700] }} />
                ),
                tooltip: "Anexos",
                isFreeAction: true,
                onClick: () => setAnexos({ anexos: true }),
              }
            ]}
            components={{
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />
                  <Grid container>
                    <Grid item xs={4}>
                      <CurrencyTextField
                        id="Suma"
                        label="Total presupuesto : "
                        value={suma}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      {state.renglonanexo.length !== 0 && <h3>Tiene Anexos</h3>}
                    </Grid>
                  </Grid>
                </div>
              ),
            }}
          /> */
}

{
	/* </Grid>
      </Grid> */
}
{
	/* <FilaCuatro
        open={filacuatro.filacuatro}
        datos={datosrenglon}
        maymin={props.maymin}
        suma={suma}
        setOpen={setFilacuatro}
        handleClose={handleClose}
      />

      <PresupPreview open={ppreview.ppreview} setOpen={setPPreview}></PresupPreview> */
}
