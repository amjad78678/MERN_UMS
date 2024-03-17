import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'userImages'));
  },
  filename: (req, file, cb) => {
    const name = Date.now() + '-' + file.originalname;   
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

export { storage, upload };
