import React from "react";

const SearchBar = ({setCity}) => {
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="md:w-[500px] sm:w-[400px] flex justify-between mx-auto mt-4">
      <input
        className="p-2 w-full text-[#bac2ce] outline-0 rounded-xl bg-primary placeholder-[#bac2ce]"
        type="search"
        placeholder="Search for cities"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
