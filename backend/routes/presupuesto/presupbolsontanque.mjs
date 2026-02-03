import express from "express";
var router = express.Router();

import { conexion } from '../conexion.mjs';


// ------------------------------------------------------------------
// FUNCIÓN: ejecuta una consulta MySQL en modo async
// ------------------------------------------------------------------
async function queryAsync(sql, params = []) {
  const [rows] = await conexion.promise().query(sql, params);
  return rows;
}
router.get('/', async (req, res, next) => {


  try {
    const datosrec = JSON.parse(req.query.datoscalculo);
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];
    const resultados = [];

    for (const item of datosrec) {
      const {
        minmay,
        detallep,
        cantidad,
        StkRubroAbr,
        ivasn,
        tipomedeleg,
        termbordeeleg,
        medida,
        alto,
        anchopared,

      } = item;


      let StkRubroAbrP = StkRubroAbr;
      let medidarec = Number(medida)
      let altodesc = Number(alto)
      let altorec = altodesc + 0.4
      let anchoparedcal = Number(anchopared) / 100
      const q2 = `Select StkRubroAncho  as AnchoTela  from BaseStock.StkRubro where StkRubro.StkRubroAbr = ? `
      const params = [StkRubroAbrP];
      const d = await queryAsync(q2, params);
      const anchotela = Number(d[0].AnchoTela)
      let perimetro = 0
      let diametro = 0
      let diametroI = 0


      let detalle = "Bolsón para tanque de "
      switch (tipomedeleg) {
        case "CC":
          perimetro = medidarec * 3;
          diametro = (perimetro / 3.1416) * 1.02
          diametroI = diametro + .05
          detalle = detalle + medidarec + ' chapas '
          break;
        case "DI":
          diametro = medidarec + (anchoparedcal * 2)
          diametroI = medidarec + .05
          perimetro = diametro * 3.1416
          detalle = detalle + medidarec + ' de diámetro interno '
          break;
        case "DE":
          diametro = medidarec
          diametroI = (medidarec - (anchoparedcal * 2)) + .05
          perimetro = diametro * 3.1416
          detalle = detalle + medidarec + ' de diámetro externo '
          break;
        default:
          perimetro = medidarec
          diametro = medidarec / 3.1416 + .05
          diametroI = diametro
          detalle = detalle + medidarec + ' de perímetro externo ';
      }


      let altoconpared = altorec + anchoparedcal
      detalle = detalle + ' con pared de ' + anchopared + ' mts. y un alto de ' + (altodesc * 1).toFixed(2) + ' mts. (incluye sobrante para doblar), '

      let altocalculo = 1.5
      if (StkRubroAbrP === 'POL19') {
        if (altoconpared > 1.50 && altoconpared <= 2) {
          altocalculo = 2.00
        }
        else {
          if (altoconpared > 2 && altoconpared <= 3) {
            altocalculo = 3.00
          }
          else {
            if (altoconpared > 3) {
              altocalculo = altoconpared.toFixed(0) + 0.5
            }
          }
        }

      }
      else {
        altocalculo = altodesc + anchoparedcal + 0.3
        if (altodesc <= 1.50) {
          altocalculo = 1.50
        }
      }

      let SegundosMOT = 0

      let cantcriquet = 0
      let cantsoga = 0
      let cancriquet = 0
      let metroscuadtotal = 0
      let metroscuaddiam = Number((diametro * diametro).toFixed(0))
      let metroscuadper = Number((altocalculo * perimetro).toFixed(0))
      metroscuadtotal = metroscuaddiam + metroscuadper


      if (StkRubroAbrP == 'POL19') {
        SegundosMOT = perimetro * 600
        if (anchoparedcal > 0.10) {
          SegundosMOT = SegundosMOT + perimetro * 600
        }
      }

      //hasta acá excepto porque falta calcular el diametro interno en DE y en PE, todo está bien para pol19

      else {
        let calpaños = 0
        let cantpaños = 0
        SegundosMOT = perimetro * 600
        // calculo de los paños del piso
        calpaños = (diametroI % anchotela)

        if (calpaños < .50) {
          cantpaños = Math.trunc(diametroI / anchotela) + .5
        }
        else {
          cantpaños = Math.trunc(diametroI / anchotela) + 1
        }


        //cortar paños del fondo 120 seg. MOT 1 persona  por paño
        //soldar paños del fondo 150 seg. MOT 1 persona  por metro de soldura

        let segcortarpf = (120 * cantpaños)
        let segunirpf = (150 * diametroI * (cantpaños - 1))
        let canttelapiso = cantpaños * diametroI * anchotela

        //cortar paños del perímetro 120 seg. MOT 1 persona  por paño
        //soldar paños del perímetro 150 seg. MOT 1 persona  por metro de soldura
        let segcortarpp = 0
        let segunirpp = 0
        let metroscuadper = 0
        if (alto > 1.50) {
          calpaños = (perimetro % anchotela)

          if (calpaños < .50) {
            cantpaños = Math.trunc(perimetro / anchotela) + .5
          }
          else {
            cantpaños = Math.trunc(perimetro / anchotela) + 1
          }
          segcortarpp = (120 * cantpaños)
          segunirpp = (150 * alto * (cantpaños - 1))
          metroscuadper = cantpaños * alto * anchotela
        }
        else {
          segcortarpp = segcortarpf
          metroscuadper = perimetro * 1.50
        }


        metroscuadtotal = canttelapiso + metroscuadper

        // 240 segundos para soldar los paños del perímetro al fondo

        let segspisofondo = perimetro * 240
        let segcortefondo = perimetro * 120


        SegundosMOT = SegundosMOT + segcortarpf + segunirpf + segcortarpp + segunirpp + segspisofondo + segcortefondo


        let seghacercortes = 0
        let mcuadradosfaldon = 0
        let segsoldarfaldon = 0
        switch (termbordeeleg) {
          case "SF":
            SegundosMOT = SegundosMOT
            break
          case "CF":
          case "CFS":
          case "CFC":
            seghacercortes = perimetro / 0.50 * 380
            calpaños = (perimetro % anchotela)
            if (calpaños < .50) {
              cantpaños = Math.trunc(perimetro / anchotela) + .5
            }
            else {
              cantpaños = Math.trunc(perimetro / anchotela) + 1
            }
            mcuadradosfaldon = cantpaños * anchotela * .30
            metroscuadtotal = metroscuadtotal + mcuadradosfaldon
            segsoldarfaldon = (diametro * 3.1416 * 240)
            SegundosMOT = SegundosMOT + seghacercortes + segsoldarfaldon

            break
        }

        if (termbordeeleg == "CFS") {
          cantcriquet = 0
          cantsoga = perimetro * 1.3
        }
        if (termbordeeleg == "CFC") {
          cantsoga = 0
          cancriquet = (perimetro % 6)
          if (cancriquet !== 0) {
            cantcriquet = Math.trunc(perimetro / 6) + 1
          }
          else {
            cantcriquet = Math.trunc(perimetro / 6)
          }

        }
      }
      if (termbordeeleg === "CF") {
        detalle = detalle + ' borde superior sin terminación en : '
      }
      if (termbordeeleg === "CFS") {
        detalle = detalle + ' borde superior c/soga de ajuste en : '
      }
      if (termbordeeleg === "CFC") {
        detalle = detalle + ' borde superior c/criquet de ajuste en : '
      }
      if (termbordeeleg === "SF") {
        detalle = detalle + ' borde superior recto  en : '
      }
      let coeficiente = 0
      let coefMOT = 0
      let valorMOTseg = 0
      if (minmay == 'my') {
        coeficiente = p.coeficientemay
        coefMOT = p.coefMOTmay
        ivasn = 'CIVA'
      }
      else {
        coeficiente = p.coeficientemin
        coefMOT = p.coefMOTmin
      }


      let SegundosMOTAd = 0
      if (diametro > 12) {
        if ((Math.floor(diametro)) === 12) {
          SegundosMOTAd = 1800
        }
        else {
          SegundosMOTAd = ((Math.floor(diametro) - 12) * 1800)
        }


      }
      valorMOTseg = p.costoMOT * coefMOT / 60 / 60


      let MOTarmado = valorMOTseg * SegundosMOT
      let MOTarmadoAd = valorMOTseg * SegundosMOTAd



      const q3 = `Select 
        (StkRubroCosto * StkMonedasCotizacion * ?  ) as ValorAdicionales,
        StkRubroCosto, StkMonedasCotizacion  from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where (StkRubro.StkRubroAbr = ? or 
        StkRubro.StkRubroAbr = ?) and 
        StkRubro.StkRubroTM = idStkMonedas order by StkRubro.StkRubroAbr`

      const params3 = [coeficiente, p.sogadobladillo, p.criquettanque];
      const d1 = await queryAsync(q3, params3);
      const valorcriquet = Number(d1[0].ValorAdicionales)
      const valorsogadobladillo = Number(d1[1].ValorAdicionales)

      const q4 = `Select 
            StkRubroDesc, StkRubroAbr,
          ((StkRubroCosto / StkRubroAncho * StkMonedasCotizacion * ? * ? )
            + ?) as ImpUnitario,  
            StkRubroCosto,  StkMonedasCotizacion 
            from BaseStock.StkRubro JOIN  BaseStock.StkMonedas 
            where StkRubro.StkRubroAbr = ?
            and StkRubro.StkRubroTM = idStkMonedas`

      const params4 = [
        coeficiente,
        metroscuadtotal,
        MOTarmado,
        StkRubroAbrP
      ];
      const d4 = await queryAsync(q4, params4);
      const di = d4[0]
      let impunitario = Number(di.ImpUnitario)
      if (ivasn === 'CIVA') {
        impunitario = Math.ceil(impunitario);
      } else {
        impunitario = Math.ceil(impunitario / 1.21);
      }
      let importesogaper = 0
      let importecriquetper = 0
      importesogaper = valorsogadobladillo * cantsoga
      importecriquetper = valorcriquet * cantcriquet

      if (StkRubroAbrP == 'POL19') {
        impunitario = Math.ceil((impunitario * 1.15 + MOTarmadoAd + importesogaper + importecriquetper) / 10) * 10
      }
      else {
        impunitario = Math.ceil((impunitario + MOTarmadoAd + importesogaper + importecriquetper) / 10) * 10
      }
      if (ivasn === 'CIVA') {
        impunitario = Math.ceil(impunitario / 10) * 10;
      } else {
        impunitario = Math.ceil(impunitario / 1.21 / 10) * 10;
      }

      // ------------------------------------------------------------------
      // 5) ARMO RESULTADO DEL ÍTEM
      // ------------------------------------------------------------------
      // Largo: Number(largo).toFixed(2),
      //   Ancho: Number(ancho).toFixed(2),
      detalle = detalle + di.StkRubroDesc
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
    console.log("Error en /presupbolsontanque", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;