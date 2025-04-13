export default function ChatMessage({ message }) {
    return (
      <div className={`flex items-start ${message.isUser ? "justify-end" : "justify-start"}`}>
        {!message.isUser && (
          <div className="w-8 h-8 rounded-full mr-2 bg-blue-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
        )}
        <div
          className={`p-3 rounded-lg max-w-[80%] ${
            message.isUser ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {message.text}
        </div>
      </div>
    );
  }
  