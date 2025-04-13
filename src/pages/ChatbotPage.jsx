import React from "react";
import FAQAccordion from "../components/FAQAccordion";
import Chatbot from "../components/Chatbox";
export default function ChatbotPage(){
    const faqItems = [
        { question: "What is insurance?", answer: "Insurance is a contract (policy) in which an insurer indemnifies another against losses from specific contingencies or perils." },
        { question: "How are insurance premiums calculated?", answer: "Insurance premiums are calculated based on risk factors, coverage amount, deductible, claims history, and demographic information." },
        { question: "What is a deductible?", answer: "A deductible is the amount you pay out of pocket before your insurance coverage kicks in." },
        { question: "What's the difference between term and whole life insurance?", answer: "Term life insurance provides coverage for a specific period, while whole life insurance provides lifetime coverage and includes an investment component." },
        { question: "What does comprehensive auto insurance cover?", answer: "Comprehensive auto insurance covers damage to your vehicle not caused by a collision, such as theft, vandalism, natural disasters, and falling objects." },
        { question: "What is an insurance rider?", answer: "An insurance rider is an optional add-on to your insurance policy that provides additional coverage for specific needs." },
        { question: "How do I file an insurance claim?", answer: "To file an insurance claim, contact your insurance provider, provide policy information, document the incident, complete claim forms, and submit supporting documentation." },
        { question: "What is coinsurance?", answer: "Coinsurance is the percentage of costs you pay after you've paid your deductible, with the insurance company paying the rest." },
        { question: "What factors affect my auto insurance rates?", answer: "Factors affecting auto insurance rates include driving history, age, location, vehicle type, credit score, and coverage options." },
        { question: "What is an insurance premium?", answer: "An insurance premium is the amount you pay to your insurer for coverage, typically on a monthly, semi-annual, or annual basis." },
      ];
    
      return (
        <div className="flex flex-col w-full gap-4 p-4 max-w-6xl mx-auto md:flex-row">
          <FAQAccordion items={faqItems}/>
          <Chatbot faqItems={faqItems} />
        </div>
      );
}