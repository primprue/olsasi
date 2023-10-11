import React, { Component } from "react";
import printJS from "print-js";
import { makeStyles } from "tss-react/mui";
// import { Dialog } from '@material-ui/core';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
// import TableCell from '@material-ui/core/TableCell';

const styles = (theme) => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto",
	},
	table: {
		minWidth: 700,
	},
	row: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.background.default,
		},
	},
});

class ImprimirPantalla extends Component {
	constructor() {
		super();
		this.state = {
			open: true,
		};
	}

	handleChange = (name) => (event) => {
		this.setState({ [name]: event.target.checked });
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	UNSAFE_componentDidMount() {}

	render() {
		return (
			<div>
				{printJS({
					maxWidth: 800,
					properties: this.props.properties,
					scanStyles: false,
					printable: this.props.datos,
					type: "json",
					onPrintDialogClose: this.props.toggleImprimir(),
				})}
			</div>
		);
	}
}
export default makeStyles(styles)(ImprimirPantalla);
