import React from "react";
import Form from "../commons/form";
import Joi from "joi-browser";
import { login, getCurrentUser } from "../utilities/authServices";
import { Redirect } from "react-router-dom";

// Material-UI
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import twitter from "../assets/twitter.svg";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import theme from "../style/theme";

const styles = (theme) => ({
  heading: {
    marginTop: "15px",
    marginBottom: "10px",
    color: "#000",
    fontSize: "1.5em",
    fontWeight: "700",
    marginLeft: "3.8em",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "0px",
    },
  },
  logo: {
    width: "2.5em",
    height: "2.5em",
    paddingTop: "2em",
    margin: "auto",
    marginLeft: "4.6em",
    display: "inherit",
    [theme.breakpoints.down("lg")]: {
      marginLeft: "0px",
    },
  },
  loginContainer: {},
  btn: {
    textTransform: "none",
    marginLeft: "2.1em",
  },
});

class SignIn extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().required().label("Password").min(5).max(16),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.email, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = {
          ...this.state.errors,
        };
        errors.email = error.response.data;
        errors.password = errors.email;
        this.setState({
          errors,
        });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/" />;
    return (
      <Grid
        container
        direction="column"
        className={this.props.classes.loginContainer}
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <img
            src={twitter}
            alt="twitter logo"
            className={this.props.classes.logo}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            align={"center"}
            color={"secondary"}
            className={this.props.classes.heading}
          >
            Log in to Twitter
          </Typography>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("email", "Email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Log in", "submit")}
          </form>
          <Button
            component={"a"}
            href="https://twitter.com/home"
            color="secondary"
            variant="text"
            className={this.props.classes.btn}
          >
            Forget password?
          </Button>
          <Button
            component={Link}
            to="/signup"
            color="secondary"
            variant="text"
            className={this.props.classes.btn}
          >
            Sign up for Twitter
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SignIn);
