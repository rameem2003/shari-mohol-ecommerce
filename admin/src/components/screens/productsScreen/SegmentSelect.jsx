import React, { useEffect, useState } from "react";

// react icons
import { IoChevronDown } from "react-icons/io5";

const SegmentSelect = ({ setSegment }) => {
  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState("Select Option");

  const options = [
    {
      value: "hotSell",
      label: "Hot Sell",
    },
    {
      value: "featured",
      label: "Featured",
    },
  ];

  const handleSelectOption = (option) => {
    setContent(option.label);
    setSegment(option.value);
    setIsActive(false);
  };

  // outside click to off dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      let target = event.target;

      if (!target.closest(".dropdown")) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="mb-4 flex w-full gap-5">
      <button
        className="dropdown relative flex w-full cursor-pointer items-center justify-between gap-8 rounded-md border border-[#d1d1d1] bg-[#fff] px-3 py-2 dark:border-slate-600 dark:bg-transparent dark:text-[#abc2d3]"
        onClick={() => setIsActive(!isActive)}
      >
        {content}
        <IoChevronDown
          className={`${
            isActive ? "rotate-[180deg]" : "rotate-0"
          } text-[1.2rem] transition-all duration-300`}
        />
        <div
          className={`${
            isActive
              ? "z-[1] scale-[1] opacity-100"
              : "z-[-1] scale-[0.8] opacity-0"
          } absolute left-0 right-0 top-12 z-40 flex w-full flex-col overflow-hidden rounded-xl bg-[#fff] transition-all duration-300 ease-in-out dark:bg-slate-800`}
          style={{
            boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
          }}
        >
          <p
            className="px-4 py-2 capitalize transition-all duration-200 hover:bg-[#ececec] dark:hover:bg-slate-900/40"
            onClick={() => handleSelectOption({ label: "All", value: "" })}
          >
            All
          </p>
          {options?.map((option, index) => (
            <p
              className="px-4 py-2 capitalize transition-all duration-200 hover:bg-[#ececec] dark:hover:bg-slate-900/40"
              key={index}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </p>
          ))}
        </div>
      </button>
    </div>
  );
};

export default SegmentSelect;
