

const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY;
const GEOCODE_BASE = 'https://api.openweathermap.org/geo/1.0';
const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5';

export async function geocodeKota(kataKunci, batas = 5) {
  if (!kataKunci) return [];
  const url = `${GEOCODE_BASE}/direct?q=${encodeURIComponent(kataKunci)}&limit=${batas}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Gagal memanggil API lokasi');
  return res.json(); 
}


export async function ambilCuacaSekarang(lat, lon, satuan = 'metric') {
  const url = `${WEATHER_BASE}/weather?lat=${lat}&lon=${lon}&units=${satuan}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Gagal memanggil API cuaca saat ini');
  return res.json();
}


export async function ambilPrakiraan5Hari(lat, lon, satuan = 'metric') {
  const url = `${WEATHER_BASE}/forecast?lat=${lat}&lon=${lon}&units=${satuan}&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Gagal memanggil API prakiraan');
  return res.json();
}

