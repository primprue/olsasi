import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header/Header.jsx";
 import Main from "./Main";
import CssBaseline from '@mui/material/CssBaseline';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
export const globalContext = React.createContext();

const App = () => {
	const [valor, setValor] = useState("");

	return (
		<>
		   {/* <ScopedCssBaseline> */}
			<CssBaseline >
			<Router>
				<div>
					<globalContext.Provider value={{ valor, setValor }}>
						<Header />
						<br></br>
						<Main />
					</globalContext.Provider>
					{/* <Footter/>   */}
				</div>
			</Router>
			</CssBaseline>
			{/* </ScopedCssBaseline> */}
		</>
	);
};

export default App;
