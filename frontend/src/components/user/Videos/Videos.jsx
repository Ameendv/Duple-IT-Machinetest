import React, { useEffect, useState } from 'react'
import 'video-react/dist/video-react.css'; // import css
import { Player } from 'video-react';
import axios from 'axios'
import { SERVER_URL } from '../../../constants/serverUrl';

function Videos() {

  const [videos,setVideos]=useState([])

  const getVideos=()=>{
    axios.get(`${SERVER_URL}/api/all-videos`).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    getVideos()
  },[])
  return (
    <div className='container-fluid d-flex flex-direction-row flex-wrap'>
      <div className='col-lg-4   col-md-6 col-sm-6 col-xs-12 p-1 '>
      <Player width={300} height={200} fluid={false}>
      <source src="http://res.cloudinary.com/ameen-cloudinary/video/upload/v1664124284/nvzefaymctiddxunbqik.webm" />
    </Player>
      </div>
      
      
    </div>
  )
}

export default Videos
