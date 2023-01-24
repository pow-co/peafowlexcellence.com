
import React, { useCallback, useMemo, useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
  ThreeColumnLayout,
  Loader,
  SimplePostCard,
  QuestionCard,
  Placeholder,
  Composer,
  PostCard,
  OnchainPostCard,
} from ".";
import InfiniteScroll from "react-infinite-scroll-component";
import { getLocalFeed, getLocalFeedPagination } from "../services";
import Link from "next/link";
import { useRelay } from "../context/RelayContext";
import { useAPI } from "../hooks/useAPI";

import BSocial from 'bsocial';

import { wrapRelayx } from 'stag-relayx'

import moment from "moment";
import { useTuning } from "../context/TuningContext";
import { useRouter } from "next/router";
import { useBitcoin } from "../context/BitcoinContext";

import {useDropzone} from 'react-dropzone'

import { useAuth } from '../hooks/useAuth'

import root from 'window-or-global'

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}

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


function ago(period) {
  return moment().subtract(1, period).unix() * 1000;
}

function MemeDropzone() {

  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log('file', binaryStr)

        const hex = buf2hex(binaryStr)

        console.log('file hex', hex)

        const base64 = Buffer.from(hex, 'hex').toString('base64')

        console.log('file base64', base64)

        const bsocial = new BSocial('powmemes.com');

        const post = bsocial.post();
        // and image data Url
        post.addImage(`data:image/png;base64,${base64}`);

        const ops = post.getOps('hex');

        const utf8 = post.getOps('utf8');

        console.log('file ops', ops)

        console.log('file ops utf8', utf8)

        const stag = wrapRelayx(relayone)

        root.stag = stag

        return
/*
        //@ts-ignore
        root.relayone.send({
          to: ops.join(' ')
        })
        .then(result => {
          console.log('relayx.result', result)
        })*/

        
      }
      reader.readAsArrayBuffer(file)
    })

    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    
  }, [])

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject} = useDropzone({onDrop, accept: {'image/*': []}})

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));
  
    useEffect(() => {
      // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
      return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);
  

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <section className='container'>
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />

      <img src={'/images/the-peafowl-excellence-podcast-high-resolution-color-logo.svg'} style={{width: '100%'}} />
    </div>
       <aside style={thumbsContainer}>
         {thumbs}
       </aside>
      </section>
  )
}



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

import { sendMessage } from '../utils/bsocial/message'

