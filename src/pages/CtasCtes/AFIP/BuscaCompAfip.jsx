import React, { useState } from "react";

export default function BuscaCompAfip() {
	const [response, setResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendSoapRequest = async () => {
		setLoading(true);
		setError(null);

		const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://impl.service.wsmtxca.afip.gov.ar/service/">
        <soapenv:Header/>
        <soapenv:Body>
          <ser:consultarTiposComprobanteRequest>
            <authRequest>
              <token>your_token_here</token>
              <sign>your_sign_here</sign>
              <cuitRepresentada>33710380649</cuitRepresentada>
            </authRequest>
          </ser:consultarTiposComprobanteRequest>
        </soapenv:Body>
      </soapenv:Envelope>`;

		try {
			const response = await fetch("https://your-soap-endpoint-url", {
				method: "POST",
				headers: {
					"Content-Type": "text/xml",
					SOAPAction: "", // Dependiendo del servicio, podrías necesitar especificar un SOAPAction
				},
				body: soapEnvelope,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const responseText = await response.text();
			setResponse(responseText);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1>SOAP Request Example</h1>
			<button onClick={sendSoapRequest} disabled={loading}>
				{loading ? "Loading..." : "Send SOAP Request"}
			</button>
			{error && <p style={{ color: "red" }}>Error: {error}</p>}
			{response && <pre>{response}</pre>}
		</div>
	);
}
