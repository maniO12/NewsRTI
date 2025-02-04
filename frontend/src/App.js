import React, { useState } from 'react';
import './App.css';
import News from './Pages/News.js';
import RTI from './Pages/Rti.js';
import Report from './Pages/Report.js';
import Home from './Pages/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.js';
import SignIn from './components/Login/Signup.js';
import Display from './components/Upload/Display.js';
import VideoUpload from './components/Upload/Videoupload.js';
import WatchVideo from './components/Upload/Watch.js';
import Filing from './Rtipages/Filing.js'; 
import Info from './Rtipages/Info.js';
import Know from './Rtipages/Know.js';
import Media from './Rtipages/Media.js';
import Story from './Rtipages/Story.js';
import Uploadnews from './components/Nwesupload/Newsdisplay.js';
import FullArticle from './components/Nwesupload/Newswatch.js';
import Admin from './components/Login/Adminlogin.js';
import Collaborate from './Pages/Collaborate.js';
import Ngo from './Pages/Ngo.js';
import School from './Pages/School.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks general login state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks admin authentication

  return (
    <div className="app-container">
      <BrowserRouter>
        {/* Pass login states to Navbar */}
        <Navbar isLoggedIn={isLoggedIn} isAuthenticated={isAuthenticated} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          {/* Public routes */}
          <Route path="/news" element={<News />} />
          <Route path="/rti" element={<RTI />} />
          <Route path="/report" element={<Report />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Video-related routes */}
          <Route path="/upload" element={isAuthenticated ? <VideoUpload /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/videos" element={<Display />} />
          <Route path="/watch/:videoId" element={<WatchVideo />} />

          {/* RTI-related routes */}
          <Route path="/filing" element={<Filing />} />
          <Route path="/info" element={<Info />} />
          <Route path="/know" element={<Know />} />
          <Route path="/media" element={<Media />} />
          <Route path="/story" element={<Story />} />

          {/* News-related routes */}
          <Route path="/uploadnews" element={isAuthenticated ? <Uploadnews /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/news/:id" element={<FullArticle />} />

          {/* Admin login route */}
          <Route
            path="/adminlogin"
            element={<Admin setIsLoggedIn={setIsLoggedIn} setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route path="/ngo" element={<Ngo />} />
          <Route path="/schools" element={<School />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
  
export default App;
