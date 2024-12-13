const database = require('../configs/database');

// Halaman Todo List (Mengambil data kegiatan)
const getKegiatan = (req, res) => {
    const sql = 'SELECT * FROM kegiatan';

    database.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching kegiatan:', err.message);
            return res.status(500).json({ message: 'Error fetching data' });
        }

        res.render('todo', {
            title: 'Todo List',
            showNavbar: true,
            showFooter: true,
            kegiatan: results 
        });
    });
};

// Create kegiatan (Menambah kegiatan baru)
const createKegiatan = (req, res) => {
    const { nama_kegiatan, jenis_kegiatan, keterangan_kegiatan } = req.body;

    if (!nama_kegiatan || !jenis_kegiatan || !keterangan_kegiatan) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = `INSERT INTO kegiatan (nama_kegiatan, jenis_kegiatan, keterangan_kegiatan) VALUES (?, ?, ?)`;

    database.query(sql, [nama_kegiatan, jenis_kegiatan, keterangan_kegiatan], (err, result) => {
        if (err) {
            console.error('Error creating kegiatan:', err.message);
            return res.status(500).json({ message: 'Failed to create kegiatan. Please try again later.' });
        }
        res.redirect('/todo')
    });
};

// Get kegiatan by ID (Mendapatkan kegiatan berdasarkan ID)
const getKegiatanById = (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM kegiatan WHERE id = ?`;

    database.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching kegiatan by ID:', err.message);
            return res.status(500).json({ message: 'Failed to fetch kegiatan. Please try again later.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: `Kegiatan with ID ${id} not found.` });
        }

        res.status(200).json(results[0]);
    });
};

// Update kegiatan by ID (Memperbarui kegiatan berdasarkan ID)
const updateKegiatan = (req, res) => {
    const { id } = req.params;
    const { nama_kegiatan, jenis_kegiatan, keterangan_kegiatan } = req.body;

    const sql = `UPDATE kegiatan SET nama_kegiatan = ?, jenis_kegiatan = ?, keterangan_kegiatan = ? WHERE id_kegiatan = ?`;

    database.query(sql, [nama_kegiatan, jenis_kegiatan, keterangan_kegiatan, id], (err, result) => {
        if (err) {
            console.error('Error updating kegiatan:', err.message);
            return res.status(500).json({ message: 'Failed to update kegiatan. Please try again later.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Kegiatan with ID ${id} not found.` });
        }
        res.redirect('/todo')
    });
};

// Delete kegiatan by ID (Menghapus kegiatan berdasarkan ID)
const deleteKegiatan = (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM kegiatan WHERE id_kegiatan = ?`;

    database.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting kegiatan:', err.message);
            return res.status(500).json({ message: 'Failed to delete kegiatan. Please try again later.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: `Kegiatan with ID ${id} not found.` });
        }
        res.redirect('/todo')
    });
};

module.exports = {
    createKegiatan,
    getKegiatan,
    getKegiatanById,
    updateKegiatan,
    deleteKegiatan,
};
