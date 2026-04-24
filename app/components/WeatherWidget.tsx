"use client";

import { useEffect, useState } from "react";

const CITY = "New York City";
const STATE = "New York";
const LAT = 40.7128;
const LON = -74.006;
const TIMEZONE = "America/New_York";

type WeatherData = {
  temperature: number;
  windSpeed: number;
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,windspeed_10m&timezone=${TIMEZONE}&temperature_unit=fahrenheit&wind_speed_unit=mph`
        );
        const data = await res.json();
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          windSpeed: Math.round(data.current.windspeed_10m),
        });
      } catch {
        setError(true);
      }
    }
    fetchWeather();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TIMEZONE,
  });

  const formattedDay = time.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: TIMEZONE,
  });

  return (
    <div
      className="relative w-[360px] h-[360px] rounded-3xl overflow-hidden select-none"
      style={{
        backgroundImage: "url('/widget-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex flex-col justify-between h-full p-7">
        {/* top row */}
        <div className="flex items-start justify-between">
          <div className="text-white">
            <p className="text-lg font-semibold leading-tight">{formattedDay}</p>
            <p className="text-lg font-semibold leading-tight">{formattedTime}</p>
          </div>

          <div className="text-white">
            {error ? (
              <span className="text-4xl font-bold">—</span>
            ) : weather ? (
              <span className="text-7xl font-bold leading-none tracking-tight">
                {weather.temperature}°
              </span>
            ) : (
              <span className="text-7xl font-bold leading-none tracking-tight opacity-40">
                —
              </span>
            )}
          </div>
        </div>

        {/* bottom row */}
        <div className="flex items-end justify-between text-white">
          <div>
            <p className="text-2xl font-semibold leading-tight">{CITY}</p>
            <p className="text-2xl font-semibold leading-tight">{STATE}</p>
          </div>

          <div className="text-right">
            {weather && (
              <>
                <p className="text-sm font-medium opacity-80">Wind</p>
                <p className="text-xl font-semibold">{weather.windSpeed} mph</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
