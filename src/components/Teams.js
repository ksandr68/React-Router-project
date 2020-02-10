import React, { useState, useEffect } from "react";
import { getTeamNames } from "../api";
import Sidebar from "./SIdebar";
import { Route, Link } from "react-router-dom";
import TeamLogo from "./TeamLogo";
import Team from "./Team";
import Loading from "./Loading";

const Teams = props => {
  const [state, setState] = useState({ teamNames: [], loading: true });
  useEffect(() => {
    getTeamNames().then(teamNames => {
      setState(() => {
        return { loading: false, teamNames };
      });
    });
  }, [setState]);

  const { loading, teamNames } = state;
  const { location, match } = props;
  console.log(teamNames);

  return (
    <div className="container two-column">
      <Sidebar loading={loading} title="Teams" list={teamNames} {...props} />
      {loading === false && location.pathname === "/teams" ? (
        <div className="sidebar-instruction">Select a team</div>
      ) : null}

      <Route
        path={`${match.url}/:teamId`}
        render={({ match }) => (
          <div className="panel">
            <Team id={match.params.teamId}>
              {team =>
                team === null ? (
                  <Loading />
                ) : (
                  <div style={{ width: "100%" }}>
                    <TeamLogo id={team.id} className="center" />
                    <h1 className="medium-header">{team.name}</h1>
                    <ul className="info-list row">
                      <li>
                        Established<div>{team.established}</div>
                      </li>
                      <li>
                        Manager<div>{team.manager}</div>
                      </li>
                      <li>
                        Coach<div>{team.coach}</div>
                      </li>
                    </ul>
                    <Link
                      className="center btn-main"
                      to={`/${match.params.teamId}`}
                    >
                      {team.name} Team Page
                    </Link>
                  </div>
                )
              }
            </Team>
          </div>
        )}
      />
    </div>
  );
};

export default Teams;
