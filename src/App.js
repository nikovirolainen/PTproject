import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import TodayIcon from "@material-ui/icons/Today";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import "./App.css";
import Customers from "./components/Customers";
import Calendar from "./components/Calendar";

const App = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	return (
		<div>
			<BrowserRouter>
				<div>
					<div style={{ textAlign: "center", marginTop: 1 }}>
						<Switch>
							<Route path="/customers" component={Customers} />
							<Route path="/calendar" component={Calendar} />
							<Route render={() => <h1>Page not found</h1>} />
						</Switch>
					</div>
					<div>
						<BottomNavigation
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
							showLabels
							className={classes.root}
						>
							<BottomNavigationAction
								to="/customers"
								component={Link}
								label="Customers"
								icon={<FitnessCenterIcon />}
							/>
							<BottomNavigationAction
								to="/calendar"
								component={Link}
								label="Calendar"
								icon={<TodayIcon />}
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
		width: 2600
	}
});

export default App;
