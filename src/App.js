import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import DetailPage from './components/DetailPage';
import SavedPage from './components/SavedPage';
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

//Routes: Defines paths (/, /detail/:id, and /saved) and their corresponding components.
// Router: Ensures navigation between components without reloading the page.


