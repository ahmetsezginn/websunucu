const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // JSON veriyi işlemek için middleware

let tableData = []; // Bu örnek için verileri bellekte saklıyoruz.
const fs = require('fs');

app.get('/table', (req, res) => {
    fs.readFile('table.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Dosya okunamadı.' });
        } else {
            res.json(data);
        }
    });
});
app.post('/table', (req, res) => {
    fs.writeFile('table.html', req.body, (err) => {
        if (err) {
            res.status(500).send({ message: 'Dosya yazılamadi.' });
        } else {
            res.status(200).send({ message: 'Tablo verileri güncellendi.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
