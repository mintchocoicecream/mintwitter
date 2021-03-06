import React from "react";
import { HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import MyContents from "routes/Mycontents";
import Logout from "routes/Logout";

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                <>
                    <Navigation userObj={userObj} />
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/myContents">
                        <MyContents userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser}/>
                    </Route>
                    <Route exact path="/logout">
                        <Logout />
                    </Route>
                </>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    )

}

export default AppRouter;