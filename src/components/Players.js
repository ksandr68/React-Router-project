import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import Sidebar from "./SIdebar";
import { getPlayers } from "../api";
import { parse } from "query-string";
import slug from "slug";

const Players = props => {
  const [state, setState] = useState({
    players: [],
    loading: true
  });
  useEffect(() => {
    const { location } = props;
    location.search
      ? fetchPlayers(parse(location.search).teamId)
      : fetchPlayers();
  }, [props]);
  const fetchPlayers = teamId => {
    getPlayers(teamId).then(players =>
      setState(() => ({
        loading: false,
        players
      }))
    );
  };
  const { players, loading } = state;
  const { match, location } = props;
  console.log(match);
  return (
    <div className="container two-column">
      <Sidebar
        loading={loading}
        title="Players"
        list={players.map(player => player.name)}
        {...props}
      />

      {loading === false && location.pathname === "/players" ? (
        <div className="sidebar-instruction">Select a Player</div>
      ) : null}

      <Route
        path={`${match.url}/:playerId`}
        render={({ match }) => {
          if (loading === true) {
            return null;
          }
          const {
            name,
            position,
            teamId,
            number,
            avatar,
            apg,
            ppg,
            rpg,
            spg
          } = players.find(
            player => slug(player.name) === match.params.playerId
          );
          return (
            <div className="panel">
              <div className="panel">
                <img
                  className="avatar"
                  src={`${avatar}`}
                  alt={`${name}'s avatar`}
                />
                <h1 className="medium-header">{name}</h1>
                <h3 className="header">#{number}</h3>
                <div className="row">
                  <ul className="info-list" style={{ marginRight: 80 }}>
                    <li>
                      Team
                      <div>
                        <Link style={{ color: "#68809a" }} to={`/${teamId}`}>
                          {teamId[0].toUpperCase() + teamId.slice(1)}
                        </Link>
                      </div>
                    </li>
                    <li>
                      Position<div>{position}</div>
                    </li>
                    <li>
                      PPG<div>{ppg}</div>
                    </li>
                  </ul>
                  <ul className="info-list">
                    <li>
                      APG<div>{apg}</div>
                    </li>
                    <li>
                      SPG<div>{spg}</div>
                    </li>
                    <li>
                      RPG<div>{rpg}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Players;
