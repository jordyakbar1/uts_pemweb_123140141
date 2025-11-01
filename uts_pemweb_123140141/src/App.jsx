import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";
import ForecastTable from "./components/ForecastTable";
import { ambilCuacaSekarang, ambilPrakiraan5Hari } from "./utils/api";
import "./App.css";

export default function App() {
  const [satuan, setSatuan] = useState("metric");
  const [cuacaSekarang, setCuacaSekarang] = useState(null);
  const [prakiraan, setPrakiraan] = useState(null);
  const [memuat, setMemuat] = useState(false);
  const [pesanError, setPesanError] = useState(null);
  const [riwayat, setRiwayat] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("riwayat_pencarian") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("riwayat_pencarian", JSON.stringify(riwayat));
  }, [riwayat]);

  async function saatPilihKota(kota) {
    setPesanError(null);
    setMemuat(true);
    try {
      const cuaca = await ambilCuacaSekarang(kota.lat, kota.lon, satuan);
      const ramalan = await ambilPrakiraan5Hari(kota.lat, kota.lon, satuan);
      setCuacaSekarang(cuaca);
      setPrakiraan(ramalan);

      setRiwayat((lama) => {
        const key = `${kota.name},${kota.country}`;
        const sudahAda = lama.find((p) => p.key === key);
        const item = { key, nama: kota.name, negara: kota.country, lat: kota.lat, lon: kota.lon };
        if (sudahAda) return [item, ...lama.filter(p => p.key !== key)].slice(0,10);
        return [item, ...lama].slice(0,10);
      });
    } catch {
      setPesanError("Gagal mengambil data cuaca. Cek koneksi atau API key.");
    } finally {
      setMemuat(false);
    }
  }

  useEffect(() => {
    async function ulang() {
      if (!cuacaSekarang) return;
      setMemuat(true);
      try {
        const { coord } = cuacaSekarang;
        const cuaca = await ambilCuacaSekarang(coord.lat, coord.lon, satuan);
        const ramalan = await ambilPrakiraan5Hari(coord.lat, coord.lon, satuan);
        setCuacaSekarang(cuaca);
        setPrakiraan(ramalan);
      } finally {
        setMemuat(false);
      }
    }
    ulang();
  }, [satuan]);

  return (
    <div className="app-container">
      <Header />
      <div className="top-controls">
        <SearchForm onSelectCity={saatPilihKota} />
        <div className="unit-toggle">
          <label>
            <input type="radio" checked={satuan === "metric"} onChange={() => setSatuan("metric")} /> °C
          </label>
          <label style={{marginLeft:8}}>
            <input type="radio" checked={satuan === "imperial"} onChange={() => setSatuan("imperial")} /> °F
          </label>
        </div>
      </div>

      {memuat && <div className="status-text">Sedang memuat data...</div>}
      {pesanError && <div className="status-text error">{pesanError}</div>}

      <div className="main-content">
        {cuacaSekarang && <WeatherCard data={cuacaSekarang} satuan={satuan} />}
        {prakiraan && <ForecastTable forecastData={prakiraan} />}
      </div>

      {riwayat.length > 0 && (
        <section className="history">
          <h3>Riwayat Pencarian</h3>
          <ul>
            {riwayat.map(r => (
              <li key={r.key}>{r.nama}, {r.negara}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}


