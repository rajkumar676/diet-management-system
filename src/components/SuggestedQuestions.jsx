import Fuse from "fuse.js";
import { useMemo } from "react";

export default function SuggestedQuestions({ onSelect, inputValue }) {
  const suggestedQuestions = [
    "What is insurance?",
    "What are premiums?",
    "What is coinsurance?",
    "What is a deductible?",
    "What is liability coverage?",
  ];

  const fuse = useMemo(() => {
    return new Fuse(suggestedQuestions, {
      includeScore: true,
      threshold: 0.4, 
    });
  }, []);

  const filteredQuestions = useMemo(() => {
    if (!inputValue || inputValue.trim() === "") return suggestedQuestions;

    return fuse.search(inputValue).map((result) => result.item);
  }, [inputValue, fuse]);

  return (
    <div className="mb-4 flex flex-col gap-2">
      {filteredQuestions.map((question, index) => (
        <button
          key={index}
          className="w-full p-3 text-left bg-white border border-gray-200 rounded-md cursor-pointer transition-colors hover:bg-gray-50"
          onClick={() => onSelect(question)}
        >
          {question}
        </button>
      ))}
    </div>
  );
}
