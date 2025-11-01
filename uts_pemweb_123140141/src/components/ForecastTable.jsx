import React from "react";
export default function ForecastTable({ forecastData }) {
  // Jika tidak ada data, jangan tampilkan apa-apa
  if (!forecastData || !forecastData.list) return null;

  const kelompokHari = {};
  forecastData.list.forEach((item) => {
    const tanggal = new Date(item.dt * 1000).toISOString().slice(0, 10);
    if (!kelompokHari[tanggal]) kelompokHari[tanggal] = [];
    kelompokHari[tanggal].push(item);
  });

  const ringkasanHarian = Object.keys(kelompokHari)
    .slice(0, 5) // hanya 5 hari ke depan
    .map((tgl) => {
      const dataHari = kelompokHari[tgl];
      const suhuList = dataHari.map((d) => d.main.temp);
      const ikonList = dataHari.map((d) => d.weather?.[0]?.icon).filter(Boolean);
      const ikonTengah =
        ikonList.length > 0
          ? ikonList[Math.floor(ikonList.length / 2)]
          : null;

      return {
        tanggal: tgl,
        min: Math.round(Math.min(...suhuList)),
        max: Math.round(Math.max(...suhuList)),
        ikon: ikonTengah,
      };
    });

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Suhu Minimum</th>
          <th>Suhu Maksimum</th>
          <th>Ikon Cuaca</th>
        </tr>
      </thead>
      <tbody>
        {ringkasanHarian.map((hari) => (
          <tr key={hari.tanggal}>
            <td>{hari.tanggal}</td>
            <td>{hari.min}°</td>
            <td>{hari.max}°</td>
            <td>
              {hari.ikon ? (
                <img
                  src={`https://openweathermap.org/img/wn/${hari.ikon}.png`}
                  alt="ikon cuaca"
                  width="40"
                  height="40"
                />
              ) : (
                "-"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
