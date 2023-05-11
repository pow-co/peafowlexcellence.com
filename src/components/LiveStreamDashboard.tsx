
import React from "react";

import { useRelay } from "../context/RelayContext";

import { useState, useEffect } from 'react'

import { useBitcoin } from "../context/BitcoinContext";

import ThreeColumnLayout from '../components/ThreeColumnLayout';
import { useRouter } from 'next/router'

import Image from 'next/image'
import loader from "../loader";

import Link from 'next/link'

import ReactPlayer from 'react-player'
import { Episode } from "./EpisodeDashboard";
import moment from "moment-timezone";

interface LiveStreamDashboardProps {
  episode: Episode;
}

import axios from 'axios'

const LiveStreamDashboard = ({episode}: LiveStreamDashboardProps) => {

  const [tokenBalance, setTokenBalance] = useState(0);

  const [authRequired, setAuthRequired] = useState<Boolean>(!!episode.token_origin);

  const { relayPaymail } = useRelay();

  useEffect(() => {

      if (!relayPaymail) { return }

      axios.get(
        `https://staging-backend.relayx.com/api/token/${episode.token_origin}/owners`
      )
      .then(({data}) => {

	      console.log('checked token balance', data)

	      const [owner] = data.data.owners.filter((owner: {paymail:string,amount:number}) => {
						return owner.paymail === relayPaymail;
	      });

	      if (relayPaymail && owner?.amount) {
						setTokenBalance(owner?.amount);
	      } else {
						setTokenBalance(0);
	      }
		})

  }, [relayPaymail]);

  console.log('livestream episode', episode)

  const { login, authenticated } = useBitcoin()

  const router = useRouter()

  const date = moment(episode.date).tz('GMT').format('MMMM Do YYYY, H:mm')

  return (

    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">

      <div id="tokenmeet-video-container"></div>

        <div className="w-full">
            
          <div className="relative">

          <h1 style={{width: '100%', fontSize: '20px'}}>{episode.title}</h1>
          <h4 className='episodeTitle' style={{width: '100%', fontSize: '12px'}}>{`${date} UTC`}</h4>

          {!authRequired || tokenBalance > 0 ? (
            <div>
              <ReactPlayer controls={true}  url={"https://live.liveapi.com/63d46a33f1a83789fcb550b3/lv_b873fbf0c3b111ed83fe6d97d5111853/index.m3u8"} />
              <Link target="_blank" href={`https://pow.co/live/peafowl-excellence`}><h1 style={{fontSize: '200%',fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer'}} >Click Here for Live Chat & Video</h1></Link>
              </div>
          ): ( 
            <div className="mt-8 flex flex-col justify-center text-center">
            <Image loader={loader} src={'/images/peafowl-excellence-podcast-logo.png'} width={'100%'} height={'500px'} quality={100} />
            <p className="text-xl opacity-70 p-5 ">
              The Live Stream Is Exclusively For Ticket Holders
            </p>
            <div className="flex flex-col mx-auto justify-center">
              {authenticated ? (
                <button
                  onClick={() => window.open(`https://relayx.com/market/${episode.token_origin}`)}
  
                    //onClick={() => router.push("/market")}
                  className="mt-2 text-white bg-gradient-to-tr from-blue-500 to-blue-600 leading-6 py-1 px-4 font-bold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1"
                >
                  Buy Your Ticket Now!
                </button>
                ) : (
                  <button
                  onClick={login}
  
                    //onClick={() => router.push("/market")}
                  className="mt-2 text-white bg-gradient-to-tr from-blue-500 to-blue-600 leading-6 py-1 px-4 font-bold border-none rounded cursor-pointer flex items-center text-center justify-center disabled:opacity-50 transition duration-500 transform hover:-translate-y-1"
                >
                  Connect Your Wallet
                </button>
                )}

            </div>
          </div>
          )}

          </div>
        </div>

      </div>
    </ThreeColumnLayout>
  );
};

export default LiveStreamDashboard;
