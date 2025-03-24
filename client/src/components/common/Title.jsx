import React from "react";

const Title = ({ title }) => {
  return (
    <div>
      <div className=" relative">
        <h3 className=" opacity-[0.2] top-[-20px] text-2xl xl:text-5xl text-purple-600 absolute font-hambra">
          {title}
        </h3>
        <h2 className="text-xl xl:text-4xl font-bold">{title}</h2>
        <span className=" w-[80px] h-[5px] rounded bg-purple-800 absolute top-[55px] xl:top-[50px]"></span>
      </div>
    </div>
  );
};

export default Title;
