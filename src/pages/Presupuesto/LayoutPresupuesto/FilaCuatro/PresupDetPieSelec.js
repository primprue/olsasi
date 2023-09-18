import React, { useEffect, useState } from "react";

import MaterialTable from "material-table";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";

import { presupdetpieColumns } from "../../PresupDetPie/presupdetpieColumns";
import { presupdetpieData } from "../../PresupDetPie/presupdetpieData";


// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";


export default function PresupDetPieSelect() {

  const { state, setState } = useContext(PresupPantContext);

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  async function columnsFetch() {
    const col = await presupdetpieColumns();
    setColumns(() => col);
  }

  async function dataFetch() {
    const data = await presupdetpieData();
    setData(data);
  }

  async function initialFetch() {
    columnsFetch();
    dataFetch();
  }

  useEffect(() => {
    initialFetch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleOnSelectionChange() {
    setState({ ...state, condpagoeleg: data })
  }

  return (
    <div>
      <MaterialTable

        onSelectionChange={handleOnSelectionChange}
        title="PIE DE PRESUPUESTO"
        columns={columns}
        data={data}
        icons={tableIcons}
        localization={localization}
        options={{
          sorting: true,
          selection: true,
          addRowPosition: "first",
          showTextRowsSelected: true,
          actionsColumnIndex: -1,
          // tableLayout: "fixed",
        }}

      />

    </div>
  );
}
