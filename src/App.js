import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import EditProfile from "./components/EditProfile";
import NotFound from "./components/NotFound";
import SignOut from "./components/SignOut";

import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./utilities/authServices";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./utilities/privateRoute";
import UserProfile from "./components/UserProfile";

//Material-UI imports
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./style/theme";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  container: {
    padding: "0",
    margin: "0",
    maxWidth: "1500px",
  },
};

class App extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Container className={this.props.classes.container}>
            <ToastContainer />
            <Switch>
              <Route exact path="/homepage" component={Homepage} user={user} />
              <Route
                path="/profile"
                component={() => <Profile user={user} />}
              />
              <Route path="/userprofile/:userid" component={UserProfile} />
              <Route
                path="/signup"
                component={() => <SignUp modalView={true} />}
              />
              <Route path="/signin" component={SignIn} />
              <Route path="/signout" component={SignOut} />
              <PrivateRoute
                path="/editprofile"
                component={() => <EditProfile user={user} />}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/homepage" />
              <Redirect to="/not-found" />
            </Switch>
          </Container>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
