import axios from 'axios'
 import { SERVER_URL } from '../constants/serverUrl'

 const API_URL='/api/user-login'

 //signup vendor
 const login = async(user)=>{ 
  
    const response = await axios.post(`${SERVER_URL}${API_URL}`,user)
    console.log(response)
    
    // if(response.status){
    //     localStorage.setItem('user',JSON.stringify(response.data))

        
    // }
    // return response.data
 }


const authService={
    login
}

export default authService