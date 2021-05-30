import Home from "./pages/home/Home";
import UserProfile from "./pages/userProfile/UserProfile"
import { Redirect, Route, Switch } from 'react-router-dom';
import EditProfile from "./pages/editprofile/EditProfile";
import Login from "./pages/login/Login";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
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

export default App;
