import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import { useEffect, useState } from 'react';

function VideoDialogue(props) {
    const [player,setPlayer]=useState()
    

    
   
   
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-direction-row justify-content-center '>
      <Player
            autoPlay
            width={300}
            height={200}
            fluid={false}
            ref={(player) => {
              setPlayer(player)
             
            }}
          >
            <source src={props.url}  />
          </Player>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default VideoDialogue