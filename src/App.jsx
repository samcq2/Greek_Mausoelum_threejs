import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Overview from '../Components/Overview/Overview.jsx';
import Layout from '../Components/Layout/Layout.jsx';
import Home from '../Components/Home/Home.jsx';
import About from '../Components/About/About.jsx';
import Projects from '../Components/Projects/Projects.jsx'


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
            
      </Route>
    </Routes>
  </Router>
);

export default App;
