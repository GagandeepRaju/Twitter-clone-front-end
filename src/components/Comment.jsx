import React from "react";
import {
  Grid,
  Paper,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  GridList,
  Typography,
  TextField,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Form from "../commons/form";
import Joi from "joi-browser";
import * as userPosts from "../utilities/userPosts";
import * as userServices from "../utilities/userServices";
import { withStyles } from "@material-ui/core/styles";

// import Snackbar from "@material-ui/core/Snackbar";
// import MuiAlert from "@material-ui/lab/Alert";
import { getCurrentUser } from "../utilities/authServices";

const style = (theme) => ({
  //
  bottom: {
    marginBottom: "2em",
    height: "5em",
  },
});

class Comment extends Form {
  state = {
    user: {},
    posts: [],
    comment: [],
    liked: false,
    postreply: "",
    errors: {},
  };

  schema = {
    postreply: Joi.string().label("postreply"),
  };

  updateState = (user, photo) => {
    this.setState({ user, photo });
  };

  componentDidMount() {
    const user = getCurrentUser();
    const { photo } = this.props;
    this.updateState(user, photo);
  }

  handleComment = ({ currentTarget: input }) => {
    const comment = { ...this.state.comment };
    comment[`postId`] = input.id;
    comment[`text`] = input.value;
    this.setState({ comment });
  };

  handleKeyDown = async (e) => {
    //
    if (e.keyCode === 13) {
      const { comment } = this.state;
      try {
        //
        const { data } = await userPosts.addComment(comment);
        console.log(data);
      } catch (ex) {
        //
        console.log(ex);
      }
    }
  };

  handleFavClick = async (post, userid) => {
    const Post = Object.values(post);
    const action = Post[0].find((user) => user === userid);
    try {
      if (action) {
        const { data } = await userPosts.removeLike(post._id);
        this.setState({ liked: false });
        console.log(data);
      } else {
        const { data } = await userPosts.addLike(post._id);
        this.setState({ liked: true });
        console.log(data);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  handlePostDelete = async (postid) => {
    try {
      const { data } = await userPosts.deletePost(postid);
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  handleCommentDelete = async (commentId, postId) => {
    try {
      //
      const { data } = await userPosts.deleteComment(commentId, postId);
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { posts } = this.props;
    const Posts = Object.values(posts);
    const { user } = this.state;
    const { photo } = this.state;
    return (
      <Grid>
        {Posts.map((post) => (
          <Paper elevation={3} key={post._id}>
            <GridList
              key={post.postedBy._id}
              cellHeight={"auto"}
              style={{ margin: "10px" }}
            >
              <Grid
                id={post.postedBy._id}
                item
                xs={12}
                sm={12}
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar
                    alt={post.postedBy.name}
                    src={photo ? userServices.photoUrl(post.postedBy._id) : ""}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={post.postedBy._id}
                  primary={post.postedBy.name}
                  secondary={post.created}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => this.handlePostDelete(post._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </GridList>
            <Divider />
            <Grid
              id={post._id}
              item
              xs={12}
              sm={12}
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              style={{ margin: "30px 50px" }}
            >
              <Typography display={"block"}>{post.text}</Typography>
            </Grid>
            <Grid
              id={post._id}
              item
              xs={12}
              sm={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
              style={{ margin: "30px 0px" }}
            >
              <IconButton onClick={() => this.handleFavClick(post, user._id)}>
                {this.state.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography display={"inline"} style={{ margin: "10px" }}>
                {post.likes.length}
              </Typography>
              <IconButton disabled>
                <CommentIcon />
              </IconButton>
              <Typography display={"inline"} style={{ margin: "10px" }}>
                {post.comments.length}
              </Typography>
            </Grid>
            <Grid
              id={post._id}
              item
              xs={12}
              sm={12}
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              style={{ margin: "30px 0px", padding: "20px 0px" }}
            >
              <Grid container spacing={5} justify="center" alignItems="center">
                <Grid item xs={12} sm={10}>
                  <TextField
                    onChange={this.handleComment}
                    error={false}
                    fullWidth
                    color="secondary"
                    id={post._id}
                    onKeyDown={this.handleKeyDown}
                    label={"What do you think..."}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            {post.comments.map((c) => (
              <GridList
                key={c._id}
                cellHeight={"auto"}
                style={{ margin: "10px" }}
              >
                <Grid
                  id={c._id}
                  item
                  xs={4}
                  sm={4}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={c.postedBy.name}
                      src={photo ? userServices.photoUrl(c.postedBy._id) : ""}
                    />
                  </ListItemAvatar>
                  <ListItemText id={c.postedBy._id} primary={c.postedBy.name} />
                </Grid>
                <Grid
                  id={c._id}
                  item
                  xs={12}
                  sm={12}
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Typography id={c._id} display={"block"}>
                    {c.text}
                  </Typography>
                  <IconButton
                    aria-label="delete"
                    onClick={() => this.handleCommentDelete(c._id, post._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </GridList>
            ))}
          </Paper>
        ))}
        <div className={this.props.classes.bottom}></div>
      </Grid>
    );
  }
}

export default withStyles(style)(Comment);
