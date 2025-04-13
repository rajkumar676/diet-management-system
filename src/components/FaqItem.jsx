export default function FAQItem({ item, index, isOpen, toggleAccordion }) {
    return (
      <div className="border-b border-gray-200">
        <button
          className="w-full p-4 text-left bg-none border-none cursor-pointer font-medium flex justify-between items-center hover:bg-gray-50"
          onClick={() => toggleAccordion(`item-${index}`)}
          aria-expanded={isOpen}
        >
          {item.question}
          <span className="text-lg font-bold">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen && <div className="p-4 bg-gray-50">{item.answer}</div>}
      </div>
    );
  }
  