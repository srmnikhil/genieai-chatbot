import "./App.css";
import React, { useState } from "react";
import Chatbox from "./Components/Chatbox";
import About from "./Components/About";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Fetch the response from Gemini API
  async function fetchResponse(prompt) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text(); // Returning the text response
    } catch (error) {
      console.error("Error fetching data:", error);
      return "Sorry, I couldn't answer right now. Please try again or contact developer at srmnikhilswn@gmail.com";
    }
  }

  // Handle sending the message
  const handleSendMessage = async (message) => {
    if (!message.trim()) return; // Ignore empty messages

    // Add the user's message to chat history
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: message },
      { sender: "gemini", text: "Typing..." }, // Add "Typing..." message
    ]);

    // Clear the input box instantly
    setInputValue("");

    // Fetch the Gemini response
    const response = await fetchResponse(message);

    // Replace "Typing..." with the actual response
    setChatHistory((prev) =>
      prev.map((msg, index, array) =>
        index === array.length - 1 && msg.text === "Typing..."
          ? { sender: "gemini", text: response }
          : msg
      )
    );
  };

  return (
    <div className="flex justify-center lg:justify-between h-screen items-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
      <Chatbox
        chatHistory={chatHistory}
        onSendMessage={handleSendMessage}
        inputValue={inputValue} // Pass input value
        setInputValue={setInputValue} // Pass setInputValue for real-time updates
      />
      <div className="hidden lg:block lg:w-1/2 lg:ml-20">
        <About />
      </div>
    </div>
  );
}

export default App;
