import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Overview from '../Components/Overview/Overview.jsx';
import Layout from '../Components/Layout/Layout.jsx';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
            
      </Route>
    </Routes>
  </Router>
);

export default App;
