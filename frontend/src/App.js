
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/user/Home';
import AddVideo from './pages/user/AddVideo';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/add-video' element={<AddVideo />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
