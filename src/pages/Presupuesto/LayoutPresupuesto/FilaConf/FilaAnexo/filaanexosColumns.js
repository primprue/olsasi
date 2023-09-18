import leePresupConfTipoLeeAnexo from "../../../leePresupConfTipoLeeAnexo"


export async function filaanexosColumns() {
    const tipoanexo = await leePresupConfTipoLeeAnexo('S');
    var objtipoanexo = await tipoanexo.reduce(function (acc, cur) {
        acc[cur.PresupConfTipoDesc] = cur.PresupConfTipoDesc;

        return acc;
    }, {});
    return columnsFill(objtipoanexo);
}

function columnsFill(objtipoanexo) {
    return new Promise(function (resolve) {
        resolve([

            {
                title: "Descripción",
                field: "PresupConfTipoDesc",
                lookup: objtipoanexo,
            },

            {
                title: "Cantidad",
                field: "AnexoMedida",
                order: true,
            },
            {
                title: "Importe",
                field: "importea",
                type: "currency",
                // disable: true,
            },
            {
                title: "Imprime",
                field: "PresupConfTipoImprime",
                //  disable: true,
            },

        ]);
    });
}
