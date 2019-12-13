import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { makeStyles } from "@material-ui/core/styles";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Addtraining from "./Addtrainings";
import Edittraining from "./Edittraining";
const moment = require("moment");

const Trainings = () => {
	const classes = useStyles();
	const [trainings, setTrainings] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetchTrainings();
	}, []);

	const handleClose = (event, reason) => {
		setOpen(false);
	};

	const fetchTrainings = () => {
		fetch("https://customerrest.herokuapp.com/api/trainings").then((response) =>
			response
				.json()
				.then((data) => {
					const formattedTrainigs = data.content.map((item) => {
						const container = {};
						container.date = moment(item.date).format("YYYY-MM-DD-LT");
						container.duration = item.duration;
						container.activity = item.activity;
						container.customer = item.customer;
						container.href = item.links[0].href;
						return container;
					});
					setTrainings(formattedTrainigs);
				})
				.catch((err) => console.error(err))
		);
	};

	const saveTraining = (newTraining) => {
		fetch("https://customerrest.herokuapp.com/api/trainings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTraining)
		})
			.then((res) => fetchTrainings())
			.catch((err) => console.error(err));
	};

	const deleteTraining = (link) => {
		if (window.confirm("Are you sure?")) {
			fetch(link, { method: "DELETE" })
				.then((res) => fetchTrainings())
				.then((res) => setOpen(true))
				.catch((err) => console.error(err));
		}
	};

	const editTraining = (training, link) => {
		fetch(link, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(training)
		})
			.then((res) => fetchTrainings())
			.catch((err) => console.error(err));
	};

	const columns = [
		{
			Header: "Date",
			accessor: "date"
		},
		{
			Header: "Duration (min)",
			accessor: "duration"
		},
		{
			Header: "Activity",
			accessor: "activity"
		},
		{
			accessor: "href",
			Cell: ({ value }) => (
				<Button
					size="large"
					color="secondary"
					onClick={() => deleteTraining(value)}
					className={classes.root}
				>
					Delete training
				</Button>
			)
		},
		{
			accessor: "href",
			Cell: (row) => (
				<Button className={classes.root} size="small" color="secondary">
					<Edittraining training={row.original} updateTraining={editTraining} />
				</Button>
			)
		}
	];

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item></Grid>
			</Grid>
			<h1 align="canter">Trainings</h1>
			<div align="canter">
				<Addtraining saveTraining={saveTraining} />
			</div>
			<ReactTable data={trainings} columns={columns} filterable={true} />
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				message="Training deleted"
			/>
		</div>
	);
};

const useStyles = makeStyles({
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
	}
});

export default Trainings;
