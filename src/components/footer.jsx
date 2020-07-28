import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const useStyle = makeStyles((theme) => ({
  footer: {
    margin: "5em",
  },
  footerHead: {
    width: "70vW",
    textAlign: "center",
  },
}));

export default function Footer(props) {
  const classes = useStyle();

  return (
    <Grid
      container
      direction="column"
      justify="flex-end"
      alignItems="center"
      spacing={0}
      className={classes.footer}
    >
      <Grid item xs={12}>
        <Divider />
        <Paper elevation={1} className={classes.footerHead}>
          Footer of the Page
        </Paper>
      </Grid>
    </Grid>
  );
}
