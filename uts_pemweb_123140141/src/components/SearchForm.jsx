import React, { useState, useEffect } from 'react';
import { geocodeKota } from '../utils/api';

export default function SearchForm({ onSelectCity }) {
  const [kataKunci, setKataKunci] = useState('');
  const [saran, setSaran] = useState([]);
  const [memuat, setMemuat] = useState(false);
  const [pesanError, setPesanError] = useState(null);

  useEffect(() => {
    if (!kataKunci) { setSaran([]); return; }
    const jeda = setTimeout(async () => {
      try {
        setMemuat(true);
        const hasil = await geocodeKota(kataKunci, 5);
        setSaran(hasil || []);
        setPesanError(null);
      } catch {
        setPesanError('Gagal mencari kota.');
      } finally {
        setMemuat(false);
      }
    }, 400);
    return () => clearTimeout(jeda);
  }, [kataKunci]);

  return (
    <div style={{maxWidth:600, margin:'0 auto'}}>
      <input
        aria-label="Cari kota"
        placeholder="Ketik nama kota (contoh: Jakarta)"
        value={kataKunci}
        onChange={e => setKataKunci(e.target.value)}
        style={{width:'100%', padding:10, fontSize:16}}
      />
      {memuat && <div>Memuat...</div>}
      {pesanError && <div style={{color:'red'}}>{pesanError}</div>}
      <ul style={{listStyle:'none', paddingLeft:0}}>
        {saran.map((s, i) => (
          <li key={i} style={{padding:8, cursor:'pointer', borderBottom:'1px solid #eee'}}
              onClick={() => {
                setKataKunci(`${s.name}${s.state ? ', ' + s.state : ''}, ${s.country}`);
                setSaran([]);
                onSelectCity(s);
              }}>
            <strong>{s.name}</strong>{s.state ? `, ${s.state}` : ''} — {s.country}
          </li>
        ))}
      </ul>
    </div>
  );
}
