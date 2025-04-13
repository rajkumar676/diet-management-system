import { useState } from "react";
import ChatMessage from "./ChatMessage";
import SuggestedQuestions from "./SuggestedQuestions";

export default function Chatbot({ faqItems }) {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your insurance assistant. How can I help you today?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { text, isUser: true }]);

    setTimeout(() => {
      const faqItem = faqItems.find(
        (item) =>
          item.question.toLowerCase().includes(text.toLowerCase()) ||
          text.toLowerCase().includes(item.question.toLowerCase().replace("what is ", "").replace("how do i ", "").replace("how are ", ""))
      );

      const botResponse = faqItem
        ? faqItem.answer
        : "I don't have specific information about that. Can you try asking one of the suggested questions or check our FAQ section?";

      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    }, 500);

    setInputValue("");
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-md md:w-3/4">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-xl font-semibold">Chatbot</h3>
      </div>
      <div className="flex flex-col h-[500px] p-4">
        <div className="flex-1 overflow-y-auto mb-4 flex flex-col gap-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        {messages.length < 3 && (
          <SuggestedQuestions
          allQuestions={faqItems.map((f) => f.question)}
          inputValue={inputValue}
          onSelect={(q) => {
            setInputValue(q);
            handleSendMessage(q);
          }}
        />
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your question here..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-3 border border-gray-200 rounded-md text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          />
          <button
            className="px-6 py-3 bg-blue-500 text-white border-none rounded-md font-medium cursor-pointer transition-colors hover:bg-blue-600"
            onClick={() => handleSendMessage()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
