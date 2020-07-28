import React from "react";
import Form from "../commons/form";
import Joi from "joi-browser";
import { getCurrentUser } from "../utilities/authServices";
import * as userPosts from "../utilities/userPosts";
import * as userServices from "../utilities/userServices";

// Material-Ui imports
import { withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";

const styles = {
  newstitle: {
    fontSize: "1em",
    fontWeight: "700",
    position: "fixed",
    "&:hover": {
      backgroundColor: "#FFF",
    },
  },
  newsfeed: {
    margin: "0px",
  },
  menuBtn: {
    height: "2.5em",
    minWidth: "610px",
    backgroundColor: "#fff",
  },
  input: {
    display: "none",
  },
  tweet: {
    marginLeft: "auto",
    width: "auto",
    marginRight: "25px",
  },
  uploadIcon: {
    marginTop: "10px",
    marginLeft: "25px",
  },
};

class Newsfeed extends Form {
  state = {
    data: {
      text: "",
    },
    user: {},
    photo: false,
    errors: {},
  };

  schema = {
    text: Joi.string().label("text"),
  };

  updateState = (user, photo) => {
    this.setState({ user, photo });
  };

  componentDidMount() {
    const user = getCurrentUser();
    const { photo } = this.props;
    this.updateState(user, photo);
  }

  doSubmit = async () => {
    try {
      const user = getCurrentUser();
      const { text } = this.state.data;
      const { data } = await userPosts.addPost(user._id, text);
      console.log(data);
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { user } = this.state;
    const { photo } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container direction="column">
          <Paper elevation={3} className={this.props.classes.newsfeed}>
            <Box className={this.props.classes.menuBtn} position="sticky">
              <Button
                className={this.props.classes.newstitle}
                variant="text"
                component={Link}
                to="/homepage"
              >
                Home
              </Button>
            </Box>
            <Divider />
            <Grid
              id={user._id}
              item
              xs={12}
              sm={12}
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
              style={{ margin: "10px" }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={user.name}
                  src={photo ? userServices.photoUrl(user._id) : ""}
                  style={{
                    width: 60,
                    height: 60,
                    margin: 10,
                  }}
                />
              </ListItemAvatar>
              <ListItemText id={user._id} primary={user.name} />
            </Grid>
            {this.renderPostInput("text", "What's happening...", "text")}

            <Grid item>
              <Grid container direction="row">
                <input
                  accept="image/*"
                  className={this.props.classes.input}
                  id="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="secondary"
                    aria-label="upload picture"
                    component="span"
                    className={this.props.classes.uploadIcon}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <Box className={this.props.classes.tweet}>
                  {this.renderButton("Tweet", "submit")}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(Newsfeed);
