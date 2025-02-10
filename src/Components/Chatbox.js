import React, { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import Logo from "../assets/logo.png";

const Chatbox = ({ chatHistory, onSendMessage }) => {
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userMessage.trim() === "" || loading) return;

    const message = userMessage; // Save the current message
    setUserMessage(""); // Clear the input field instantly
    
    setLoading(true);

    // Simulate sending a message and receiving a response
    await onSendMessage(message);

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="rounded-2xl w-[90%] lg:w-1/3 lg:h-[85%] lg:absolute lg:right-20 lg:top-15 flex flex-col justify-between pb-4 shadow-lg h-3/4 bg-gradient-to-br from-blue-400 to-purple-500">
      <div className="bg-purple-400 rounded-t-2xl h-20 p-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          GenieAI
        </h1>
        <p className="text-sm font-bold italic text-purple-600">
          Jo Hukum, Mere Developer
        </p>
      </div>

      {/* Chat History */}
      <div
        ref={chatContainerRef}
        className="overflow-y-auto flex-grow space-y-1 p-2 rounded-lg flex flex-col scrollbar-hide"
      >
        {/* Prewritten Info Message */}
        <div className="flex items-start gap-2 justify-center">
          <div className="p-1 rounded-xl break-words bg-yellow-400 text-black">
            <p className="text-center text-sm text-white">
              Please be polite, avoid spamming, and be professional while interacting with GenieAI. Let's keep the conversation respectful!
            </p>
          </div>
        </div>

        {/* User's and AI's Messages */}
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender !== "user" && (
              <div className="w-8 h-8 flex-shrink-0 bg-white mt-1 rounded-full flex items-center justify-center">
                <img
                  src={Logo}
                  alt="AI Logo"
                  className="w-6 h-6 rounded-full"
                />
              </div>
            )}
            <div
              className={`p-2 rounded-xl max-w-[75%] break-words ${
                message.sender === "user"
                  ? "bg-blue-100 text-blue-900 self-end"
                  : "bg-purple-100 text-purple-900 self-start"
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="relative mr-2 ml-2">
        <input
          type="text"
          value={userMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="w-full p-3 pl-4 pr-10 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          className={`absolute right-2 top-1 flex items-center justify-center p-2 rounded-full ${
            loading
              ? "cursor-not-allowed text-gray-400"
              : "text-black hover:bg-gray-300"
          }`}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
