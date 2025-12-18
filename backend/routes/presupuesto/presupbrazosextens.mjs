import express from 'express';

var router = express.Router();

import conexion from '../conexion.mjs';



conexion.connect(err => {
  if (err) {
    console.log("no se conecto en presupbrazosextens");
  } else {
    console.log("base de datos conectada en presupbrazosextens");
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

  try {
    const datosrec = JSON.parse(req.query.datoscalculo);
    const parametros = await queryAsync(`SELECT * FROM BasePresup.PresupParam`);
    const p = parametros[0];

    const resultados = [];


    for (const item of datosrec) {
      const {
        tipomecanismo,
        stkrubroabrtbr,
        StkRubroAbr,
        detallep,
        ivasn,
        largo,
        ancho,
        altovolado,
        minmay,
      } = item;


      let anchocal = Number(ancho) + 0.08
      let enteropanios = Math.trunc(anchocal / 1.50)

      // coeficientes
      const coeficiente =
        minmay === "my" ? p.coeficientemay : p.coeficientemin;
      const coefMOT =
        minmay === "my" ? p.coefMOTmay : p.coefMOTmin;
      let ivasncal = minmay === "my" ? "CIVA" : ivasn;
      let MOTarmado = 0;

      if (Number(largo) <= 1.60) {
        MOTarmado = 44 * anchocal

      }
      else if (Number(largo) > 1.60 && Number(largo) <= 2.60) {
        MOTarmado = 55 * anchocal
      }
      else {
        MOTarmado = 65 * anchocal
      }
      let largocal = 0
      if (altovolado === 0) {
        largocal = Number(largo) + 0.5
      }
      else {
        largocal = Number(largo) + 0.70 + (altovolado / 100) //agrego .5 del toldo + .2 del volado para doblar
        MOTarmado = MOTarmado + (17 * anchocal)
      }
      let valorMOTmin = p.costoMOT * coefMOT / 60



      const decimalpanios = (anchocal / 1.5) - enteropanios;

      const panios = decimalpanios > 0 ? enteropanios + 1 : enteropanios;



      /*El valor de los brazos y caños correspondientes, por abreviatura  */
      /*decidir si tiene compensador o no, como es*/
      /*decidir cantidad de brazos */
      /*
              MOTOR 30 NW S/AYUDA MANUAL		AT047		
              MOTOR 50 NW S/AYUDA MANUAL		AT048		
              MOTOR 30 NW C/AYUDA MANUAL		AT049		
              MOTOR 50 NW C/AYUDA MANUAL		AT050		
              MOTOR 30 NW C/CONTROL REMOTO		AT051	
              MOTOR 50 NW C/CONTROL REMOTO		AT052
      */
      const q1 = `
          SELECT
            StkRubroAbr,
            (StkRubroCosto * StkMonedasCotizacion * ${coeficiente}) AS ValorToldoBarrac,
            StkRubroCosto,
            StkMonedasCotizacion
          FROM BaseStock.StkRubro
          JOIN BaseStock.StkMonedas
            ON StkRubro.StkRubroTM = idStkMonedas
          WHERE StkRubro.StkRubroAbr = "${stkrubroabrtbr}"
        `;
      const q2 = `
        SELECT
          StkRubroDesc,
          StkRubroAbr,
          (StkRubroCosto * StkMonedasCotizacion * ${coeficiente}  * ${panios} 
            * ${largocal}) AS ImpUnitario,
          StkRubroCosto,
          StkMonedasCotizacion
        FROM BaseStock.StkRubro
        JOIN BaseStock.StkMonedas
          ON StkRubro.StkRubroTM = idStkMonedas
        WHERE StkRubro.StkRubroAbr = "${StkRubroAbr}"
      `;
      const datos1 = await queryAsync(q1);
      const valtoldbarrac = Number(datos1[0].ValorToldoBarrac)
      const datos2 = await queryAsync(q2);
      const valimpuntil = Number(datos2[0].ImpUnitario)





      // Diccionario en lugar de switch
      const motores = {
        MotorCT: { abreviatura: "AT048", detalle: "con tecla" },
        MotorCC: { abreviatura: "AT052", detalle: "con control remoto" },
      };

      // Obtener datos del mecanismo
      const motor = motores[tipomecanismo] || { abreviatura: "", detalle: "" };
      const abrevmotor = motor.abreviatura;
      const detallemotor = motor.detalle;
      let valormotor = null;

      let importemotor = [0];
      if (abrevmotor !== "") {
        valormotor = `
          SELECT 
            StkRubroAbr,
            (StkRubroCosto * StkMonedasCotizacion * ${coeficiente} * 1) AS ValorMotor,
            StkRubroCosto,
            StkMonedasCotizacion
          FROM BaseStock.StkRubro 
          JOIN BaseStock.StkMonedas 
            ON StkRubro.StkRubroTM = idStkMonedas
          WHERE StkRubro.StkRubroAbr = "${abrevmotor}"
        `;

        importemotor = await queryAsync(valormotor);
      }
      /* busca valor de toldo barracuadra */



      let detalle = ""

      if (detallep == '') {
        detalle = "Toldo Barracuadra "
      }
      else {
        detalle = detallep + ''
      }

      let impmotor = importemotor[0].ValorMotor != undefined ? importemotor[0].ValorMotor : 0

      let importe1 = Number(valimpuntil) + Number(valtoldbarrac) + Number(impmotor)
      importe1 = importe1 + (valorMOTmin * MOTarmado)
      altovolado != 0 ? detalle = `${detalle} con volado de ${altovolado} cm. ` : detalle = `${detalle}`

      tipomecanismo != 'Manual' ? detalle = `${detalle} con Motor ${detallemotor} ` : detalle = `${detalle} `

      detalle = `${detalle} en :  ${StkRubroAbr}`

      if (ivasn === "CIVA") {
        importe1 = Math.ceil(importe1 / 10) * 10;
      } else {
        importe1 = Math.ceil(importe1 / 1.21 / 10) * 10;
      }
      resultados.push({
        ImpUnitario: importe1,
        Detalle: detalle,
        Largo: Number(largo).toFixed(2),
        Ancho: Number(ancho).toFixed(2),
        MDesc: "S",
      });
    }
    res.json(resultados);

  } catch (err) {
    console.log("Error en /presupbrazosextens", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
export default router;