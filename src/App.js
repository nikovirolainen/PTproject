import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Customers from "./Customers";

function App() {
	return (
		<div>
			<Customers />
		</div>
	);
}

export default App;
