import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
function App() {
  const [names,setName]=useState("Cook")
  return (
    <div>
      <Navbar />
    </div>
  );
}

export default App;
