import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Addcustomer = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [customer, setCustomer] = useState({
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
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		setCustomer({ ...customer, [event.target.name]: event.target.value });
	};

	const addCustomer = () => {
		props.saveCustomer(customer);
		handleClose();
	};

	return (
		<div className={classes.root}>
			<Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.root}>
				Add customer
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">New customer</DialogTitle>
				<DialogContent>
					<DialogContentText>Fill the information for new customer</DialogContentText>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="First name"
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
					<Button onClick={addCustomer} color="primary">
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

export default Addcustomer;
