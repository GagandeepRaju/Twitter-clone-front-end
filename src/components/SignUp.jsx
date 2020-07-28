import React from "react";
import Form from "../commons/form";
import Grid from "@material-ui/core/Grid";
import Joi from "joi-browser";
import * as userServices from "../utilities/userServices";
import { toast } from "react-toastify";
import { loginWithJwt } from "../utilities/authServices";

import twitter from "../assets/twitter.svg";

// Material-Ui imports
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
// import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  heading: {
    marginTop: "15px",
    marginBottom: "10px",
    marginLeft: "50px",
  },
  model: {
    maxWidth: "auto",
    marginTop: "5em",
    marginLeft: "25em",
    marginRight: "25em",
    paddingLeft: "5em",
    [theme.breakpoints.down("md")]: {
      marginTop: "2em",
      marginLeft: "15em",
      marginRight: "15em",
      paddingLeft: "2em",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0",
      paddingLeft: "0em",
      paddingTop: "5em",
    },
  },
  gridCon: {
    marginTop: "2em",
    paddingTop: "2em",
    paddingBottom: "2em",
    paddingRight: "75px",
    backgroundColor: "#FFF",
    width: "auto",
    [theme.breakpoints.down("md")]: {
      minWidth: "600px",
      margin: "0",
    },
  },
  logo: {
    width: "2em",
    height: "2em",
    margin: "auto",
    display: "block",
  },
});

class SignUp extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
    modalOpen: false,
  };

  schema = {
    name: Joi.string().required().label("Name").min(5).max(16),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).max(16).label("Password"),
  };

  componentDidMount(props) {
    console.log(this.props.modalView);
    // this.setState({ modalOpen: true });
  }

  doSubmit = async () => {
    try {
      const response = await userServices.register(this.state.data);
      loginWithJwt(response.headers["x-auth-token"]);
      let res = { ...response };
      res = res.data["name"];
      toast.success(`${res}, has successfully Sign UP!`);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
        toast.error(errors.email);
      }
    }
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const modalOpen = this.props.modalView;

    return (
      <Modal
        open={modalOpen}
        onClose={this.handleClose}
        className={this.props.classes.model}
      >
        <Grid
          container
          className={this.props.classes.gridCon}
          direction="column"
          alignContent="center"
        >
          <Grid item>
            <img
              src={twitter}
              alt="twitter logo"
              className={this.props.classes.logo}
            />
          </Grid>
          <Grid item>
            <Typography
              align={"left"}
              variant={"h5"}
              className={this.props.classes.heading}
            >
              Create your account
            </Typography>
          </Grid>
          <Grid item>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Submit", "submit")}
            </form>
          </Grid>
        </Grid>
      </Modal>
    );
  }
}

export default withStyles(styles)(SignUp);