const Dashboard = ({ data, recent, error, loading }) => {
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

  async function handleJitsiEvent(type, event, socket) {

      //TODO: Pipe the event to websocket server

      console.log('JIITSI EVENT', {type, event, user})

      socket.emit('jitsi-event', {
          type,
          event,
          user,
          jwt: jitsiJWT,
          timestamp: new Date().toISOString(),
          roomName
      })

      if (type === "outgoingMessage") {

          console.log('OUTGOING MESSAGE', event)

          try {

              const result = await sendMessage({
                  app: 'chat.pow.co',
                  channel: 'powco-development',
                  message: event.message,
                  paymail: user?.paymail
              })

              console.log('bsocial.sendMessage.result', result)

          } catch(error) {

              console.error('bsocial.sendMessage.error', error)
          }


      }
  }

  function handleLogin() {
      login()
  }

  useEffect(() => {

      console.log('USE EFFECT', {nJitsis})

      console.log("USER?", user)

      if (authenticated) {

        console.log('JitsiMeetExternalAPI', root.JitsiMeetExternalAPI)

          // @ts-ignore
          if (!root.JitsiMeetExternalAPI) {

              setTimeout(() => {
                  setNJitsis(nJitsis + 1)
              }, 520)
              
              return
          }

          if (jitsiInitialized) {

              return
          }

          setJitsiInitialized(true)


          axios.post('https://tokenmeet.live/api/v1/jaas/auth', {
              wallet: 'relay',
              paymail: user?.paymail || paymail,
              token: relayToken
          })
          .then(({data}) => {

            console.log("JWT", data)

              const domain = "8x8.vc";

              setJitsiJWT(data.jwt)

              const options = {
                  jwt: data.jwt,                
                  roomName,
                  width: '100%',
                  height: 700,
                  parentNode: document.querySelector('#tokenmeet-video-container'),
                  lang: 'en',
                  configOverwrite: {
                      prejoinPageEnabled: false,
                      startWithAudioMuted: true,
                      startWithVideoMuted: true
                  },
              };

  
              var jitsi = new root.JitsiMeetExternalAPI(domain, options);

              root.jitsi = jitsi

              socket.on('jitsi.executeCommand', message => {

                  const { command, params } = message

                  console.log('jitsi.executeCommand', {command, params})

                  jitsi.executeCommand(command, params)

              })


              socket.on('jitsi.callFunction', async (message) => {

                  const { method, params, uid } = message

                  console.log('jitsi.callFunction', {method, params, uid})

                  const result = await jitsi[method](...params)

                  socket.emit('jitsi.callFunctionResult', {
                      uid,
                      result
                  })
                  
              })

              const handlers = events.reduce((acc, type) => {

                  acc[type] = (event) => {

                      if (event) {
                          handleJitsiEvent(type, event, socket)
                      }                    
                  }

                  return acc

              }, {})

              for (let type of events) {
                      
                      jitsi.addListener(type, handlers[type])
              }

              return function() {

                  for (let type of events) {
                          
                      jitsi.removeListener(type, handlers[type])
                  }
                          
                  jitsi.dispose()
              }
          })
          .catch(error => {

              console.log('AUTH ERROR', error)

          })
      }

      console.log('--end use effect--', {nJitsis})

  
  }, [root.JitsiMeetExternalAPI, jitsiJWT, authenticated])


  const handleChangeTab = (tag) => {
    switch (tag) {
      case "":
        router.push("/");
        break;
      //case "1F9E9":
      case "question":
        router.push("/questions");
        break;
      //case "1F4A1":
      case "answer":
        router.push("/answers");
        break;
      //case "1F48E":
      case "project":
        router.push("/projects");
        break;
      case "test":
        router.push("/test");
        break;
      default:
        console.log("unknown tag");
    }
  };

  return (
    <>
      <Script src={'https://8x8.vc/vpaas-magic-cookie-30f799d005ea4007aaa7afbf1a14cdcf/external_api.js'} />

    <ThreeColumnLayout>
      <div className="col-span-12 lg:col-span-6 min-h-screen">
      <div id="tokenmeet-video-container"></div>

        <div className="hidden lg:block mt-8">
          {/*<MemeDropzone/>*/}

        </div>
        <div className="px-4 mt-2">
          <div className="flex my-6">
            <div className="flex">
            {/*<div id="tokenmeet-video-container"></div>*/}


              {/* <div
                onClick={() => handleChangeTab("")}
                className={
                  tag === ""
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                All 🦚
              </div> */}


              {/* <div
                //onClick={() => handleChangeTab("1F48E")}
                onClick={() => handleChangeTab("project")}
                className={
                  //tag === "1F48E"
                  tag === "project"
                    ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                    : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                }
              >
                Experiments 💎
              </div> */}
              {/* <div
                  onClick={() => handleChangeTab("test")}
                  className={
                    tag === "test"
                      ? "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 font-medium mr-2 cursor-pointer rounded-md whitespace-nowrap"
                      : "text-sm leading-4 py-2 px-2 sm:px-3 text-gray-700 dark:text-gray-300 font-normal mr-2 cursor-pointer rounded-md whitespace-nowrap"
                  }
                >
                  Tests 🐛
                </div> */}
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="relative">

          <div id="tokenmeet-video-container"></div>


            {/* <InfiniteScroll
                dataLength={posts.length}
                hasMore={hasMore}
                next={fetchMore}
                loader={<Loader />}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                refreshFunction={refresh}
              >
              </InfiniteScroll> */}
            
            {!loading &&
              !error &&
              data?.map((post) => {
                if (post.txid) {
                  return <OnchainPostCard key={post.txid} post={post} />;
                } else {
                  return <SimplePostCard key={post.tx_id} post={post} />;
                }
              })}
            {loading && <Loader />}
            {!loading && recent && (
              <div className="flex py-5 items-center">
                <div className="grow border border-bottom border-gray-600 dark:border-gray-300" />
                <div className="mx-5 font-semibold text-gray-600 dark:text-gray-300 text-lg">Recent</div>
                <div className="grow border border-bottom border-gray-600 dark:border-gray-300" />
              </div>
            )}

            {recent?.map((post) => (
              <SimplePostCard key={post.tx_id} post={post} />
            ))}
            {/* {!recentLoading &&
                !recentError &&
                recent.questions.map((post) => (
                  <QuestionCard key={post.tx_id} post={post} />
                ))} */}
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
