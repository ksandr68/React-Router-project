import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { getTeamsArticles, getTeamNames } from "../api";
import Team from "./Team";
import slug from "slug";
import TeamLogo from "./TeamLogo";
import Loading from "./Loading";

const TeamPage = props => {
  const [state, setState] = useState({
    loading: true,
    articles: [],
    teamNames: {}
  });

  useEffect(() => {
    Promise.all([
      getTeamNames(),
      getTeamsArticles(props.match.params.teamId)
    ]).then(([teamNames, articles]) => {
      setState(() => ({
        teamNames,
        articles,
        loading: false
      }));
    });
  }, [props.match.params.teamId]);

  const { loading, articles, teamNames } = state;
  const { match } = props;
  const { teamId } = match.params;

  if (loading === false && teamNames.includes(teamId) === false) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Team id={teamId}>
        {team =>
          team === null ? (
            <Loading />
          ) : (
            <div className="panel">
              <TeamLogo id={teamId} />
              <h1 className="medium-header">{team.name}</h1>
              <h4 style={{ margin: 5 }}>
                <Link
                  style={{ cursor: "pointer" }}
                  to={{ pathname: "/players", search: `?teamId=${teamId}` }}
                >
                  View Roster
                </Link>
              </h4>
              <h4>Championships</h4>
              <ul className="championships">
                {team.championships.map(ship => (
                  <li key={ship}>{ship}</li>
                ))}
              </ul>
              <ul className="info-list row" style={{ width: "100%" }}>
                <li>
                  Established<div>{team.established}</div>
                </li>
                <li>
                  Manager<div>{team.manager}</div>
                </li>
                <li>
                  Coach<div>{team.coach}</div>
                </li>
                <li>
                  Record
                  <div>
                    {team.wins}-{team.losses}
                  </div>
                </li>
              </ul>
              <h2 className="header">Articles</h2>
              <ul className="articles">
                {articles.map(article => (
                  <li key={article.id}>
                    <Link to={`${match.url}/articles/${slug(article.title)}`}>
                      <h4 className="article-title">{article.title}</h4>
                      <div className="article-date">
                        {article.date.toLocaleDateString()}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      </Team>
    </div>
  );
};

export default TeamPage;
