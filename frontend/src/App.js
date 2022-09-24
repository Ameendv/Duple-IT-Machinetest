
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/user/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
