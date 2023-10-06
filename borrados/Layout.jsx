import { Outlet, Link } from "react-router-dom";
const Layout = () => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/Proveedores">Proveedores</Link>
					</li>
					<li>
						<Link to="/StkMonedas">Monedas</Link>
					</li>
					<li>
						<Link to="/Clientes">Clientes</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};
export default Layout;
