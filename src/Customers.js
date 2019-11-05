import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Addcustomer from "./Addcustomer";

const Customers = () => {
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

	const saveCustomer = (newCustomer) => {
		fetch("https://carstockrest.herokuapp.com/api/customers", {
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
			accessor: "_links.self.href",
			filterable: true,
			sortable: true,
			Cell: ({ value }) => (
				<Button size="small" color="secondary" onClick={() => deleteCustomer(value)}>
					Delete
				</Button>
			)
		}
	];

	return (
		<div>
			<Addcustomer saveCustomer={saveCustomer} />
			<ReactTable filterable={true} columns={columns} data={customers} />
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Car deleted" />
		</div>
	);
};

export default Customers;
