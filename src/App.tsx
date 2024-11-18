import React from 'react';
import './App.css';
import './tailwind.css';

function App() {
  return (
    <div className="text-center">
      <header className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
        <img 
          src="logo.svg" 
          className="h-[40vmin] pointer-events-none animate-spin-slow" 
          alt="logo" 
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a 
          className="text-sky-400" 
          href="https://reactjs.org" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
