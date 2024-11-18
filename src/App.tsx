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
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const apiKey = 'xai-WgVDiQVEGP2EWGix4pohFD4pXVBNjDo4WtZyU5PG3CNrE5X8w8wEKCGwydNih5y5fuZ0s2wPBbM15khH';

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = { text: userInput, sender: 'user' };
    setMessages([...messages, userMessage]);
    setUserInput('');
    setIsLoading(true);

  
    try {
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a test assistant.' },
            ...messages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
            { role: 'user', content: userInput },
          ],
          model: 'grok-beta',
          stream: false,
          temperature: 0,
        }),
      });

      const data = await response.json();
      const botMessage: Message = {
        text: data.choices[0].message.content,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error while fetching from API:', error);
    } finally {
      setIsLoading(false);
    }
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
          {isLoading && (
            <div className="p-3 rounded-lg max-w-[80%] self-start bg-gray-800 text-white">
              Bot is typing...
            </div>
          )}
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
