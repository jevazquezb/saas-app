"use client";

import { useState } from "react";

const FAQListItem = ({ qa }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="py-5 font-semibold border-b w-full text-left flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{qa.question}</span>
        <span>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          )}
        </span>
      </button>

      {
        <p className={`${isOpen ? "block" : "hidden"} mt-3 mb-6 opacity-90`}>
          {qa.answer}
        </p>
      }
    </li>
  );
};

export default FAQListItem;
