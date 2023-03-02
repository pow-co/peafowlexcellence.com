import React from "react";

import EpisodeDashboard from "../../components/EpisodeDashboard";

import { useRouter } from 'next/router'

const Episode = () => {

  const { query } = useRouter()

  const { episode_id } = query

  return (
    <EpisodeDashboard episode_id={episode_id}/>
  );
};

export default Episode;
