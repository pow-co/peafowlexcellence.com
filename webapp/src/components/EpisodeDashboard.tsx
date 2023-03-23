
import React, { useRef, useEffect, useState } from "react";
import {
  ThreeColumnLayout,
  Loader,
} from ".";

import Link from "next/link";

import { useTuning } from "../context/TuningContext";
import { useRouter } from "next/router";
import { useBitcoin } from "../context/BitcoinContext";

import { useAuth } from '../hooks/useAuth'

import ReactPlayer from 'react-player'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

export interface Episode {
  id: number;
  date: Date;
  token_origin: string;
  title: string;
  hls_url: string;
  participants: string[];
}

const Dashboard = ({episode, loading }:{episode: Episode | any, loading: boolean}) => {

  const { authenticated, paymail, relayToken } = useBitcoin()

  const playerRef: any = useRef();

  function playVideo() {
    playerRef?.current && playerRef.current.play();
  }

  function pauseVideo() {
    playerRef && playerRef.current.pause();
  }

  function toggleControls() {
    playerRef.current.controls = !playerRef.current.controls;
  }

  useEffect(() => {

    //@ts-ignore
    window.playVideo = playVideo
    playVideo()
  }, [])

  return (
    <>

    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
      <div id="tokenmeet-video-container"></div>

        <div className="hidden lg:block mt-8">

        </div>
        <div className="px-4 mt-2">
          <div className="flex my-6">
            <div className="flex">

              {loading && <Loader />}

            </div>
          </div>
        </div>

        <div className="w-full">
            
          {!loading && episode && (

          <div className="relative">
          <h1 className='episodeTitle' style={{width: '100%', fontSize: '35px'}}>{episode.title}</h1>
          <br/>

          <br/>

          <ReactPlayer controls={true} url={episode.hls_playback_url} />
          <br/>
          <button>
            <a style={{border: '2px solid white', padding: '1em'}} className="button" href={`https://relayx.com/market/${episode.token_origin}`} rel="noreferrer" target="_blank">Buy the Ticket NFT</a>
          </button>          

          </div>
          )}
        </div>
        {authenticated && (
          <Link href="/compose">
            <div className=" lg:hidden fixed bottom-[73px] right-[14px] h-14 w-14 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </Link>
        )}
      </div>
    </ThreeColumnLayout>
    </>
  );
};

export default Dashboard;
