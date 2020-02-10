import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Sidebar from "./SIdebar";
import { GetTeamArticles, getTeamsArticles } from "../api";

const Articles = props => {
  const [state, setState] = useState({
    loading: true,
    teamArticles: []
  });

  useEffect(() => {
    getTeamsArticles(props.match.params.teamId).then(teamArticles => {
      setState(() => {
        setState(() => {
          return {
            loading: false,
            teamArticles: teamArticles.map(article => article.title)
          };
        });
      });
    });
  }, [
    props.match.params.teamId,
    props.match.params.teamsId,
    state.teamsArticles
  ]);

  const { loading, teamArticles } = state;

  const { params, url } = props.match;
  const { teamId } = params;

  return loading === true ? (
    <h1>Loading</h1>
  ) : (
    <div className="container two-column">
      <Sidebar
        loading={loading}
        title="Atricles"
        list={teamArticles}
        {...props}
      />
    </div>
  );
};

export default Articles;
