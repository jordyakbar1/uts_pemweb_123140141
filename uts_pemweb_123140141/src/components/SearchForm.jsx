import React, { useState } from "react";
import dataCuaca from "../data/cuaca.json";

export default function SearchForm({ onSelectCity }) {
  const [query, setQuery] = useState("");
  const [hasil, setHasil] = useState([]);

  function cariKota(keyword) {
    if (!keyword.trim()) {
      setHasil([]);
      return;
    }

    const filtered = dataCuaca
      .filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      )
      .slice(0, 10); 
    setHasil(filtered);
  }

  function pilihKota(kota) {
    setQuery(kota.name);
    setHasil([]);
    onSelectCity({
      name: kota.name,
      country: kota.sys.country,
      lat: kota.coord.lat,
      lon: kota.coord.lon,
    });
  }

  return (
    <div className="search-form">
      <input
        type="text"
        value={query}
        placeholder="Cari kota..."
        onChange={(e) => {
          setQuery(e.target.value);
          cariKota(e.target.value);
        }}
      />
      {hasil.length > 0 && (
        <ul className="search-results">
          {hasil.map((kota, i) => (
            <li key={i} onClick={() => pilihKota(kota)}>
              {kota.name}, {kota.sys.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
