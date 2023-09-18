import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo";


export async function filaanexosColumns() {
    const tipoanexo = await leePresupConfTipoLeeAnexo('S');


    return columnsFill(tipoanexo);
}

function columnsFill(tipoanexo) {
    return new Promise(function (resolve) {
        resolve([
            {
                id: "id",
                field: "Id",
            },

            {
                headerName: "Descripción",
                field: "PresupConfTipoDesc",
                lookup: tipoanexo,
            },

            {
                headerName: "Cantidad",
                field: "AnexoMedida",
                order: true,
            },
            {
                headerName: "Importe",
                field: "importea",
                type: "currency",
                // disable: true,
            },
            {
                headerName: "Imprime",
                field: "PresupConfTipoImprime",
                //  disable: true,
            },

        ]);
    });
}
