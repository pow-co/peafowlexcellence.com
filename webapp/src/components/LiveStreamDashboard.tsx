
import React from "react";

import { useRelay } from "../context/RelayContext";

import { useBitcoin } from "../context/BitcoinContext";

import ThreeColumnLayout from '../components/ThreeColumnLayout';
import { useRouter } from 'next/router'

import Image from 'next/image'
import loader from "../loader";

import Link from 'next/link'

import ReactPlayer from 'react-player'

const token_origin = '80e777f1b5d436e68be7e28fd5a8ca851761f363d80cdc9addbde460c41a50fa_o2'

const LiveStreamDashboard = () => {

  const { tokenBalance } = useRelay();

  const { login, authenticated } = useBitcoin()

  const router = useRouter()

  return (

    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">

      <div id="tokenmeet-video-container"></div>

        <div className="w-full">
            
          <div className="relative">

          <h1 style={{width: '100%', fontSize: '40px'}}>Episode 4: 1CraigMason, 1OwenKellogg, 1BLUVNBU</h1>
          <h4 className='episodeTitle' style={{width: '100%', fontSize: '20px'}}>Thursday March 16, 2023 - 19:00 UTC</h4>

          {tokenBalance > 0 ? (
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
                  onClick={() => window.open(`https://relayx.com/market/${token_origin}`)}
  
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
