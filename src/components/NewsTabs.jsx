import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    minWidth: "90px",
    textTransform: "none",
  },
  tabPanel: {
    backgroundColor: "#e0e0e0",
  },
}));

export default function NewsTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          aria-label="scrollable auto tabs example"
          scrollButtons="off"
          className={classes.tabs}
        >
          <Tab className={classes.tab} label="For You" {...a11yProps(0)} />
          <Tab className={classes.tab} label="Covid 19" {...a11yProps(1)} />
          <Tab className={classes.tab} label="News" {...a11yProps(2)} />
          <Tab className={classes.tab} label="Sports" {...a11yProps(3)} />
          <Tab
            className={classes.tab}
            label="Entertainment"
            {...a11yProps(4)}
          />
          <Tab className={classes.tab} label="Fun" {...a11yProps(5)} />
          <Tab className={classes.tab} label="Business" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={{ root: classes.tabPanel }}>
        <img
          src="https://placeimg.com/600/480/people"
          alt="people"
          style={{ margin: "5px" }}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <img
          src="https://placeimg.com/600/480/tech"
          alt="people"
          style={{ margin: "5px" }}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <img
          src="https://placeimg.com/600/480/tech/sepia"
          alt="people"
          style={{ margin: "5px" }}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <img
          src="https://placeimg.com/600/480/nature/sepia"
          alt="people"
          style={{ margin: "5px" }}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <img
          src="https://placeimg.com/600/480/animals"
          alt="people"
          style={{ margin: "5px" }}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <img
          src="https://placeimg.com/600/480/animals/grayscale"
          alt="people"
          style={{ margin: "5px" }}
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <img
          src="https://placeimg.com/600/480/people"
          alt="people"
          style={{ margin: "5px" }}
        />
      </TabPanel>
    </div>
  );
}
