const https = require("https");
const xml2js = require("xml2js");
const fs = require("fs");
const { execSync } = require("child_process");

function consultarFactura(cbteNro) {
	const xml = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://wsaa.view.sua.dvadac.desein.afip.gov">
       <soapenv:Header/>
       <soapenv:Body>
          <ns:FECompConsultar>
             <ns:Auth>
                <ns:Token>${tuToken}</ns:Token>
                <ns:Sign>${tuSign}</ns:Sign>
                <ns:Cuit>${tuCuit}</ns:Cuit>
             </ns:Auth>
             <ns:FeCompConsReq>
                <ns:PtoVta>1</ns:PtoVta> <!-- Punto de Venta -->
                <ns:CbteTipo>1</ns:CbteTipo> <!-- Tipo de Comprobante (Factura A) -->
                <ns:CbteNro>${cbteNro}</ns:CbteNro> <!-- Número de la Factura -->
             </ns:FeCompConsReq>
          </ns:FECompConsultar>
       </soapenv:Body>
    </soapenv:Envelope>`;

	const options = {
		hostname: "wswhomo.afip.gov.ar",
		port: 443,
		path: "/wsfev1/service.asmx",
		method: "POST",
		headers: {
			"Content-Type": "text/xml",
			"Content-Length": Buffer.byteLength(xml),
		},
	};

	const req = https.request(options, (res) => {
		let data = "";

		res.on("data", (chunk) => {
			data += chunk;
		});

		res.on("end", () => {
			xml2js.parseString(data, (err, result) => {
				if (err) {
					console.error("Error parsing XML:", err);
				} else {
					const respuesta =
						result["soapenv:Envelope"]["soapenv:Body"][0][
							"FECompConsultarResponse"
						][0]["ResultGet"][0];
					console.log("Datos de la factura:", respuesta);
				}
			});
		});
	});

	req.on("error", (error) => {
		console.error("Error en la solicitud:", error);
	});

	req.write(xml);
	req.end();
}

// Llama a la función con el número de la factura que quieres consultar
consultarFactura(12345678);
