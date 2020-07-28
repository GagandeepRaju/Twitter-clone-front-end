import React, { Component } from "react";
import {
  Container,
  Divider,
  Avatar,
  IconButton,
  Grid,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import * as userServices from "../utilities/userServices";
import * as userPosts from "../utilities/userPosts";
import Comment from "./Comment";
import People from "../commons/people";
import DeleteIcon from "@material-ui/icons/Delete";
import { logout } from "../utilities/authServices";
import twitter from "../assets/twitter.svg";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  logo: {
    height: "2em",
    width: "2em",
  },
  btn: {
    "&:hover": {
      backgroundColor: "#55acee1c",
    },
  },
});

class Profile extends Component {
  state = {
    value: "posts",
    posts: {},
    following: [],
    followers: [],
    baseUrl: process.env.REACT_APP_API_URL,
  };

  getUserDetails = async (userid) => {
    //
    try {
      let { data } = await userServices.userProfile(userid);
      const { following, followers } = data;
      this.setState({ user: data, following: following, followers: followers });
      if (data) {
        const { data: posts } = await userPosts.getPosts(data._id);
        this.setState({ posts });
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  componentDidMount() {
    const { _id } = this.props.user;
    if (_id !== undefined) {
      this.getUserDetails(_id);
    }
  }

  handleDelete = async (userid) => {
    //delete profile and signout
    try {
      const { data } = await userServices.deleteUser(userid);
      console.log(data);
      logout();
      window.location = "/";
    } catch (ex) {
      console.log(ex);
    }
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const value = this.state.value;
    const { user } = this.state;
    const { ...posts } = { ...this.state.posts };
    const following = this.state.following;
    const followers = this.state.followers;
    const photoUrl = this.state.baseUrl;

    return (
      <Container className="container">
        <Grid container direction="column" justify="center" alignItems="center">
          <Link to={"/homepage"}>
            <IconButton
              aria-label="link to homepage"
              className={this.props.classes.btn}
            >
              <img
                src={twitter}
                alt="logo"
                className={this.props.classes.logo}
              />
            </IconButton>
          </Link>
          <h1>Profile</h1>
          <Link to={"/editprofile"}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            aria-label="delete"
            onClick={() => this.handleDelete(user._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
        <div className="avatar">
          <Avatar
            alt={user ? user.name : ""}
            src={user ? userServices.photoUrl(user._id) : ""}
          />
          <h5>{user ? user.name : ""}</h5>
          <h5>{user ? user.email : ""}</h5>
        </div>
        <Divider />
        <h5>About : {user ? user.about : ""}</h5>
        <h5>Date Joined : {user ? user.created : ""}</h5>
        <Paper>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab value="posts" label="Posts" />
            <Tab value="follow" label="Following" />
            <Tab value="followr" label="Followers" />
          </Tabs>
          {this.state.value === "posts" && (
            <Comment
              posts={posts ? posts : null}
              user={user ? user : null}
              photo={photoUrl}
            />
          )}
          {this.state.value === "follow" && <People people={following} />}
          {this.state.value === "followr" && <People people={followers} />}
        </Paper>
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);
