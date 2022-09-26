import React, { useEffect, useState } from "react";
import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import axios from "axios";
import { SERVER_URL } from "../../../constants/serverUrl";
import {toast} from 'react-toastify'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Modal from "../VideoDialogue/VideoDialogue";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [player1, setPlayer1] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [url, setUrl] = useState();
  const [id,setId] = useState()

  const getVideos = () => {
    axios
      .get(`${SERVER_URL}/api/get-trending-videos`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong')
      });
  };
  useEffect(() => {
    getVideos();
  },[]);

  const handleHover = (index) => {
    const { player } = player1[index].getState();

    player1[index].playbackRate = 5;
    player1[index].volume = 0;
    player1[index].actions.play();
  };

  const handleMouseLeave = (index) => {
    player1[index].load();
  };

  const handleOnclick = (index, url,id) => {

    player1[index].playbackRate = 1;
    player1[index].volume = 5;
    player1[index].actions.play();
    setUrl(url);
    setId(id)
    setModalShow(true);
  };

  const videosDatas=(datas)=>{
    if(datas.played){
      const played= datas.played.length
      const viewedTime=datas.currentTime
      const details={
        viewers:played,
        id:id,
        viewedTime:viewedTime


      }
      console.log(details)
      axios.put(`${SERVER_URL}/api/update-viewers`,details).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })
    }
    
  }

  

  return (
    <div className="container-fluid d-flex flex-direction-row flex-wrap justify-content-center">
      <Modal url={url} func={videosDatas} show={modalShow} onHide={() => setModalShow(false)} />

      {videos.map((data, index) => {
        return (
          <div
            className='m-1'
            key={index}
           
          ><Card style={{ width: '19rem' }} bg='dark'>
         
          <Card.Body  bg='dark' >
            
            <Card.Text className='p-1' onMouseEnter={() => {
              handleHover(index);
            }}
            onMouseLeave={() => {
              handleMouseLeave(index);
            }}
            onClick={() => {
              handleOnclick(index, data.url,data._id);
            }}>
            <Player
              width={250}
              height={200}
              fluid={false}
              ref={(player) => {
                player1.push(player);
              }}
            >
              <source src={data.url} />
            </Player> 
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Uploaded : {data.uploadedUser[0].name}</ListGroup.Item>
            <ListGroup.Item>Total views : {data.totalView}</ListGroup.Item>
              
          </ListGroup>
         
        </Card>
            
           
          </div>
        );
      })}
    </div>
  );
}

export default Videos;
