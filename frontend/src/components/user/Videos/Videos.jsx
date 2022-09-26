import React, { useEffect, useState } from "react";
import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import axios from "axios";
import { SERVER_URL } from "../../../constants/serverUrl";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [player1, setPlayer1] = useState([]);

  const getVideos = () => {
    axios
      .get(`${SERVER_URL}/api/all-videos`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getVideos();
  }, []);

  const handleHover = (index) => {
    
   const {player} = player1[index].getState()
   
  
    player1[index].playbackRate=5
    player1[index].actions.play()
  };

  const handleMouseLeave=(index)=>{
    player1[index].load()

  }

  const handleOnclick=(index)=>{
    player1[index].playbackRate=1
    player1[index].actions.play()
  }



  return (
    <div className="container-fluid d-flex flex-direction-row flex-wrap">
      {videos.map((data, index) => {
        return (
          <div
            className="col-lg-4   col-md-6 col-sm-6 col-xs-12 p-1 "
            key={index}
            onMouseEnter={()=>{handleHover(index)}}
            onMouseLeave={()=>{handleMouseLeave(index)}}
            onClick={()=>{handleOnclick(index)}}
           
          >
            <Player
            
              width={300}
              height={200}
              fluid={false}
              ref={(player) => {
                
                player1.push(player)
              }}
            >
              <source src={data.url} />
            </Player>
          </div>
        );
      })}
    </div>
  );
}

export default Videos;
