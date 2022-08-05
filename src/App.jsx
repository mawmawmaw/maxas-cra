import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Landing from './layouts/Landing/Landing';
import Registering from './layouts/Registering/Registering';
import Minting from './layouts/Minting/Minting';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Registering />} />
        <Route path="mint" element={<Minting />} />
      </Routes>
    </div>
  )
}

export default App