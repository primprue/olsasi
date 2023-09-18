import React, { useEffect, useState } from "react";

import { StkRubro_Columns } from "./StkRubro_Columns";
import { StkRubro_ColumnsI } from "./StkRubro_ColumnsI";
import { tableIcons } from "../../../../lib/material-table/tableIcons";
import { localization } from "../../../../lib/material-table/localization";
import { stkrubroleermezcla } from "./StkRubroLeerMezcla";

import { onRowAdd } from "./onRowAdd";
import { onRowUpdate } from "./onRowUpdate";
import { onRowDelete } from "./onRowDelete";
import MaterialTable from "material-table";
import Imprimir from "../../Impresion/Imprimir/Imprimir";

// import StkMinMaxDialog from "./StkMinMaxDialog";
import { useContext } from "react";
import { globalContext } from "../../../../App";

export default function StkRubro() {
  // const [lookconst, setLookconst] = useState();
  const { setValor } = useContext(globalContext);
  // const [nameError, setNameError] = useState({
  //   error: false,
  //   label: "",
  //   helperText: "",
  // });

  // const [rubro, setRubro] = useState({ columns: [], data: [] });
  // const [strubromodificar, setStkrubromodificar] = useState(false);
  const [columns, setColumns] = useState([]);
  const [columnsi, setColumnsI] = useState([]);
  const [data, setData] = useState([]);
  const [datai, setDataI] = useState([]);
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
  // const [StkMinMaxDialogTF, setStkMinMaxDialogTF] = useState(false);
  // function setDialog() {
  //   setStkMinMaxDialogTF(true);
  // }

  async function columnsFetch() {
    const col = await StkRubro_Columns();
    setColumns(() => col);
  }
  async function columnsFetchI() {
    const col = await StkRubro_ColumnsI();
    setColumnsI(() => col);
  }
  async function dataFetch() {
    const result = await stkrubroleermezcla();
    setData(() => result);
    setDataI(() => result);
  }

  async function initialFetch() {
    columnsFetch(); //lleno columns con los datos obtenidos
    columnsFetchI();
    dataFetch(); //Lleno data
  }

  useEffect(() => {
    initialFetch();
    setValor("Rubros");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // console.log("contenido de StkMinMaxDialogTF ", StkMinMaxDialogTF);
  return (
    <div>
      <MaterialTable

        actions={[
          {
            icon: () => <tableIcons.Print />,
            tooltip: "Imprimir",
            isFreeAction: true,
            onClick: () => setImprimirTF({ imprimir: true }),
          },

          // {
          //   icon: () => <tableIcons.Add />,
          //   tooltip: "Agregar Rubro",
          //   isFreeAction: true,
          //   onClick: (event) => setStkMinMaxDialogTF({ open: true }),
          //   // onClick: setDialog,
          // },
        ]}

        icons={tableIcons}
        title=""
        columns={columns}
        data={data}
        localization={localization}
        options={{
          exportButton: true,
          exportAllData: true,
          // exportDelimiter: ';',
          grouping: true,

          addRowPosition: "first",
          actionsColumnIndex: -1,
          // tableLayout: "fixed",
        }}

        // components={{
        //   EditRow: (props) => console.log("Props : ", props),
        //   // <StkRubroModificar open={true} />,
        // }}
        editable={{
          onRowAdd: (newData) =>
            onRowAdd(newData).then(
              setTimeout(() => {
                initialFetch();
              }, 5000)
            ),
          // onRowAdd: (newData) => StkMinMaxDialog(newData),

          onRowUpdate: (newData, oldData) =>
            onRowUpdate(newData, oldData).then(() => initialFetch()),

          onRowDelete: (oldData) =>
            onRowDelete(oldData).then(
              setTimeout(() => {
                initialFetch();
              }, 5000)
            ),
        }}
      />
      {/* <StkMinMaxDialog open={StkMinMaxDialogTF} /> */}
      {/* <StkMinMaxDialog open={true} /> */}

      <Imprimir
        columns={columnsi}
        datos={datai}
        open={imprimirTF.imprimir}
        setOpen={setImprimirTF}
      />
    </div>
  );
}
