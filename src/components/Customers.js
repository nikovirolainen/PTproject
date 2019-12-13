import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { makeStyles } from "@material-ui/core/styles";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Addcustomer from "./Addcustomer";
import Editcustomer from "./Editcustomer";

const Customers = () => {
	const classes = useStyles();
	const [customers, setCustomers] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetchCustomers();
	}, []);

	const handleClose = (event, reason) => {
		setOpen(false);
	};
	const fetchCustomers = () => {
		fetch("https://customerrest.herokuapp.com/api/customers")
			.then((response) => response.json())
			.then((data) => setCustomers(data.content))
			.catch((err) => console.error(err));
	};

	const deleteCustomer = (link) => {
		if (window.confirm("Are you sure?")) {
			fetch(link, { method: "DELETE" })
				.then((res) => fetchCustomers())
				.then((res) => setOpen(true))
				.catch((err) => console.error(err));
		}
	};

	const editCustomer = (customer, link) => {
		fetch(link, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(customer)
		})
			.then((res) => fetchCustomers())
			.catch((err) => console.error(err));
	};

	const saveCustomer = (newCustomer) => {
		fetch("https://customerrest.herokuapp.com/api/customers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newCustomer)
		})
			.then((res) => fetchCustomers())
			.catch((err) => console.error(err));
	};

	const columns = [
		{
			Header: "First name",
			accessor: "firstname"
		},
		{
			Header: "Last name",
			accessor: "lastname"
		},
		{
			Header: "Street address",
			accessor: "streetaddress"
		},
		{
			Header: "Postal code",
			accessor: "postcode"
		},
		{
			Header: "City",
			accessor: "city"
		},
		{
			Header: "Email",
			accessor: "email"
		},
		{
			Header: "Phone",
			accessor: "phone"
		},
		{
			accessor: "links[0].href",
			Cell: ({ value }) => (
				<Button
					size="large"
					color="secondary"
					onClick={() => deleteCustomer(value)}
					className={classes.root}
				>
					Delete customer
				</Button>
			)
		},
		{
			accessor: "links[0].href",
			Cell: (row) => (
				<Button className={classes.root} size="small" color="secondary">
					<Editcustomer customer={row.original} updateCustomer={editCustomer} />
				</Button>
			)
		}
	];

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item></Grid>
			</Grid>
			<h1 align="canter">Customers</h1>
			<div align="canter">
				<Addcustomer saveCustomer={saveCustomer} />
			</div>
			<ReactTable filterable={true} columns={columns} data={customers} />
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				message="Customer deleted"
			/>
		</div>
	);
};

const useStyles = makeStyles({
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
	}
});

export default Customers;
