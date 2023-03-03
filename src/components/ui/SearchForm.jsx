import React from 'react';

const SearchForm = ({ onSearchChange, onFocus }) => {
  return (
    <form className="search-form" onKeyDown={() => console.log(1)}>
      <div className="flex relative">
        <input
          type="text"
          className="input flex-1 text-[22px] p-2 focus:outline-gray-500 rounded-lg bg-black text-white"
          placeholder="search for city..."
          onChange={onSearchChange}
          onFocus={onFocus}
        />
        <button className=" p-2 text-[22px] rounded-r-lg text-white absolute right-0  bg-gray-900">
          search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
