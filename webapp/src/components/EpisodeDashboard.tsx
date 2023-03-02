
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

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};



//import { JitsiMeeting } from '@jitsi/react-sdk';
import Script from 'next/script';

//import BlankLayout from 'src/@core/layouts/BlankLayout'
import axios from 'axios'

import { useTokenMeetLiveWebsocket } from '../hooks/useWebsocket';
//import { Socket } from 'socket.io-client/build/esm/socket';



const MINIMUM_POWCO_BALANCE = 218

const events = [
    'cameraError',
    'avatarChanged',
    'audioAvailabilityChanged',
    'audioMuteStatusChanged',
    'breakoutRoomsUpdated',
    'browserSupport',
    'contentSharingParticipantsChanged',
    'dataChannelOpened',
    'endpointTextMessageReceived',
    'faceLandmarkDetected',
    'errorOccurred',
    'knockingParticipant',
    'largeVideoChanged',
    'log',
    'micError',
    'screenSharingStatusChanged',
    'dominantSpeakerChanged',
    'raiseHandUpdated',
    'tileViewChanged',
    'chatUpdated',
    'incomingMessage',
    'mouseEnter',
    'mouseLeave',
    'mouseMove',
    'toolbarButtonClicked',
    'outgoingMessage',
    'displayNameChange',
    'deviceListChanged',
    'emailChange',
    'feedbackSubmitted',
    'filmstripDisplayChanged',
    'moderationStatusChanged',
    'moderationParticipantApproved',
    'moderationParticipantRejected',
    'participantJoined',
    'participantKickedOut',
    'participantLeft',
    'participantRoleChanged',
    'participantsPaneToggled',
    'passwordRequired',
    'videoConferenceJoined',
    'videoConferenceLeft',
    'videoAvailabilityChanged',
    'videoMuteStatusChanged',
    'videoQualityChanged',
    'readyToClose',
    'recordingLinkAvailable',
    'recordingStatusChanged',
    'subjectChange',
    'suspendDetected',
    'peerConnectionFailure'
]

const Dashboard = ({ data, recent, error, loading }: any) => {
  const router = useRouter();
  const { startTimestamp, tag, setTag } = useTuning();
  console.log(data,recent)

  const { login } = useAuth()

  const { authenticated, setWallet, authenticate, paymail, avatar, relayToken } = useBitcoin()

  const { user, powcoBalance } = useAuth()

  const [jitsiInitialized, setJitsiInitialized] = useState()

  const [nJitsis, setNJitsis] = useState(1)

  const { isConnected, socket } = useTokenMeetLiveWebsocket()

  const [jitsiJWT, setJitsiJWT] = useState()

  const roomName = 'vpaas-magic-cookie-30f799d005ea4007aaa7afbf1a14cdcf/peafowl-excellence-podcast'

  console.log({ relayToken, paymail })

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

            </div>
          </div>
        </div>

        <div className="w-full">
            

          <div className="relative">
          <h1 className='episodeTitle' style={{width: '100%', fontSize: '35px'}}>Episode 1 - Thursday Feb 16, 2023</h1>
          <br/>

          <p>Craig Mason, Daniel Krawisz, Owen Kellogg</p>
          <br/>

          <ReactPlayer controls={true} url='https://video.liveapi.com/63d46a33f1a83789fcb550b3/vdb88a6be0ae4111ed8a35.mp4/index.m3u8' />
          <br/>
          <button>
            <a style={{border: '2px solid white', padding: '1em'}} className="button" href="https://relayx.com/market/215ec0900ebc4ec65b52641e78a016b8c8957e6abe3c8b21e8e1284ce0278270_o2" rel="noreferrer" target="_blank">Buy the Ticket NFT</a>
            </button>
          <div id="tokenmeet-video-container">
        
          </div>
            
            {loading && <Loader />}
            {!loading && recent && (
              <div className="flex py-5 items-center">
                <div className="grow border border-bottom border-gray-600 dark:border-gray-300" />
                <div className="mx-5 font-semibold text-gray-600 dark:text-gray-300 text-lg">Recent</div>
                <div className="grow border border-bottom border-gray-600 dark:border-gray-300" />
              </div>
            )}

          </div>
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
