import dataCuaca from "../data/cuaca.json";

function cariKota(lat, lon) {
  if (lat && lon) {
    return dataCuaca.find(
      (d) =>
        Math.abs(d.coord.lat - lat) < 0.5 &&
        Math.abs(d.coord.lon - lon) < 0.5
    );
  }
  return null;
}

function cariKotaNama(nama) {
  return dataCuaca.find(
    (d) => d.name.toLowerCase() === nama.toLowerCase()
  );
}

export async function ambilCuacaSekarang(lat, lon, satuan = "metric") {
  let kota = cariKota(lat, lon);
  if (!kota && lat && lon) {
    kota = dataCuaca[Math.floor(Math.random() * dataCuaca.length)];
  }
  return kota || null;
}

export async function ambilPrakiraan5Hari(lat, lon, satuan = "metric") {
  const kota = cariKota(lat, lon);
  if (!kota) return [];

  const prakiraan = [];
  for (let i = 1; i <= 5; i++) {
    prakiraan.push({
      dt_txt: `Hari ke-${i}`,
      main: {
        temp: (kota.main.temp + (Math.random() * 4 - 2)).toFixed(1),
      },
      weather: [
        {
          description: kota.weather[0].description,
          icon: kota.weather[0].icon,
        },
      ],
    });
  }
  return prakiraan;
}
