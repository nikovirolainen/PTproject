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
const moment = require("moment");

const EditTraining = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [training, setTraining] = useState({
		activity: "",
		date: new Date(),
		duration: ""
	});

	const handleClickOpen = () => {
		setOpen(true);
		setTraining({
			activity: props.training.activity,
			date: props.training.date,
			duration: props.training.duration,
			customer: props.training.customer
		});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		setTraining({ ...training, [event.target.name]: event.target.value });
	};

	const editTraining = () => {
		training.date = moment(training.date).format();
		props.updateTraining(training, props.training.href);
		handleClose();
	};

	return (
		<div className={classes.root}>
			<Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.root}>
				Edit training
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit training</DialogTitle>
				<DialogContent>
					<DialogContentText>Fill the information to edit training</DialogContentText>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Date"
						onChange={(e) => handleChange(e)}
						name="date"
						type="datetime-local"
						value={training.date}
					/>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Activity"
						onChange={(e) => handleChange(e)}
						name="activity"
						value={training.activity}
					/>
					<TextField
						id="outlined-basic"
						margin="normal"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Duration"
						onChange={(e) => handleChange(e)}
						name="duration"
						value={training.duration}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={editTraining} color="primary">
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

export default EditTraining;
