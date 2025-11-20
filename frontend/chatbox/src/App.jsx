import { useState } from "react";
import ChatBubble from "./components/ChatBubble";
import InputBox from "./components/InputBox";
import { motion } from "framer-motion";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! Enter your symptoms and I'll predict your disease." }
  ]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { sender: "user", text }]);

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: text }),
      });

      const data = await response.json();

      const reply =
        `🩺 *Predicted Disease:* ${data.predicted_disease}\n\n` +
        `✅ *Precautions:*\n- ${data.precautions.join("\n- ")}`;

      setMessages((m) => [...m, { sender: "bot", text: reply }]);

    } catch (err) {
      setMessages((m) => [
        ...m,
        { sender: "bot", text: "⚠️ Unable to reach the server. Try again." },
      ]);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col">

      {/* HEADER WITH ANIMATION */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold text-center shadow-md"
      >
        🩺 Smart Disease Prediction Chatbot
      </motion.div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      {/* FLOATING INPUT */}
      <div className="p-4 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <InputBox onSend={sendMessage} />
      </div>
    </div>
  );
}

export default App;
