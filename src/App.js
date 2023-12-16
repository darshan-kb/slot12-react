import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Slotmachine from './component/Slotmachine';
import Redirect from './component/Redirect';
import Login from './component/Login';
import Home from './component/Home';
import Claim from './component/Claim';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path='/slotmachine' element={<Slotmachine/>}></Route>
      <Route path="/redirect" element={<Redirect/>}></Route>
      <Route path="/authorized" element={<Redirect/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/claims" element={<Claim/>}></Route>
      </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
