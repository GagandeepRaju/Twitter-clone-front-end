import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import twitter from "../assets/twitter.svg";

//Material-UI imports
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
// import MenuIcon from "@material-ui/icons/Menu";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  logo: {
    height: "1.2em",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
    padding: "0px",
  },
  tabLogin: {
    ...theme.typography.tab,
    minWidth: 10,
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "17px",
    paddingRight: "17px",
    borderRadius: "17px",
    marginRight: "15px",
    color: "#55acee",
    border: "2px solid #55acee",
  },
  tabSignup: {
    ...theme.typography.tab,
    minWidth: 10,
    color: "#FFF",
    backgroundColor: "#55acee",
    border: "2px solid #55acee",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "17px",
    paddingRight: "17px",
    borderRadius: "17px",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    borderRadius: "2em",
    minWidth: "30vW",
    backgroundColor: "#e7e7e7",
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    // width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1",
  },
  appbarleft: {
    minWidth: "24vW",
  },
  appbarRight: {
    minWidth: "15vW",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = props ? props : "";
  const [value, setValue] = useState(0);
  // const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  // const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/homepage" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/signup" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/signin" && value !== 2) {
      setValue(2);
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        className={classes.tabContainer}
      >
        <Tab
          className={classes.tab}
          label="Home"
          value={0}
          style={{ display: "none" }}
          component={Link}
          to={"/homepage"}
        />
        {!user && (
          <Tab
            disableRipple
            className={classes.tabLogin}
            label="Log in"
            value={2}
            component={Link}
            to={"/signin"}
          />
        )}
        {!user && (
          <Tab
            className={classes.tabSignup}
            label="Sign up"
            value={1}
            component={Link}
            to={"/signup"}
          />
        )}
      </Tabs>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <AppBar position="fixed" elevation={1}>
        <Toolbar disableGutters>
          <div className={classes.appbarleft}></div>
          <IconButton disableRipple component={Link} to="/homepage">
            <img alt="company-logo" src={twitter} className={classes.logo} />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Twitter"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {matches ? null : tabs}
          <div className={classes.appbarRight}></div>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
