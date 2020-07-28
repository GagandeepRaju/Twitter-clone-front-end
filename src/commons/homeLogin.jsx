import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  login: {},
  loginTypo: {
    backgroundColor: "#88c5f37d",
  },
  form: {
    minWidth: "340px",
    padding: "0px",
    margin: "0px",
  },
  forget: {
    textTransform: "none",
  },
  btn: {
    textTransform: "none",
    border: "2px solid #55acee",
    borderRadius: "25px",
    fontSize: "1em",
    marginBottom: "1em",
    marginTop: "1em",
  },
  or: {
    textAlign: "center",
  },
}));

export default function HomeLogin(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.LoginCon}
      direction="column"
      alignItems="center"
    >
      <Grid item sm={11}>
        <form className={classes.form}>
          <TextField
            className={classes.login}
            id="loginId"
            label="Phone, email, or username"
            color="secondary"
            placeholder="Phone, email, or username"
            helperText="nothing for now"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
          <TextField
            id="loginPassword"
            label="Password"
            color="secondary"
            placeholder="password"
            helperText="nothing for now"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
          />
          <Button
            className={classes.forget}
            color="secondary"
            component="a"
            variant="text"
            href="https://twitter.com/home"
            target="_blank"
          >
            Forget Password?
          </Button>
          <Button
            component="a"
            fullWidth
            className={classes.btn}
            color="secondary"
          >
            Log In
          </Button>
          <Typography className={classes.or}>or</Typography>
          <Button
            component="a"
            fullWidth
            className={classes.btn}
            color="primary"
            style={{ backgroundColor: "#55acee" }}
          >
            Sign up
          </Button>
        </form>
      </Grid>
    </Grid>
  );
}
