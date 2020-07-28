import React, { Component } from "react";
import { Avatar, Typography, GridListTile, GridList } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as userServices from "../utilities/userServices";

class People extends Component {
  state = {
    people: [],
    baseUrl: process.env.REACT_APP_API_URL + "/"
  };

  componentDidMount(props) {
    const { people } = this.props;
    const People = Object.values(people);
    if (People) {
      this.setState({ people: People });
    }
  }

  render() {
    const { people } = this.state;
    return (
      <GridList>
        {people.map(user => {
          const labelId = user ? `checkbox-list-label-${user._id}` : "";

          return (
            <GridListTile style={{ height: 120 }} key={labelId}>
              <Link to={`/userprofile/${user._id}`}>
                <Avatar src={user ? userServices.photoUrl(user._id) : ""} />
                <Typography>{user.name}</Typography>
              </Link>
            </GridListTile>
          );
        })}
      </GridList>
    );
  }
}

export default People;
