import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Slotmachine from './component/Slotmachine';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/slotmachine' element={<Slotmachine/>}></Route>
      </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
