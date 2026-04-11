import express from 'express';
var router = express.Router();
import { conexion } from '../conexion.mjs';


/* LA MANO DE OBRA ES u$s 2 POR METRO CUADRDADO, NO INFLUYE EL VALOR DE LA MOT*/

async function queryAsync(sql, params = []) {
  const [rows] = await conexion.promise().query(sql, params);
  return rows;
}
router.get("/", async (req, res) => {
  try {
    const datosRec = JSON.parse(req.query.datoscalculo);
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];

    const resultados = [];

    for (const item of datosRec) {

      const cantidad = item.cantidad;
      const StkRubroAbrP = item.StkRubroAbr;
      const detallep = item.detallep
      const ivasn = item.ivasn;
      const ancho = Number(item.ancho)
      const cantHeb = Number(item.cantHeb)
      const tipoheb = item.tipoheb
      const cantCarro = Number(item.cantCarro)
      const cantPlaca = Number(item.cantPlaca)
      const tipoplaca = item.tipoplaca
      const tipocarro = item.tipocarro
      const largo = Number(item.largo)
      const largocalc = Number(item.largo) + 0.40
      const colocacion = item.colocacion;
      let coeficiente = 0
      let coefMOT = 0
      let ivasncal = item.minmay === "my" ? "CIVA" : ivasn;
      if (item.minmay == 'my') {
        coeficiente = Number(p.coeficientemay)
        coefMOT = Number(p.coefMOTmay)
      }
      else {
        coeficiente = Number(p.coeficientemin)
        coefMOT = Number(p.coefMOTmin)
      }

      let valorMOTmin = Number(p.costoMOT) * Number(coefMOT) / 60
      let minutosarmado = 0
      let detalle = ''
      //se calculan 50 minutos por metro de largo para hacer la lona, y 60 minutos para colocacion
      minutosarmado = colocacion ? (largo * 40) + 60 : (largo * 40)

      let MOTarmado = minutosarmado * valorMOTmin

      if (detallep == '') {
        detalle = "Confección de lona para lateral corredizo de " + largo + " x " + ancho
        detalle = `${detalle} con ${cantHeb} hebillas y ${cantCarro} carros`

        if (colocacion) {
          detalle = detalle + " (incluye colocación)"
        }
        else {
          detalle = detalle + " (sin colocación)"
        }
        detalle = detalle + ' en : '
      }

      else {
        detalle = detallep + ''
      }
      let impheb = 0
      let impplacaheb = 0
      let impcarro = 0
      let impplaca = 0
      let impind = 0
      let imptela = 0
      if (cantHeb != 0) {
        const valorheb = `Select  StkRubroAbr, (StkRubroCosto * StkMonedasCotizacion * ? * ? ) as valorhebillas, 
        StkRubroCosto,  StkMonedasCotizacion  from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where StkRubro.StkRubroAbr = ? and StkRubro.StkRubroTM = idStkMonedas`
        const paramscantHeb = [coeficiente, cantHeb, tipoheb]

        //valor placa hebilla y carro
        const valorplaheb = `Select  StkRubroAbr, (StkRubroCosto * StkMonedasCotizacion * ? * ? ) as valorplacaheb, 
        StkRubroCosto,  StkMonedasCotizacion  from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where StkRubro.StkRubroAbr = ? and StkRubro.StkRubroTM = idStkMonedas`
        const paramsvalorplaheb = [coeficiente, cantHeb, 'AL022']

        const impheb1 = await queryAsync(valorheb, paramscantHeb)
        impheb = Number(impheb1[0].valorhebillas)
        const impplacaheb1 = await queryAsync(valorplaheb, paramsvalorplaheb)
        impplacaheb = Number(impplacaheb1[0].valorplacaheb)

      }
      // }
      //cinta de refuerzo en I5070
      const paniotirasi5070 = Math.ceil(Math.ceil((largo / 0.75) * 2) + largo) / 1.5
      const valorind = `Select  StkRubroAbr, (StkRubroCosto * StkMonedasCotizacion * ? * 0.08 * ? ) as valorindust, 
      StkRubroCosto,  StkMonedasCotizacion  from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
      where StkRubro.StkRubroAbr = ? and StkRubro.StkRubroTM = idStkMonedas`
      const paramsvalorind = [coeficiente, paniotirasi5070, 'I5070']
      const impind1 = await queryAsync(valorind, paramsvalorind)
      impind = Number(impind1[0].valorindust)

      if (cantCarro != 0) {
        const valcarro = `Select  StkRubroAbr, (StkRubroCosto * StkMonedasCotizacion * ? * ? ) as valorcarros, 
        StkRubroCosto,  StkMonedasCotizacion  from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where StkRubro.StkRubroAbr = ? and StkRubro.StkRubroTM = idStkMonedas`
        const paramsvalcarro = [coeficiente, cantCarro, tipocarro]
        const impcarro1 = await queryAsync(valcarro, paramsvalcarro)
        impcarro = Number(impcarro1[0].valorcarros)

      }
      if (cantPlaca != 0) {
        const valorplaca = `Select  StkRubroAbr, (StkRubroCosto * StkMonedasCotizacion * ? * ? ) as valorplacas, 
        StkRubroCosto,  StkMonedasCotizacion  from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where StkRubro.StkRubroAbr = ? and StkRubro.StkRubroTM = idStkMonedas`
        const paramsvalorplaca = [coeficiente, cantPlaca, tipoplaca]
        const impplaca1 = await queryAsync(valorplaca, paramsvalorplaca)
        impplaca = Number(impplaca1[0].valorplacas)

      }
      const valortela = `Select  StkRubroDesc, StkRubroAbr, ((StkRubroCosto * StkMonedasCotizacion * ? * ? * ? ) + ? ) as ImpUnitario,  
      StkRubroCosto,  StkMonedasCotizacion  from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
      where StkRubro.StkRubroAbr = ? and StkRubro.StkRubroTM = idStkMonedas`
      const paramsvalortela = [coeficiente, 2, largocalc, MOTarmado, StkRubroAbrP]
      const imptela1 = await queryAsync(valortela, paramsvalortela)
      imptela = Number(imptela1[0].ImpUnitario)


      let impunitario = imptela + impcarro + impheb + impplaca + impplacaheb + impind
      console.log('impunitario  ', impunitario)
      if (ivasncal === 'CIVA') {
        impunitario = Math.ceil(impunitario);
      } else {
        impunitario = Math.ceil(impunitario / 1.21);
      }

      detalle = detalle + imptela1[0].StkRubroDesc
      resultados.push({
        ImpUnitario: impunitario,
        Detalle: detalle,
        Largo: 0.00,
        Ancho: 0.00,
        MDesc: "S",
      });
    }
    res.json(resultados);
  } catch (err) {
    console.log("Error en /presuplatcorr", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;


