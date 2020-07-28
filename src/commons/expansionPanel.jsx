import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: ".8em",
    color: "#9c9c9c",
  },
  subHeading: {
    fontSize: ".8em",
    fontWeight: "500",
    display: "grid",
  },
  title: {
    color: "#000",
    fontWeight: "500",
  },
  subTitle: {
    color: "#9c9c9c",
  },
  pos: {
    color: "#9c9c9c",
    fontSize: ".8em",
    fontWeight: "700",
  },
}));

export default function NewPanel() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} component="p">
            Music - Trending
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            #MakeitCanadianBeer
          </Typography>
          <Typography className={classes.subTitle}>
            The Most Canadian Case Ever
          </Typography>
          <Typography className={classes.pos}>
            {bull} Promted by Molson Canada
          </Typography>
        </CardContent>
      </Card>
      <Divider />
      <Card className={classes.newsPanel}>
        <CardContent>
          <Typography className={classes.subTitle}>
            News from Toronto star
          </Typography>
          <Typography className={classes.pos}>{bull} News Heading</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
