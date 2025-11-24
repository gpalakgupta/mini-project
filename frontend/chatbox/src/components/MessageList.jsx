import Message from "./Message";

function MessageList({ messages }) {
  return (
    <div className="w-full max-w-3xl flex-1 overflow-y-auto mb-3 p-4 bg-white rounded-2xl shadow-md space-y-3">
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
    </div>
  );
}

export default MessageList;
