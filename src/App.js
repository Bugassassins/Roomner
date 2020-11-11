import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import "./App.css";
import protectedRoutes from './protectedRoutes'
import ProtectedRouteHoc from './components/ProtectedRoutesHoc'

export const AuthContext = React.createContext(null);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNewUser,setNewUser]=useState(false);
  const [User,setUser]=useState('');
  function readSession() {
    const user = window.sessionStorage.getItem(
			`firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
    );
    if (user) setLoggedIn(true)
  }
  useEffect(() => {
    readSession()
  }, [])
  function logout(){
    window.sessionStorage.removeItem(
      `firebase:authUser:${process.env.REACT_APP_FIREBASE_API_KEY}:[DEFAULT]`
    );
    setLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn,isNewUser,setNewUser,User,setUser}}>
      <div className="App">
        <Router>
      <Switch>
            <Route
                key="/"
                path="/"
                exact={true}
                render={(props) => <Homepage {...props}  />}
              />
            {protectedRoutes.map(route => (
              <ProtectedRouteHoc
                key={route.path}
                isLoggedIn={isLoggedIn}
                logoutFunc={logout}
                path={route.path}
                component={route.main}
                exact={route.exact}
                public={route.public}
              />
            ))}
          </Switch>
          {isLoggedIn?<Redirect to={{ pathname: '/user' }} />:null}
        </Router>
      </div>
    </AuthContext.Provider>
  );
}
export default App;
