import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/image-products');
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
            const err = new Error();
            err.code = 'filetype';
            return cb(err);
        }
        const typeFile = file.originalname.split('.')[file.originalname.split('.').length - 1];
        const nameFile = file.originalname.replace(`.${typeFile}`, '');
        cb(null, `${nameFile}-${Date.now()}.${typeFile}`);
    },
});

const uploadFile = multer({
    storage,
    // fileFilter: (req, file, callback) => {
    //     const ext = path.extname(file.originalname);
    //     if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    //         return callback(req.end('Only images are allowed'), null)
    //     }
    // },
    limits: {
        fileSize: 8000000, // 8MB
    },
}).single('images');

export default uploadFile;

