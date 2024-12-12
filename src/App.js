import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import DetailPage from './components/DetailPage.jsx';
import SavedPage from './components/SavedPage.jsx';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


