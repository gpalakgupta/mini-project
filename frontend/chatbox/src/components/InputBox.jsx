import { useState } from "react";
import { motion } from "framer-motion";

function InputBox({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type symptoms here..."
        className="flex-1 p-3 border rounded-xl shadow-inner outline-none text-gray-700"
      />
      <button
        onClick={handleSend}
        className="px-4 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Send
      </button>
    </motion.div>
  );
}

export default InputBox;
