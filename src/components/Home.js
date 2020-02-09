import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeamNames } from "../api";
import TeamLogo from "./TeamLogo";

const Home = () => {
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    getTeamNames().then(res => setTeamNames(res));
  }, []);

  return (
    <div className="container">
      <h1 className="large-header">Hash History Basketball League</h1>
      <h3 className="header text-center">Select a team</h3>
      <div className="home-grid">
        {teamNames.map(team => {
          return (
            <Link key={team} to={`/${team}`}>
              <TeamLogo id={team} width="125px" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
