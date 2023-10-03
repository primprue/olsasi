import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";


export function presupDetPieModificar(props) {

        const {
                idPresupDetPie,
                PresupDetPieLeyenda
                // PresupDetPieSelec

        } = props;

        const url = IpServidor + "/presupdetpiemodificar/?id=" + idPresupDetPie;
        request
                .post(url)
                .set("Content-Type", "application/json")
                .send({ PresupDetPieLeyenda: PresupDetPieLeyenda })
                // .send({ PresupDetPieSelec: PresupDetPieSelec })
                .then(function () { });
}
