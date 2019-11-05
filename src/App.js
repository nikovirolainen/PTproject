import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Customers from "./Customers";
import Calendar from "./Calendar";

function App() {
	return (
		<div>
			<Customers />
			<div>
				<Router>
					<div>
						<Route exact path="/"></Route>
						<Route path="/calendar">
							<Calendar />
						</Route>
					</div>
				</Router>
			</div>
		</div>
	);
}

export default App;
