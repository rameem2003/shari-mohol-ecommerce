import React from "react";

const SearchComponent = () => {
  return (
    <div className=" w-full">
      <div className="w-full h-10 lg:h-[50px] bg-white rounded-sm">
        <input
          className=" w-full h-full px-5 rounded-sm text-shari-mohol-primary outline-none font-medium text-base lg:text-lg placeholder:text-shari-mohol-primary"
          placeholder="Search Your Product....."
          type="text"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default SearchComponent;
