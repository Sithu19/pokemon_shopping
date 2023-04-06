import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import "@progress/kendo-theme-default/dist/all.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
