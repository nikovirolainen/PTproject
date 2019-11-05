import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FolderIcon from "@material-ui/icons/Folder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "./App.css";
import Customers from "./Customers";
import Calendar from "./Calendar";

const useStyles = makeStyles({
	root: {
		width: 500
	}
});

const App = () => {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div>
			<div>
				<Customers />
			</div>
			<BottomNavigation value={value} onChange={handleChange} className={classes.root}>
				<BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
				<BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
				<BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
				<BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
			</BottomNavigation>
		</div>
	);
};

export default App;
