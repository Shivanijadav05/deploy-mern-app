import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import {Navigate,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
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
