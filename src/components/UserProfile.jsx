import React, { Component } from "react";
import { Container, Divider, Avatar, Grid, Button } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as userServices from "../utilities/userServices";
import { getCurrentUser } from "../utilities/authServices";
import Comment from "./Comment";
import People from "../commons/people";
import _ from "underscore";

class UserProfile extends Component {
  state = {
    value: "posts",
    posts: {},
    loginUser: {},
    logUserProfile: {},
    logfollowing: [],
    following: [],
    followers: [],
    isFollowing: false
  };

  getUserDetails = async userid => {
    //
    try {
      const loginUser = getCurrentUser();
      let { data: user } = await userServices.userProfile(userid);
      const { following, followers } = user;
      const { data: logUserProfile } = await userServices.userProfile(
        loginUser._id
      );
      const { following: logfollowing } = logUserProfile;
      let findout = _.mapObject(logfollowing, (val, key) => {
        return val._id;
      });
      findout = _.isMatch(findout, userid);
      this.setState({
        user,
        following,
        followers,
        loginUser,
        logUserProfile,
        logfollowing,
        isFollowing: findout
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handlefollowUnfollow = async userid => {
    //
    try {
      await userServices.removeFollowing(userid, this.state.loginUser._id);
      window.location = "/";
    } catch (ex) {
      console.log(ex);
    }
  };

  componentDidMount(props) {
    const userid = this.props.match.params.userid;
    if (userid !== undefined) {
      this.getUserDetails(userid);
    }
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const value = this.state.value;
    const { user } = this.state;
    const following = this.state.following;
    const followers = this.state.followers;
    return (
      <Container className="container">
        <Grid container direction="row" justify="center" alignItems="center">
          <h1>User Profile</h1>
        </Grid>

        <Grid
          item
          container
          direction="row"
          style={{ padding: "10px", margin: "10px" }}
          justify="center"
          alignItems="center"
        >
          <Avatar
            alt={user ? user.name : ""}
            src={user ? userServices.photoUrl(user._id) : ""}
            style={{
              width: 60,
              height: 60,
              margin: 10
            }}
          />
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            onClick={() => this.handlefollowUnfollow(user._id)}
          >
            {this.state.isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </Grid>
        <h5>{user ? user.name : ""}</h5>
        <h5>{user ? user.email : ""}</h5>

        <Divider />
        <h5>About : {user ? user.about : ""}</h5>
        <h5>Date Joined : {user ? user.created : ""}</h5>
        <Paper>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab value="posts" label="Posts" />
            <Tab value="follow" label="Following" />
            <Tab value="followr" label="Followers" />
          </Tabs>
          {this.state.value === "posts" && <Comment posts={""} user={""} />}
          {this.state.value === "follow" && <People people={following} />}
          {this.state.value === "followr" && <People people={followers} />}
        </Paper>
      </Container>
    );
  }
}

export default UserProfile;
