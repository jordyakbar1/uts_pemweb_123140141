import fs from "fs";

const API_KEY = "e72468f501ed7a7634c60e8738360618";

const daftarKota = [
  "Jakarta", "Bandung", "Surabaya", "Medan", "Semarang", "Palembang", "Makassar", "Lampung", "Pontianak", "Denpasar",
  "Yogyakarta", "Manado", "Padang", "Balikpapan", "Samarinda", "Malang", "Cirebon", "Tasikmalaya", "Pekanbaru", "Batam",
  "Banjarmasin", "Bogor", "Tangerang", "Depok", "Bekasi", "Serang", "Cilegon", "Kediri", "Probolinggo", "Tegal",
  "Magelang", "Banda Aceh", "Tanjungpinang", "Mataram", "Kupang", "Jayapura", "Ambon", "Palu", "Kendari", "Gorontalo",
  "Bengkulu", "Jambi", "Singkawang", "Sibolga", "Padangsidimpuan", "Tebingtinggi", "Binjai", "Pematangsiantar", "Lubuklinggau",
  "Prabumulih", "Tanjungbalai", "Tarakan", "Bontang", "Banjarbaru", "Palangkaraya", "Bitung", "Tomohon", "Sorong",
  "Ternate", "Tidore", "Merauke", "Wamena", "Kudus", "Jepara", "Purwokerto", "Cilacap", "Sukabumi", "Karawang",
  "Purwakarta", "Garut", "Cianjur", "Indramayu", "Subang", "Majalengka", "Sumedang", "Kuningan", "Banjar", "Pasuruan",
  "Sidoarjo", "Blitar", "Jember", "Banyuwangi", "Situbondo", "Lumajang", "Bondowoso", "Pamekasan", "Sampang", "Sumenep"
];

const hasil = [];

for (const nama of daftarKota) {
  console.log(`🌤️ Mengambil data cuaca untuk ${nama}...`);
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${nama}&appid=${API_KEY}&units=metric&lang=id`
    );
    const data = await res.json();
    if (data.cod === 200) hasil.push(data);
    else console.warn(`⚠️ Gagal ambil data untuk ${nama}: ${data.message}`);
  } catch (err) {
    console.error(`❌ Error mengambil ${nama}:`, err.message);
  }
}

fs.writeFileSync("./src/data/cuaca.json", JSON.stringify(hasil, null, 2));
console.log(`✅ Data cuaca tersimpan di src/data/cuaca.json (${hasil.length} kota berhasil)`);

