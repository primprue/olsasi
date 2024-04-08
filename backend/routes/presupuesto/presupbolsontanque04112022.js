var express = require("express");
var router = express.Router();
var path = require("path");
var conexion = require("../conexion");

conexion.connect(function (err) {
  if (!err) {
    console.log("base de datos conectada en presupbolsontanque");
  } else {
    console.log("no se conecto en presupbolsontanque");
  }
});

var datosenvio = [];

var router = express();
router.get("/", (req, res) => {
  var q,
    q = ['select * from BasePresup.PresupParam'].join(' ')
  conexion.query(q,
    function (err, result) {
      if (err) {
        console.log(err);
      }

      var coeficiente = 0,
        metroscuaddiam = 0.0,
        metroscuadper = 0.0,
        metroscuadtotal = 0.0,
        StkRubroAbrP = "",
        tipomedeleg = '',
        MOTarmado = 0.0,
        MOTarmadoAd = 0.0,
        SegundosMOTAd = 0.0,
        anchopared = 0.0;
      anchotela = 0.0;
      medida = 0;
      alto = 0.0;
      perimetro = 0.0;
      diametro = 0.0;
      diametroI = 0.0;

      segcortarpf = 0.0;
      segunirpf = 0.0;
      segcortarpp = 0.0;
      segunirpp = 0.0;
      segspisofondo = 0.0;
      segcortefondo = 0.0;
      seghacercortes = 0.0;
      mcuadradosfaldon = 0.0;

      calpaños = 0.0;
      cantpaños = 0.0;
      canttelapiso = 0.0;


      soga = result[0].sogadobladillo;
      cantsoga = 0;
      criquet = result[0].criquettanque;
      cantcriquet = 0;


      datosrec = JSON.parse(req.query.datoscalculo);

      totalreg = datosrec.length
      detallep = datosrec[0].detallep
      cantidad = datosrec[0].cantidad;
      StkRubroAbrP = datosrec[0].StkRubroAbr;
      ivasn = datosrec[0].ivasn;
      tipomedeleg = datosrec[0].tipomedeleg;
      termbordeeleg = datosrec[0].termbordeeleg;
      medida = datosrec[0].medida * 1;
      alto = datosrec[0].alto * 1;
      anchopared = datosrec[0].anchopared * 1 / 100;

      buscaancho = ['Select StkRubroAncho  as AnchoTela  from BaseStock.StkRubro where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" '].join('')
      conexion.query(buscaancho,
        function (err, rbuscaancho) {
          if (err) {
            console.log(err);
          }
          anchotela = rbuscaancho[0].AnchoTela * 1
          detalle = "Bolsón para tanque de "
          switch (tipomedeleg) {
            case "CC":
              perimetro = medida * 3;
              diametro = (perimetro / 3.1416) * 1.02
              diametroI = diametro + .05
              detalle = detalle + medida + ' chapas '
              break;
            case "DI":
              diametro = medida + (anchopared * 2)
              diametroI = medida * 1 + .05
              perimetro = diametro * 3.1416
              detalle = detalle + medida + ' de diámetro interno '
              break;
            case "DE":
              diametro = medida * 1
              diametroI = (medida - (anchopared * 2)) + .05
              perimetro = diametro * 3.1416
              detalle = detalle + medida + ' de diámetro externo '
              break;
            default:
              perimetro = medida * 1
              diametro = medida / 3.1416 + .05
              diametroI = diametro
              detalle = detalle + medida + ' de perímetro externo ';
          }


          detalle = detalle + ' con pared de ' + anchopared + ' mts. y un alto de ' + alto + ' mts. en : '
          // console.log('termbordeeleg  ', termbordeeleg)
          // console.log('alto  ', alto)
          // if (termbordeeleg === 'SF') {
          //   alto = alto + anchopared + 0.3
          //   if (alto <= 1.50) {
          //     alto = 1.50
          //   }
          // }
          // else {
          //   alto = alto + anchopared
          // }
          // console.log('alto  ', alto)

          if (StkRubroAbrP === 'POL19') {
            if (alto > 1.50 && alto <= 2) {
              alto = 2.00
            }
            else {
              if (alto > 2 && alto <= 3) {
                alto = 3.00
              }
              else {
                if (alto > 3) {
                  alto = alto.toFixed(0) + 0.5
                }
              }
            }
          }
          else {
            alto = alto + anchopared + 0.3
            if (alto <= 1.50) {
              alto = 1.50
            }
          }


          metroscuaddiam = (diametro * diametro).toFixed(0)
          metroscuadper = (alto * perimetro).toFixed(0)

          metroscuadtotal = metroscuaddiam * 1 + metroscuadper * 1

          if (StkRubroAbrP == 'POL19') {
            SegundosMOT = perimetro * 600

          }

          //hasta acá excepto porque falta calcular el diametro interno en DE y en PE, todo está bien para pol19

          else {
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

            segcortarpf = (120 * cantpaños)
            segunirpf = (150 * diametroI * (cantpaños - 1))
            canttelapiso = cantpaños * diametroI * anchotela

            //cortar paños del perímetro 120 seg. MOT 1 persona  por paño
            //soldar paños del perímetro 150 seg. MOT 1 persona  por metro de soldura

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



            metroscuadtotal = canttelapiso * 1 + metroscuadper * 1
            // 240 segundos para soldar los paños del perímetro al fondo

            segspisofondo = perimetro * 240
            segcortefondo = perimetro * 120

            SegundosMOT = segcortarpf + segunirpf + segcortarpp + segunirpp + segspisofondo + segcortefondo

            switch (termbordeeleg) {
              case "SF":
                SegundosMOT = SegundosMOT
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

              default:
                console.log('vino al default')

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
            detalle = detalle + ' borde superior sin terminación '
          }
          if (termbordeeleg === "CFS") {
            detalle = detalle + ' borde superior c/soga de ajuste '
          }
          if (termbordeeleg === "CFC") {
            detalle = detalle + ' borde superior c/criquet de ajuste '
          }
          if (termbordeeleg === "SF") {
            detalle = detalle + ' borde superior recto '
          }

          if (datosrec[0].minmay == 'my') {
            coeficiente = result[0].coeficientemay
            coefMOT = result[0].coefMOTmay
            ivasn = 'CIVA'
          }
          else {
            coeficiente = result[0].coeficientemin
            coefMOT = result[0].coefMOTmin
          }



          if (diametro > 12) {
            if ((Math.floor(diametro)) === 12) {
              SegundosMOTAd = 1800
            }
            else {
              SegundosMOTAd = ((Math.floor(diametro) - 12) * 1800)
            }


          }
          valorMOTseg = result[0].costoMOT * coefMOT / 60 / 60


          MOTarmado = valorMOTseg * SegundosMOT
          MOTarmadoAd = valorMOTseg * SegundosMOTAd

          valorsogacriq = ['Select ',
            '(StkRubroCosto * StkMonedasCotizacion * ', coeficiente,
            ' ) as ValorAdicionales, ',
            'StkRubroCosto, ',
            'StkMonedasCotizacion ',
            'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
            'where (StkRubro.StkRubroAbr = "', soga, '" ',
            'or StkRubro.StkRubroAbr = "', criquet, '") ',
            'and StkRubro.StkRubroTM = idStkMonedas order by StkRubro.StkRubroAbr'
          ].join('')

          conexion.query(
            valorsogacriq,
            function (err, result) {
              if (err) {
                console.log('error en mysql')
                console.log(err)
              }
              else {
                importesogaper = result[0].ValorAdicionales * cantcriquet
                importecriquetper = result[1].ValorAdicionales * cantsoga
              }

              valormcuad = ['Select ',
                'StkRubroDesc, StkRubroAbr, ',
                '((StkRubroCosto / StkRubroAncho * StkMonedasCotizacion * ', coeficiente,
                ' * ', metroscuadtotal, ')',
                ' + ', MOTarmado,
                ' ) as ImpUnitario, ',
                'StkRubroCosto, ',
                'StkMonedasCotizacion ',
                'from BaseStock.StkRubro JOIN  BaseStock.StkMonedas ',
                'where StkRubro.StkRubroAbr = "', StkRubroAbrP, '" ',
                'and StkRubro.StkRubroTM = idStkMonedas '
              ].join('')


              if (detallep !== '') {
                detalle = detallep + ' '
              }
              conexion.query(
                valormcuad,
                function (err, result) {
                  if (err) {
                    console.log('error en mysql')
                    console.log(err)
                  }
                  else {
                    result[0].Detalle = detalle
                    result[0].Largo = 0.00
                    result[0].Ancho = 0.00

                    if (StkRubroAbrP == 'POL19') {
                      result[0].ImpUnitario = Math.ceil((result[0].ImpUnitario * 1.15 + MOTarmadoAd + importesogaper + importecriquetper) / 10) * 10
                    }
                    else {
                      result[0].ImpUnitario = Math.ceil((result[0].ImpUnitario * 1 + MOTarmadoAd + importesogaper + importecriquetper) / 10) * 10
                    }
                    if (ivasn == 'CIVA') {
                      result[0].ImpUnitario = Math.ceil((result[0].ImpUnitario) / 10) * 10
                    }
                    else {
                      result[0].ImpUnitario = Math.ceil((result[0].ImpUnitario / 1.21) / 10) * 10
                    }

                    datosenvio.push(result)
                    res.json(datosenvio)
                    datosenvio = []
                  }
                })
            })
        })
    })
});

conexion.end;
module.exports = router;
