import multer from "multer";
import path from 'path';

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Folder tujuan penyimpanan file
        cb(null, 'public/uploads/contacts');
    },
    filename: function (req, file, cb) {
        // Membuat nama file unik agar tidak terjadi konflik
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
});

// Filter file (Hanya izinkan gambar)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg)') {
        cb(null, true);
    } else {
        cb(new Error('Hanya file gambar (jpeg, png, jpg) yang diizinkan!'));
    }
};

// Inisialisasi konfigurasi multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
});

export default upload;