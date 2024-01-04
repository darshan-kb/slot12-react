import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Slotmachine from './component/Slotmachine';
import Redirect from './component/Redirect';
import Login from './component/Login';
import Home from './component/Home';
import Claim from './component/Claim';
import Recharge from './component/Recharge';
import CNavbar from './component/CNavbar';
function App() {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <BrowserRouter>
      <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path='/slotmachine' element={<Slotmachine/>}></Route>
      <Route path="/redirect" element={<Redirect/>}></Route>
      <Route path="/authorized" element={<Redirect/>}></Route>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/claims" element={<Claim/>}></Route>
      <Route path="/recharge" element={<Recharge/>}></Route>
      </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
