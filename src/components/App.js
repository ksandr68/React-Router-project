import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Players from "./Players";
import Teams from "./Teams";
import NavBar from "./Navbar";
function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/players" component={Players} />
        <Route path="/teams" component={Teams} />
      </div>
    </Router>
  );
}

export default App;
