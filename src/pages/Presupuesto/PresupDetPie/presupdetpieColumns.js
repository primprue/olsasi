export function presupdetpieColumns() {
    return new Promise(function (resolve) {
        resolve([
            // { headerName: "id", field: "id", type: "text", xs: 4, editable: false },
            {
                headerName: "Leyenda",
                field: "PresupDetPieLeyenda",
                length: 70,
                width: 500,
                order: true,
            },
            {
                headerName: "Leyenda",
                field: 'PresupDetPieSelec',
                width: 10,
                order: true,
            },
        ]);
    });
}
