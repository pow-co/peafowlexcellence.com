import EpisodeDashboard from "src/components/EpisodeDashboard";
import LiveStreamDashboard from "../components/LiveStreamDashboard";
import { useEffect, useState } from "react";

const Index = () => {

  const [showUpcomingLivestream, setShowUpcomingLivestream] = useState(false)

  const [episodes, setEpisodes] = useState<any[]>([])
  const [episode, setEpisode] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetch(`https://tokenmeet.live/api/v1/shows/peafowl-excellence`)
      .then(res => res.json())
      .then(res => {

        console.log('show.episodes', res)

        const episodes = res.episodes.sort((a: any, b: any) => b.id - a.id)    

        setEpisodes(episodes)
      
        setEpisode(episodes[0])

        setLoading(false)

        if (episodes[0].hls_playback_url) {

          setShowUpcomingLivestream(false)

        } else {
            
            setShowUpcomingLivestream(true)
        }

      })

  }, [])

  if (showUpcomingLivestream) {

    return (
      <>
        <LiveStreamDashboard />
      </>
    );
  } else {

    if (episode) {

      console.log('Episode', episode)

      return <EpisodeDashboard episode={episode} loading={loading} />

    } else {

      return <p>Loading...</p>

    }
  
  }

};

export default Index;
