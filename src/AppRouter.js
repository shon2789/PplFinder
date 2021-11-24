import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { Favourites } from "pages/Favourites/Favourites";

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/favourites" component={Favourites} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
