import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Stations from './pages/Stations'
import Profile from './pages/Profile' 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </Router>
  )
}

export default App
