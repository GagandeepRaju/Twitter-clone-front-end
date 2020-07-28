import React from "react";
import { Avatar, Grid } from "@material-ui/core";
import _ from "underscore";
// import { makeStyles } from "@material-ui/core/styles";
import Form from "../commons/form";
import Joi from "joi-browser";
import * as userServices from "./../utilities/userServices";

class EditProfile extends Form {
  state = {
    user: {},
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string().label("Password"),
    about: Joi.string().label("About"),
    photo: Joi.string().label("Photo")
  };

  getUserDetails = async userid => {
    //
    try {
      let { data } = await userServices.getthisUserDetails(userid);
      this.setState({ user: data });
      this.setState({ data: _.pick(data, "name", "about", "email") });
    } catch (ex) {
      console.log(ex);
    }
  };

  componentDidMount(props) {
    const { _id } = this.props.user;
    if (_id !== undefined) {
      this.getUserDetails(_id);
    }
  }

  doSubmit = async () => {
    const frm = document.getElementById("editform");
    let fd = new FormData(frm);

    try {
      //
      const data = await userServices.editProfile(fd, this.state.user._id);
      console.log(data);
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { user } = this.state;

    return (
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        xs={12}
      >
        <h1>Edit Profile</h1>
        <div className="avatar">
          <Avatar
            alt={user ? user.name : ""}
            src={user ? userServices.photoUrl(user._id) : ""}
          />
        </div>
        <form id="editform" name="editform" onSubmit={this.handleSubmit}>
          {this.renderFileInput("photo", "Photo")}
          {this.renderInput("name", "Name")}
          {this.renderMultilineInput("about", "About")}
          {this.renderInput("email", "Email", "email", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Submit", "submit")}
        </form>
      </Grid>
    );
  }
}

export default EditProfile;
