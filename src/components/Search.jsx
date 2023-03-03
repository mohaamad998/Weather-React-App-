import React, { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { loadGeoCities } from '../libs/requests';
import SearchForm from './ui/SearchForm';
import SearchOptions from './ui/SearchOptions';
import { loadWeatherData } from '../libs/requests';
import WeatherDetails from './WeatherDetails';
import Forcast from './Forcast';

const Search = () => {
  const { sendReq, data: searchResults, isLoading, error } = useHttp();
  const {
    sendReq: sendWeatherReq,
    data: weatherData,
    isLoading: isWeatherLoading,
  } = useHttp();

  const [show, setShow] = useState(false);

  const weather = weatherData[0] || null;
  const forecast = weatherData[1] || null;

  let debouncing = 0;

  const handelOnSearchChange = (event) => {
    const searchInput = event.target.value;
    clearTimeout(debouncing);
    debouncing = setTimeout(() => {
      sendReq(loadGeoCities.bind(null, searchInput));
    }, 300);
  };

  const handelOnSubmit = async (options) => {
    const {
      latlng: [lat, lng],
    } = options;
    sendWeatherReq(loadWeatherData.bind(null, lat, lng));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { longitude: lng, latitude: lat } = position.coords;
      sendWeatherReq(loadWeatherData.bind(null, lat, lng));
    });
  }, []);

  return (
    <div className=" max-w-[1080px] m-auto mt-[20px] w-[1080px] ">
      <SearchForm
        onSearchChange={handelOnSearchChange}
        onFocus={() => setShow(true)}
      />

      {show && (
        <div className="p-2 text-[22px] bg-white mt-2 absolute w-[1080px] max-w-[1080px] z-10 rounded-lg">
          <SearchOptions
            searchResults={searchResults}
            isLoading={isLoading}
            error={error}
            onSubmit={handelOnSubmit}
          />
        </div>
      )}
      {isWeatherLoading ? (
        <p>loading...</p>
      ) : (
        <div className="fade-in-top">
          <WeatherDetails weather={weather} />
          <Forcast forecast={forecast?.list} />
        </div>
      )}
    </div>
  );
};

export default Search;
