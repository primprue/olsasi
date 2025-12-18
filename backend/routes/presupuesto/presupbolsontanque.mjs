import express from "express";
var router = express.Router();

import conexion from "../conexion.mjs";
conexion.connect(err => {
  if (err) {
    console.log("no se conecto en presupbolsontanque");
  } else {
    console.log("base de datos conectada en presupbolsontanque");
  }
});

// ------------------------------------------------------------------
// FUNCIÓN: ejecuta una consulta MySQL en modo async
// ------------------------------------------------------------------
function queryAsync(sql) {
  return new Promise((resolve, reject) => {
    conexion.query(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

router.get('/', async (req, res, next) => {

  // var q, anchotela, cantpaños, soga, cantsoga, criquet, cantcriquet, detallep, ivasn, detalle, cancriquet
  // var datosrec, buscaancho, segsoldarfaldon, coefMOT, termbordeeleg, valorMOTseg, valorsogacriq
  // var medida, alto, altodesc, altocalculo, altoconpared, perimetro, diametro, diametroI, segcortarpf, segunirpf, segunirpp
  // var segcortarpp, segspisofondo, totalreg, cantidad, costooriginal, segcortefondo, seghacercortes, mcuadradosfaldon, calpaños, canttelapiso
  // var segcortefondo, seghacercortes, mcuadradosfaldon, calpaños, canttelapiso
  // var importesogaper, importecriquetper, valormcuad
  // var SegundosMOT





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
      let anchoparedcal = Number(anchopared)
      const q2 = `Select StkRubroAncho  as AnchoTela  from BaseStock.StkRubro where StkRubro.StkRubroAbr = "${StkRubroAbrP}" `

      const d = await queryAsync(q2);
      const anchotela = d[0]
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
          diametroI = medidarec * 1 + .05
          perimetro = diametro * 3.1416
          detalle = detalle + medidarec + ' de diámetro interno '
          break;
        case "DE":
          diametro = medidarec * 1
          diametroI = (medidarec - (anchoparedcal * 2)) + .05
          perimetro = diametro * 3.1416
          detalle = detalle + medidarec + ' de diámetro externo '
          break;
        default:
          perimetro = medidarec * 1
          diametro = medidarec / 3.1416 + .05
          diametroI = diametro
          detalle = detalle + medidarec + ' de perímetro externo ';
      }

      let altoconpared = altorec + anchoparedcal
      detalle = detalle + ' con pared de ' + anchopared + ' mts. y un alto de ' + (altodesc * 1).toFixed(2) + ' mts. (incluye sobrante para doblar), '

      let altocalculo = 0
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

      let metroscuaddiam = (diametro * diametro).toFixed(0)
      let metroscuadper = (altocalculo * perimetro).toFixed(0)

      let metroscuadtotal = metroscuaddiam + metroscuadper
      let SegundosMOT = 0
      let calpaños = 0
      if (StkRubroAbrP == 'POL19') {
        SegundosMOT = perimetro * 600
        if (anchoparedcal > 0.10) {
          SegundosMOT = SegundosMOT + perimetro * 600
        }
      }

      //hasta acá excepto porque falta calcular el diametro interno en DE y en PE, todo está bien para pol19

      else {
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


        let metroscuadtotal = canttelapiso * 1 + metroscuadper * 1
        // 240 segundos para soldar los paños del perímetro al fondo

        let segspisofondo = perimetro * 240
        let segcortefondo = perimetro * 120


        SegundosMOT = SegundosMOT + segcortarpf + segunirpf + segcortarpp + segunirpp + segspisofondo + segcortefondo
        let seghacercortes = 0
        let mcuadradosfaldon = 0
        let calpaños = 0
        let cantpaños = 0
        switch (termbordeeleg) {
          case "SF":
            SegundosMOT
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
        let cantcriquet = 0
        let cantsoga = 0
        let cancriquet = 0
        console.log('termbordeele  ', termbordeeleg)
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
        detalle = detalle + ' borde superior recto  en :'
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
     (StkRubroCosto * StkMonedasCotizacion * ${coeficiente}  ) as ValorAdicionales,
     StkRubroCosto, StkMonedasCotizacion  from BaseStock.StkRubro JOIN  BaseStock.StkMonedas
        where (StkRubro.StkRubroAbr = "${p.sogadobladillo}" or 
        StkRubro.StkRubroAbr = "${p.criquettanque}") and 
        StkRubro.StkRubroTM = idStkMonedas order by StkRubro.StkRubroAbr`

      const d1 = await queryAsync(q3);
      const valorsogadobladillo = Number(d1[0].ValorAdicionales)
      const valorcriquet = Number(d1[1].ValorAdicionales)

      // valorsogacriq = ['Select ',
      //   '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
      //   ' ) as ValorAdicionales, ',
      //   'StkRubroCosto, ',
      //   'StkMonedasCotizacion ',
      //   'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
      //   'where (StkRubro.StkRubroAbr = "', soga, '" ',
      //   'or StkRubro.StkRubroAbr = "', criquet, '") ',
      //   'and StkRubro.StkRubroTM = idStkMonedas order by StkRubro.StkRubroAbr'
      // ].join('')

      // conexion.query(
      //   valorsogacriq,
      //   function (err, result) {
      //     if (err) {
      //       console.log('error en mysql')
      //       console.log(err)
      //     }
      //     else {
      //       importesogaper = p.ValorAdicionales * cantcriquet
      //       importecriquetper = result[1].ValorAdicionales * cantsoga
      //     }
      const q4 = `Select 
      StkRubroDesc, StkRubroAbr,
     ((StkRubroCosto / StkRubroAncho * StkMonedasCotizacion * ${coeficiente} * ${metroscuadtotal} )
      + ${MOTarmado})
      as ImpUnitario,
     StkRubroCosto, 
            StkMonedasCotizacion 
            from BaseStock.StkRubro JOIN  BaseStock.StkMonedas 
            where StkRubro.StkRubroAbr = "${StkRubroAbrP}" 
            and StkRubro.StkRubroTM = idStkMonedas`

      const d4 = await queryAsync(q4);
      const di = d4[0]
      let impunitario = Number(di.ImpUnitario)
      if (ivasn === 'CIVA') {
        impunitario = Math.ceil(impunitario / 10) * 10;
      } else {
        impunitario = Math.ceil(impunitario / 1.21 / 10) * 10;
      }
      let importesogaper = 0
      let importecriquetper = 0
      importesogaper = valorsogadobladillo * cantsoga
      importecriquetper = valorcriquet * cantcriquet
      //       importesogaper = p.ValorAdicionales * cantcriquet
      //       importecriquetper = result[1].ValorAdicionales * cantsoga

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
      resultados.push({
        ImpUnitario: impunitario,
        Detalle: detalle,
        Largo: Number(largo).toFixed(2),
        Ancho: Number(ancho).toFixed(2),
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