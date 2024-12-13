const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo-controller');
const { isSignIn } = require('../middlewares/isSignIn');

// Halaman utama untuk menampilkan kegiatan
router.get('/', isSignIn, todoController.getKegiatan);

// Menambah kegiatan
router.post('/', isSignIn, todoController.createKegiatan);

// Mengambil kegiatan berdasarkan ID
router.get('/:id', isSignIn, todoController.getKegiatanById);

// Memperbarui kegiatan berdasarkan ID
router.post('/edit/:id', isSignIn, todoController.updateKegiatan);

// Menghapus kegiatan berdasarkan ID
router.post('/delete/:id', isSignIn, todoController.deleteKegiatan);

module.exports = router;
