import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import StartPage from "./component/unLoggedUser/StartPage";
import Register from "./component/unLoggedUser/Register"
import Login from "./component/unLoggedUser/Login"
import Dashboard from "./component/Dashboard"
import Parameter from "./component/Parameter"
import Meals from "./component/Meals";
import Ingredient from "./component/Ingredient";
import Shop from "./component/Shop";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./configs/firebaseConfig";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "./redux/slice/authSlice";

function App() {

  initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = useSelector((state) => state.auth.value);
  console.log("user from state", user);

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

  return (
    <div>
      {user ? (
        <Router>
          <Switch>
            <Route path="/parameters">
              <Parameter />
            </Route>
            <Route path="/meals">
              <Meals />
            </Route>
            <Route path="/ingredient">
              <Ingredient />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>

          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Register />
            </Route>
            <Route path="/">
              <StartPage />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
