const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3500;

app.use(bodyParser.json());

// Baca db.json
const data = JSON.parse(fs.readFileSync('db.json'));

// Mendapatkan semua produk
app.get('/products', (req, res) => {
    res.json(data.products);
});

// Mendapatkan produk berdasarkan ID
app.get('/products/:id', (req, res) => {
    const product = data.products.find(p => p.id === req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});

// Mendapatkan semua pengguna
app.get('/users', (req, res) => {
    res.json(data.user);
});

// Mendapatkan pengguna berdasarkan ID
app.get('/users/:id', (req, res) => {
    const user = data.user.find(u => u.id === req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
