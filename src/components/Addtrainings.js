import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
const moment = require("moment");

const Addtrainings = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [training, setTraining] = useState({
		activity: "",
		date: new Date(),
		duration: ""
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		setTraining({ ...training, [event.target.name]: event.target.value });
	};

	const addTraining = () => {
		training.date = moment(training.date).format();
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
					<DialogContentText>Fill the training date, duration and activity</DialogContentText>
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
						label="Duration"
						onChange={(e) => handleChange(e)}
						name="duration"
						value={training.duration}
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
