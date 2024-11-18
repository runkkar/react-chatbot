import React, { useState } from 'react';
import './App.css';
import './tailwind.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage: Message = { text: userInput, sender: 'user' };
    const botMessage: Message = { text: "To je zajímavé! Jak vám mohu ještě pomoci?", sender: 'bot' };

    setMessages([...messages, userMessage, botMessage]);
    setUserInput('');
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-black w-[500px] h-[600px] flex flex-col p-4 rounded-lg shadow-lg overflow-hidden">
        <div className="flex-grow overflow-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${message.sender === 'user' ? 'self-end bg-blue-600 text-white' : 'self-start bg-gray-800 text-white'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-700 rounded-l-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Napiš zprávu..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
            onClick={sendMessage}
          >
            Odeslat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
