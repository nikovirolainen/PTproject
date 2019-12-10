import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { makeStyles } from "@material-ui/core/styles";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Addcustomer from "./Addcustomer";
import Addtrainings from "./Addtrainings";

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

	const editCustomer = (editedCustomer) => {
		fetch("https://customerrest.herokuapp.com/api/customers/111", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(editedCustomer)
		})
			.then((res) => fetchCustomers())
			.catch((err) => console.error(err));
	};

	const saveTraining = (newTraining) => {
		fetch("https://customerrest.herokuapp.com/api/trainings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTraining)
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
					Delete
				</Button>
			)
		},
		{
			accessor: "links[1].href",
			Cell: ({ value }) => (
				<Button
					size="large"
					color="primary"
					onClick={() => editCustomer(value)}
					className={classes.root}
				>
					Edit
				</Button>
			)
		},
		{
			accessor: "links[2].href",
			Cell: ({ value }) => (
				<Button
					size="large"
					color="primary"
					onClick={() => saveTraining(value)}
					className={classes.root}
				>
					Add training
				</Button>
			)
		}
	];

	return (
		<div className={classes.root}>
			<Addcustomer saveCustomer={saveCustomer} />
			<Addtrainings saveTraining={saveTraining} />
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
