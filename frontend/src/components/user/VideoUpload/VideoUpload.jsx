import React, { useState } from 'react'
import axios from 'axios'

function VideoUpload() {

    const [image,setImage]=useState()

    const uploadImage=(files)=>{
        const formData=new FormData()
        formData.append('file',image)
        formData.append('upload_preset','vid-tube')

        axios
          .post(
            "https://api.cloudinary.com/v1_1/ameen-cloudinary/video/upload",
            formData
          )
          .then((response) => {console.log(response)});
    }
  return (
    <div>
      <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
      <input type="submit" value="Upload" onClick={uploadImage} />
    </div>
  )
}

export default VideoUpload
