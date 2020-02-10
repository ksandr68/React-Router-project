import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import Players from "./Players";
import Teams from "./Teams";
import NavBar from "./Navbar";
import TeamPage from "./TeamPage";
function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/players" component={Players} />
          <Route path="/teams" component={Teams} />
          <Route path="/:teamId" exact component={TeamPage} />
          <Route render={() => <h1 className="text-center">404 Error</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
