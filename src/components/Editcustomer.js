import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../App.css";

const EditCustomer = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [customer, setCustomer] = React.useState({
		firstname: "",
		lastname: "",
		streetaddress: "",
		postcode: "",
		city: "",
		email: "",
		phone: ""
	});

	const handleClickOpen = () => {
		setOpen(true);
		setCustomer({
			firstname: props.customer.firstname,
			lastname: props.customer.lastname,
			streetaddress: props.customer.streetaddress,
			postcode: props.customer.postcode,
			city: props.customer.city,
			email: props.customer.email,
			phone: props.customer.phone
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		setCustomer({ ...customer, [event.target.name]: event.target.value });
	};

	const editCustomer = () => {
		props.updateCustomer(customer, props.customer.links[0].href);
		handleClose();
	};

	return (
		<div className={classes.root}>
			<Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.root}>
				Edit customer
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
				<DialogContent>
					<DialogContentText>Fill the information to edit customer</DialogContentText>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Firstname"
						onChange={(e) => handleChange(e)}
						name="firstname"
						value={customer.firstname}
					/>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Lastname"
						onChange={(e) => handleChange(e)}
						name="lastname"
						value={customer.lastname}
					/>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Address"
						onChange={(e) => handleChange(e)}
						name="streetaddress"
						value={customer.streetaddress}
					/>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Postcode"
						onChange={(e) => handleChange(e)}
						name="postcode"
						value={customer.postcode}
					/>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="City"
						onChange={(e) => handleChange(e)}
						name="city"
						value={customer.city}
					/>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Email"
						onChange={(e) => handleChange(e)}
						name="email"
						value={customer.email}
					/>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Phone"
						onChange={(e) => handleChange(e)}
						name="phone"
						value={customer.phone}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={editCustomer} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const useStyles = makeStyles({
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		border: 0,
		borderRadius: 3,
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "white",
		height: 48
	}
});

export default EditCustomer;
