import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import InputBox from "../components/InputBox";
import { motion } from "framer-motion";

function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! Enter your symptoms and I'll predict your disease." }
  ]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages((m) => [...m, { sender: "user", text }]);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: text }),
      });

      const data = await response.json();

      const reply =
        `🩺 Predicted Disease: ${data.predicted_disease}\n\n` +
        `💡 Precautions:\n- ${data.precautions.join("\n- ")}`;

      setMessages((m) => [...m, { sender: "bot", text: reply }]);

    } catch (err) {
      setMessages((m) => [
        ...m,
        { sender: "bot", text: "⚠️ Server not responding. Try again." },
      ]);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* HEADER */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="p-4 bg-white text-xl font-bold text-center shadow"
      >
        🩺 Smart Disease Prediction
      </motion.div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatBubble key={i} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      {/* INPUT */}
      <div className="p-4 bg-white shadow">
        <InputBox onSend={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
