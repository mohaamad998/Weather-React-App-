const WeatherDetails = ({ weather }) => {
  if (!weather) return <p>loading...</p>;

  const { temp, feels_like: feelsLike, pressure, humidity } = weather.main;
  const {
    wind: { speed },
    name,
    weather: [{ description, icon }],
  } = weather;

  return (
    <div className="mt-10 shadow-lg rounded-lg p-4 bg-[#1f1f1f] text-white w-[300px] max-w[300px] m-auto">
      <div className="flex justify-between items-center">
        <div>
          <span className="block">{name}</span>
          <span className="block">{description}</span>
        </div>
        <img
          src={`../../public/icons/${icon}.png`}
          alt=""
          className="w-[50px] h-[50px]"
        />
      </div>

      <div className="flex gap-4 mt-4 items-center">
        <span className="font-bold text-[70px] tracking-[-5px]">
          {temp.toFixed()}°C
        </span>
        <div className="flex-1 text-[10px]">
          <div>Deatils</div>
          <div className="flex justify-between">
            <span>Feels like</span>
            <span className="font-semibold">{feelsLike}°C</span>
          </div>
          <div className="flex justify-between">
            <span>Wind</span>
            <span className="font-semibold">{speed} m/s</span>
          </div>
          <div className="flex justify-between">
            <span>Humidity</span>
            <span className="font-semibold">{humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span>Preassure</span>
            <span className="font-semibold">{pressure} hpa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
