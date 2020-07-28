import React from "react";
import NewsTabs from "./NewsTabs";

//Material-Ui imports
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import NewPanel from "../commons/expansionPanel";

const useStyles = makeStyles((theme) => ({
  newsFeed: {},
  newsFeedTitle: {
    fontFamily: "roboto",
    fontSize: "1.2em",
    fontWeight: "700",
    marginLeft: "10px",
  },
  paperCon: {
    width: "610px",
  },
}));

export default function DefaultHomePage(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.newsFeed} direction="column">
      <Grid item>
        <Paper variant="outlined" className={classes.paperCon}>
          <Typography variant="subtitle1" className={classes.newsFeedTitle}>
            Explore
          </Typography>
          <NewsTabs />
          <NewPanel />
        </Paper>
      </Grid>
    </Grid>
  );
}
