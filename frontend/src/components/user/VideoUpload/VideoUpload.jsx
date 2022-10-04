import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import { SERVER_URL } from "../../../constants/serverUrl";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function VideoUpload() {
  const [image, setImage] = useState();

 const checkMimeType=(event)=>{
  console.log(image)
    //getting file object
    let files = image 
    //define message container
    let err = ''
    // list allow mime type
   const types = ['video/x-ms-wmv', 'video/mp4', 'video/x-flv','video/webm']
    // loop access array
   
     // compare file type find doesn't matach
         if (types.every(type => files.type !== type)) {
         // create error message and assign to container   
         err += files.type+' is not a supported format\n';
       }
   
  
   if (err !== '') { // if message not same old that mean has error 
    console.log(event)
        // event.target.value = null // discard selected file
        toast.error(err)
         return false; 
    }
   return true;
  
  }

  const uploadVideo = (files) => {


    
    const formData = new FormData();
    formData.append("file", image);
  
    var token = JSON.parse(localStorage.getItem("token"));
    
    const decodedToken=parseJwt(token)
    
    if(!decodedToken ||  decodedToken.exp > Date.now()){
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return toast.warning('Token expired Login again.')
    }

   
     
          
         
          const config = { headers: { token: token } };
          axios
            .post(`${SERVER_URL}/api/upload-video`, formData, config)
            .then((response) => {
              toast.success(response.data)
            })
            .catch((error) => {
              toast.error(error.data)
            });
        
     
  };
  return (
    <div
      style={{
        backgroundColor: "#303030",
        height: "600px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "800px" }}>
        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label style={{ color: "#fff" }}>
            Upload your video here
          </Form.Label>
          <Form.Control
            type="file"
            size="lg"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </Form.Group>
        <input
          type="button"
          className="btn"
          style={{
            backgroundColor: "#E50914",
            fontWeight: "bolder",
            fontSize: "15px",
            color: "#fff",
          }}
          value="Submit"
          onClick={() => {
            if (checkMimeType()) {
              uploadVideo();
            }
          }}
        />
      </div>
    </div>
  );
}

export default VideoUpload;
