#!/usr/bin/env ts-node

require('dotenv').config()

import axios from 'axios'

export async function main() {

  const input_url = process.argv[2]

  if (!input_url) {
    console.error('argv[2] must be a video url')

  }

  const { data } = await axios.post(`https://api.liveapi.com/videos`, {
    input_url
  }, {
    auth: {
      username: process.env.liveapi_access_token_id_production,
      password: process.env.liveapi_secret_key_production
    }
  })

  console.log('liveapi.videos.create.result', { result: data, input_url })

}

main()

