import React, { useState } from 'react';

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const Forcast = ({ forecast }) => {
  if (!forecast) return;
  const [open, setOpen] = useState('');

  const forecastUpdated = forecast.reduce((acc, curr) => {
    const {
      weather: [{ icon }],
      main: { temp },
      dt_txt,
    } = curr;

    const time = new Date(dt_txt).getHours();
    const dayIndex = new Date(dt_txt).getDay();
    const day = weekday[dayIndex];

    acc[day] = acc[day] || {
      hours: {},
      maxTemp: temp,
      minTemp: temp,
    };

    acc[day].maxTemp = Math.max(temp, acc[day].maxTemp).toFixed();
    acc[day].minTemp = Math.max(temp, acc[day].minTemp).toFixed();

    acc[day].hours[time] = { temp, icon };

    return acc;
  }, {});

  console.log(forecastUpdated);
  console.log(forecast);
  return (
    <ul className="w-[1080px] max-w-[1080px] flex flex-col gap-2 mt-20">
      {Object.entries(forecastUpdated).map(([day, dayDetail], idx) => {
        return (
          <li key={idx} onClick={() => setOpen(day)} className="cursor-pointer">
            <div className="flex justify-between p-2 rounded-lg shadow-lg bg-white">
              <div className="flex gap-2">
                <img src="" alt="" />
                <span>{day}</span>
              </div>
              <div className="flex gap-2">
                <span>clear sky</span>
                <span className=" text-gray-500">
                  {`${dayDetail.maxTemp} / ${dayDetail.minTemp}`}
                </span>
              </div>
            </div>
            {open === day && (
              <div className="bg-[#191919] shadow-lg text-white mt-2 rounded-lg  duration-300 fade-in-top p-3 flex  flex-wrap ">
                {Object.entries(dayDetail.hours).map(
                  ([time, tempDetail], idx) => {
                    return (
                      <div
                        className="  py-1 px-3 flex items-center flex-col flex-1"
                        key={idx}
                      >
                        <img
                          src={`../../public/icons/${tempDetail.icon}.png`}
                          alt=""
                          className="w-10 h-10 mb-2"
                        />
                        <div className="flex flex-col items-center">
                          <span>{tempDetail.temp.toFixed()}°C</span>
                          <span>{`${time}:00 ${time < 12 ? 'am' : 'pm'}`}</span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Forcast;
