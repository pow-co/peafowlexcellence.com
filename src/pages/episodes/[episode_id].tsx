import React, { useEffect, useState } from "react";

import EpisodeDashboard from "../../components/EpisodeDashboard";

import { useRouter } from 'next/router'


const Episode = () => {

  const { query } = useRouter()

  const { episode_id } = query

  const [loading, setLoading] = useState(true)

  const [episodes, setEpisodes] = useState<any[]>([])

  useEffect(() => {

    fetch(`https://tokenmeet.live/api/v1/shows/peafowl-excellence`)
      .then(res => res.json())
      .then(res => {

        console.log('show.episodes', res)

        setEpisodes(res.episodes)

        setLoading(false)

      })

  }, [])

  const episode: any = episodes.find(episode => episode.id === Number(episode_id))

  return (
    <EpisodeDashboard loading={loading} episode={episode}/>
  );
};

export default Episode;
