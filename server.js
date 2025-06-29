const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const DATA_FILE = 'pesan.json';

// Baca pesan dari file
function bacaPesan() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE));
  }
  return [];
}

// Simpan pesan ke file
function simpanPesan(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Endpoint ambil semua pesan
app.get('/api/pesan', (req, res) => {
  res.json(bacaPesan());
});

// Endpoint kirim pesan
app.post('/api/pesan', (req, res) => {
  const { nama, pesan } = req.body;
  if (!nama || !pesan) return res.status(400).json({ error: 'Nama & pesan wajib diisi' });

  const semuaPesan = bacaPesan();
  semuaPesan.push({ nama, pesan });
  simpanPesan(semuaPesan);

  res.json({ sukses: true });
});

app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));