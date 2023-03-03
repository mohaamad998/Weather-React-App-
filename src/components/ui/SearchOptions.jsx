import React from 'react';

const SearchOptions = ({ searchResults, onSubmit, isLoading, error }) => {
  if (searchResults.length <= 0 && !error && !isLoading)
    return <p>no options </p>;

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (error && !isLoading) {
    console.log(error.message);
    return <p className="text-red-900">{error.message}</p>;
  }

  return (
    <ul className={` flex-col gap-1  input-list`} >
      {searchResults?.map((item) => {
        return (
          <li
            key={item.name}
            className="hover:bg-blue-400 px-2 py-1 cursor-pointer focus-visible:bg-slate-600"
            onClick={onSubmit.bind(null, {
              latlng: item.latlng,
            })}
          >
            {item.name}, {item.capital}
          </li>
        );
      })}
    </ul>
  );
};

export default SearchOptions;
