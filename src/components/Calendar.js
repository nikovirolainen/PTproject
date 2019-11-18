import React from "react";
import FullCalender from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
const moment = require("moment");

const Calendar = (props) => {
	const classes = useStyles();
	const [trainings, setTrainings] = React.useState([]);

	React.useEffect(() => {
		fetchTrainings();
	}, []);

	const fetchTrainings = () => {
		fetch("https://customerrest.herokuapp.com/api/trainings").then((response) =>
			response
				.json()
				.then((data) => {
					const formattedTrainings = data.content.map((training) => {
						const calendar = {};
						calendar.date = moment(training.date).format("YYYY-MM-DD");
						calendar.duration = training.duration;
						calendar.activity = training.activity;
						return calendar;
					});
					console.table(formattedTrainings);
					setTrainings(formattedTrainings);
				})
				.catch((err) => console.error(err))
		);
	};

	return (
		<div className={classes.root}>
			<FullCalender
				defaultView="dayGridMonth"
				plugins={[dayGridPlugin]}
				height={1000}
				aspectRatio={1}
				events={trainings.map((training) => {
					const calendar = {};
					calendar.date = training.date;
					calendar.title = training.activity;
					return calendar;
				})}
			/>
		</div>
	);
};

const useStyles = makeStyles({
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
	}
});

export default Calendar;
