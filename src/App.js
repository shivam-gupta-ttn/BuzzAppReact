import Home from "./pages/home/Home";
import UserProfile from "./pages/userProfile/UserProfile"
import { Redirect, Route, Switch } from 'react-router-dom';
import EditProfile from "./pages/editprofile/EditProfile";
import Login from "./pages/login/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import * as actions from './store/actions/index';

const App = (props) => {
  const { onFetchUser } = props;

  useEffect(() => {
    console.log(props.user)
    onFetchUser();

  }, [onFetchUser])

  return (
    <Switch>
      <ProtectedRoute path="/" component={Home} exact />
      <ProtectedRoute path="/userprofile/:id" component={UserProfile} />
      <ProtectedRoute path="/editprofile" component={EditProfile} exact />
      <Route path="/login" component={Login} exact />
      <Redirect to="/" />
    </Switch>
  );
}
const mapStateToProps = state => {
  return {
    user: state.user.user,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser: () => dispatch(actions.fetchUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
