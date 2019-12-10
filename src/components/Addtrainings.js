import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Addtrainings = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [training, setTraining] = useState({
		activity: "",
		date: "",
		time: "",
		customer: ""
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		setTraining({ ...training, [event.target.name]: event.target.value });
		console.log(training);
	};

	const addTraining = () => {
		props.saveTraining(training);
		handleClose();
	};

	return (
		<div className={classes.root}>
			<Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.root}>
				Add Training
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">New training</DialogTitle>
				<DialogContent>
					<DialogContentText>Fill the training date, time and activity</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						name="date"
						value={training.date}
						onChange={(e) => handleChange(e)}
						label="Date"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="time"
						value={training.time}
						onChange={(e) => handleChange(e)}
						label="Time"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="activity"
						value={training.activity}
						onChange={(e) => handleChange(e)}
						label="Activity"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="customer"
						value={training.customer}
						onChange={(e) => handleChange(e)}
						label="Customer(email)"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={addTraining} color="primary">
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

export default Addtrainings;
