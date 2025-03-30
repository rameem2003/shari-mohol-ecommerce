import React, { useState } from "react";

// react icons
import { IoChevronDown } from "react-icons/io5";

const Select = ({ name, items, onChange }) => {
  // close the dropdown is clicked outside
  document.addEventListener("click", function (event) {
    let target = event.target;

    if (!target.closest(".dropdown")) {
      setIsActive(false);
    }
  });

  // actions
  const [isActive, setIsActive] = useState(false);
  const [content, setContent] = useState("Select Option");
  // functions for dropdown
  const optionSelect = (option) => {
    setContent(option);
    onChange(name, option);
    setIsActive(false);
  };

  return (
    <button
      className="bg-[#fff] border border-gray-200 rounded-md mt-1 justify-between px-3 py-2 flex items-center gap-8  relative cursor-pointer dropdown w-full"
      onClick={() => setIsActive(!isActive)}
    >
      <p
        className={`${
          content === "Select Option" ? "text-gray-400" : "dark:text-[#abc2d3]"
        }`}
      >
        {content}
      </p>
      <IoChevronDown
        className={`${
          isActive ? " rotate-[180deg]" : " rotate-0"
        } transition-all duration-300 text-gray-600 text-[1.2rem]`}
      />
      <div
        className={`${
          isActive ? " opacity-100 scale-[1]" : " opacity-0 scale-[0.8] z-[-1]"
        } w-full absolute top-12 left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col  overflow-hidden transition-all duration-200 ease-in-out py-1`}
        style={{
          boxShadow: "0 15px 40px -15px rgba(0, 0, 0, 0.2)",
        }}
      >
        {items?.map((option, index) => (
          <p
            className="py-2 px-4 text-left text-gray-800 hover:bg-gray-50 transition-all duration-200"
            key={index}
            onClick={(e) => optionSelect(option)}
          >
            {option}
          </p>
        ))}
      </div>
    </button>
  );
};

export default Select;
