import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";


//page importing
import Main from "./pages/Main.js";
import Help from "./pages/Help.js";
import Room from "./pages/Room.js";
import Informaiton from './pages/Information.js';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/pages/Help" element={<Help/>}/>
          <Route path="/pages/Room" element={<Room/>}/>
          <Route path="/pages/Informaiton" element={<Informaiton/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
