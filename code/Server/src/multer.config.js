import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd()+"/src/uploads/");  // Asegúrate de que el directorio uploads existe en tu servidor
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExtension}`;
        cb(null, uniqueSuffix);
    }
});
const upload = multer({ storage: storage });

export default upload;

