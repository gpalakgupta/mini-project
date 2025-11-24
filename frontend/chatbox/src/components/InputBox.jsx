import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

function InputBox({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      onSend(text);
      setText("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 w-full max-w-3xl"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your symptoms..."
        className="flex-1 p-4 bg-white border border-blue-300 rounded-xl shadow-sm 
                   focus:border-blue-600 focus:shadow-blue-300/50 
                   outline-none transition-all duration-300"
      />

      <button
        onClick={handleSend}
        className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md 
                   flex items-center justify-center transition-all duration-300"
      >
        <Send size={22} />
      </button>
    </motion.div>
  );
}

export default InputBox;
