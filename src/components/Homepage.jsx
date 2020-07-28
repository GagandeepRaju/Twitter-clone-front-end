import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import theme from "../style/theme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Joi from "joi-browser";
import Newsfeed from "./Newfeeds";
import Comment from "./Comment";
import * as userServices from "../utilities/userServices";
import * as userPosts from "../utilities/userPosts";
import { getCurrentUser } from "../utilities/authServices";
import DefaultHomePage from "./DefaultHomePage";
// import _ from "underscore";
import { withStyles } from "@material-ui/core/styles";
import HomeLogin from "../commons/homeLogin";
import Navbar from "./Navbar";
import Drawer from "@material-ui/core/Drawer";
import twitter from "../assets/twitter.svg";

const styles = (theme) => ({
  newsContainer: {
    //
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
      flexDirection: "column",
    },
  },
  news: {
    width: "610px",
  },
  homeLogin: {
    marginLeft: "100px",
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "-80px",
      marginTop: "5em",
    },
  },
  img: {
    borderRadius: "10px 10px 0px 0px",
  },
  hometypo: {
    fontSize: "1em",
    fontWeight: "700",
    marginLeft: "10px",
  },
  logo: {
    width: "2em",
    alignSelf: "center",
  },
  drawer: {
    minWidth: "25em",
    [theme.breakpoints.down("md")]: {
      height: "100px",
      top: "auto",
      left: "0",
      right: "0",
      bottom: "0",
      flexDirection: "row",
    },
  },
  btn: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1em",
    borderRadius: "100%",
  },
  btnMenu: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "20px",
    "&:hover": {
      color: "#55acee",
    },
    "&:focus": {
      color: "#55acee",
    },
  },
  DrawerBtn: {
    fontFamily: "roboto",
    fontSize: "1.5em",
    fontWeight: "700",
    textTransform: "none",
  },
  DrawerIcon: {
    marginRight: "15px",
  },
  btnMenuLogOut: {
    marginTop: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "20px",
    "&:hover": {
      color: "#55acee",
    },
    [theme.breakpoints.down("md")]: {
      marginTop: "0",
    },
  },
  rightbarFollow: {
    marginLeft: "6.3em",
    marginBottom: "1em",
    backgroundColor: "#f5f8fa",
  },
  followTypo: {
    fontFamily: "roboto",
    fontSize: "1.5em",
    fontWeight: "500",
    marginLeft: "1em",
  },
  followBtn: {
    color: "#55acee",
    borderRadius: "20px",
    fontWeight: "bolder",
  },
  rightbarContainer: {
    position: "fixed",
    minWidth: "450px",
  },
});

class Homepage extends Component {
  state = {
    user: {},
    users: [],
    posts: [],
    errors: {},
    photoUrl: "",
  };

  schema = {
    postreply: Joi.string().label("postreply"),
  };

  updatePosts = async (posts) => {
    this.setState({ posts });
  };

  async componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });

    if (user !== null) {
      const { data: posts } = await userPosts.getPosts(user._id);
      this.updatePosts(posts);
      const { data: allusers } = await userServices.getUsers(user._id);
      const users = allusers.filter((u) => u._id !== user._id);

      this.setState({ users });
    }
  }

  handleFollow = async (userid) => {
    //
    const originalList = this.state.users;
    const newList = originalList.filter((u) => u._id !== userid);
    try {
      await userServices.addFollowing(userid, this.state.user._id);
      this.setState({ users: newList });
    } catch (ex) {
      this.setState({ users: originalList });
      console.log(ex.message);
    }
  };

  render() {
    const { ...posts } = { ...this.state.posts };
    const { users, user } = this.state;
    const photoUrl = user ? true : false;
    // const matches = useMediaQuery("(min-width:600px)");
    return (
      <React.Fragment>
        {!user && <Navbar user={user} />}
        <Grid
          container
          direction="row"
          justify={"flex-end"}
          className={this.props.classes.newsContainer}
        >
          <Grid item className={this.props.classes.news}>
            {!this.state.user ? (
              <DefaultHomePage />
            ) : (
              <React.Fragment>
                <Drawer
                  variant="permanent"
                  anchor="left"
                  classes={{ paper: this.props.classes.drawer }}
                >
                  <Button className={this.props.classes.btn}>
                    <img
                      src={twitter}
                      alt="twitter Logo"
                      className={this.props.classes.logo}
                    />
                  </Button>
                  <Button
                    className={this.props.classes.btnMenu}
                    startIcon={<HomeIcon />}
                  >
                    <Typography
                      variant="h6"
                      className={this.props.classes.DrawerBtn}
                    >
                      Home
                    </Typography>
                  </Button>
                  <Button
                    className={this.props.classes.btnMenu}
                    startIcon={<PersonIcon />}
                    component={Link}
                    to="/profile"
                  >
                    <Typography
                      variant="h6"
                      className={this.props.classes.DrawerBtn}
                    >
                      Profile
                    </Typography>
                  </Button>
                  <Button
                    className={this.props.classes.btnMenuLogOut}
                    component={Link}
                    to="/signout"
                  >
                    <Typography
                      variant="h6"
                      className={this.props.classes.DrawerBtn}
                    >
                      Log Out
                    </Typography>
                  </Button>
                </Drawer>
                <Newsfeed user={user} photo={photoUrl} />
                <Comment
                  posts={posts ? posts : null}
                  user={user ? user : null}
                  photo={photoUrl}
                />
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={4} sm={4}>
            <Grid container direction="column">
              {!this.state.user && (
                <Grid item className={this.props.classes.rightBar}>
                  <Paper className={this.props.classes.homeLogin}>
                    <img
                      src="https://placeimg.com/400/400/people"
                      alt="signin"
                      className={this.props.classes.img}
                    />
                    <Typography className={this.props.classes.hometypo}>
                      See whats happening in the world right now
                    </Typography>
                    <HomeLogin />
                  </Paper>
                </Grid>
              )}
              {this.state.user && (
                <Grid item className={this.props.classes.rightbarContainer}>
                  <Paper className={this.props.classes.rightbarFollow}>
                    <Typography className={this.props.classes.followTypo}>
                      What's happening
                    </Typography>
                    <Divider />
                  </Paper>
                  <Paper
                    elevation={3}
                    className={this.props.classes.rightbarFollow}
                  >
                    <Typography className={this.props.classes.followTypo}>
                      Who to Follow
                    </Typography>
                    <Divider />
                    <List>
                      {users.map((user) => {
                        const labelId = `checkbox-list-label-${user._id}`;

                        return (
                          <ListItem key={user._id}>
                            <ListItemAvatar>
                              <Avatar
                                alt={user.name}
                                src={userServices.photoUrl(user._id)}
                                style={{
                                  width: 60,
                                  height: 60,
                                  margin: 10,
                                }}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              id={labelId}
                              primary={user.name}
                              secondary={user.email}
                            />
                            <ListItemSecondaryAction>
                              <Button
                                fullWidth
                                className={this.props.classes.followBtn}
                                type="button"
                                variant="outlined"
                                color="secondary"
                                onClick={() => this.handleFollow(user._id)}
                              >
                                Follow
                              </Button>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Homepage);
