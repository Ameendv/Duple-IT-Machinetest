import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "video-react/dist/video-react.css"; // import css
import { Player } from "video-react";
import { useEffect, useState } from "react";

function VideoDialogue(props) {
  const [players, setPlayers] = useState();
  const [playerState, setPlayerState] = useState("");

 

  return (
    <Modal
      url={props.url}
      show={props.show}
      
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop='static'
    >
      <Modal.Header onClick={()=>{
            props.onHide()
            const { player } = players.getState();
        console.log('user')
        
        setPlayerState(player);
        props.func(playerState);

        }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-direction-row justify-content-center ">
        <Player
          autoPlay
          width={600}
          height={400}
          fluid={false}
          ref={(player) => {
            setPlayers(player);
          }}
        >
          <source src={props.url} />
        </Player>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{
            props.onHide()
            const { player } = players.getState();
        console.log('user')
        
        setPlayerState(player);
        props.func(playerState);

        }}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default VideoDialogue;
