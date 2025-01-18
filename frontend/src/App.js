import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import { useState } from 'react';
import {Navigate,Route,Routes} from 'react-router-dom';
import RefrshHandler from './RefrshHandler';
function App() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div className="App">
    <RefrshHandler setIsAuthenticated={setIsAuthenticated} /
      <Routes>
      <Route path='/' element={<Navigate to={'/login'}/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
