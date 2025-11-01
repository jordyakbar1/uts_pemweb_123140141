import React from "react";

export default function WeatherCard({ data, satuan }) {
  if (!data) return null;

  const suhu = Math.round(data.main.temp);
  const kelembapan = data.main.humidity;
  const angin = data.wind.speed;
  const deskripsi = data.weather?.[0]?.description || "";
  const ikon = data.weather?.[0]?.icon;
  const urlIkon = ikon ? `https://openweathermap.org/img/wn/${ikon}@2x.png` : null;

  return (
    <div className="weather-card">
      {urlIkon && <img src={urlIkon} alt={deskripsi} />}
      <div>
        <h2>
          {data.name}, {data.sys?.country}
        </h2>
        <p style={{ fontSize: "1.8rem" }}>
          {suhu}°{satuan === "metric" ? "C" : "F"}
        </p>
        <p>{deskripsi}</p>
        <p>Kelembapan: {kelembapan}%</p>
        <p>
          Kecepatan angin: {angin} {satuan === "metric" ? "m/detik" : "mph"}
        </p>
      </div>
    </div>
  );
}


