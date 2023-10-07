import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Fungsi untuk menghasilkan nama file yang unik
const generateFileName = (req, file, cb) => {
  req['article_uuid'] = uuidv4(); // Simpan UUID destinasi di request object
  const filename = `${req['article_uuid']}.jpg`;
  cb(null, filename);
};

// Fungsi untuk memvalidasi jenis file yang diterima
const fileFilter = (req, file, cb) => {
  // Fungsi ini akan dipanggil saat file diunggah
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // Validasi file yang diterima
    cb(null, true); // Terima file
  } else {
    // Tolak file yang tidak sesuai format
    cb(null, false); // Tolak file tanpa kesalahan, tanpa menampilkan pesan kesalahan di sini
  }
};

// Kemudian, Anda dapat menggunakannya dalam konfigurasi FileInterceptor
const fileUploadOptions = {
  storage: diskStorage({
    destination: './public/images/articles',
    filename: generateFileName,
  }),
  fileFilter: fileFilter,
};

export default fileUploadOptions;
