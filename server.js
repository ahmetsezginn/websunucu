const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // JSON veriyi işlemek için middleware

let tableData = []; // Bu örnek için verileri bellekte saklıyoruz.

// GET ve POST isteklerini işleyecek rotaları tanımlıyoruz.
app.get('/api/table', (req, res) => {
    res.json(tableData);
});

app.post('/api/table', (req, res) => {
    tableData = req.body;
    res.status(200).send({ message: 'Tablo verileri güncellendi.' });
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
