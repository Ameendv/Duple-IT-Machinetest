import axios from 'axios'
 import { SERVER_URL } from '../constants/serverUrl'

 const API_URL='/api/user-signup'

 //signup vendor
 const signup = async(user)=>{ 
  
    const response = await axios.post(`${SERVER_URL}${API_URL}`,user)
    
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))

        
    }
    return response.data
 }


const authService={
    signup
}

export default authService