import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import GenKey from "./components/GenKey";
// import Background from "./components/background";
import './App.css';

const App = () => {
  return (
    <div className="h-100">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Navbar />
      <Chat />

    </div>
  );
};

export default App;
