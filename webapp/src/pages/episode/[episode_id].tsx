import React, { useEffect, useState } from "react";
import VideoDashboard from "../../components/VideoDashboard";
import EpisodeDashboard from "../../components/EpisodeDashboard";

import { useAPI } from "../../hooks/useAPI";
import { useTuning } from "../../context/TuningContext";
import { useRouter } from 'next/router'
import { useAuth } from "src/hooks/useAuth";
import { useTokenMeetLiveWebsocket } from "src/hooks/useWebsocket";

import root from 'window-or-global'

import { Socket } from 'socket.io-client'
import { sendMessage } from "src/utils/bsocial/message";
import axios from "axios";


const Index = () => {

  const { query } = useRouter()
  const { startTimestamp } = useTuning();
  let {
    data,
    error,
    refresh,
    loading: questions_loading,
  } = useAPI(`/questions?start_timestamp=${startTimestamp}`);
  let { data: recent, loading: recent_loading } = useAPI(
    "/recent/questions?limit=100"
  );

  let questions = data?.questions;
  let boosted_tx = questions?.map((q: any) => q.tx_id);
  let recent_questions = recent?.questions;
  recent_questions = recent_questions?.filter(
    (q: any) => !boosted_tx?.includes(q.tx_id)
  );

  console.log("router", { query })

  useEffect(() => {

    if (root !== undefined) {
      const hasteClient = root.haste.HasteClient.build()

      const details = hasteClient.getTokenDetails();
  
      console.log({details})
    }



    //@ts-ignore
  }, )


  return (
    <EpisodeDashboard
      data={questions}
      recent={recent_questions}
      error={error}
      loading={questions_loading || recent_loading}
    />
  );
};

export default Index;
