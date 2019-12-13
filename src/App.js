import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import PersonIcon from "@material-ui/icons/Person";
import TodayIcon from "@material-ui/icons/Today";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import "./App.css";
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import Calendar from "./components/Calendar";

const App = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	return (
		<div>
			<BrowserRouter>
				<div>
					<div style={{ textAlign: "center" }}>
						<Switch>
							<Route path="/customers" component={Customers} />
							<Route path="/trainings" component={Trainings} />
							<Route path="/calendar" component={Calendar} />
							<Route path="/" component={Customers} />
							<Route render={() => <h1>Page not found</h1>} />
						</Switch>
					</div>
					<div className={classes.holo}>
						<BottomNavigation
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
							showLabels
							className={classes.holo}
						>
							<BottomNavigationAction
								to="/customers"
								component={Link}
								label="Customers"
								icon={<PersonIcon />}
								className={classes.root}
							/>
							<BottomNavigationAction
								to="/calendar"
								component={Link}
								label="Calendar"
								icon={<TodayIcon />}
								className={classes.root}
							/>
							<BottomNavigationAction
								to="/trainings"
								component={Link}
								label="Trainings"
								icon={<FitnessCenterIcon />}
								className={classes.root}
							/>
						</BottomNavigation>
					</div>
				</div>
			</BrowserRouter>
		</div>
	);
};

const useStyles = makeStyles({
	root: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		border: 0,
		borderRadius: 7,
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "black",
		height: 60,
		padding: "10 30px"
	},
	holo: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
	}
});

export default App;
