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
        const arrType = file.originalname.split('.');
        const typeFile = arrType[arrType.length - 1];
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

export const errorUpload = (res, err) => (
    new Promise((resolve, reject) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                reject({success: false, message: 'File size is too large. Max limit is 8MB'});
            } else if (err.code === 'filetype') {
                reject({success: false, message: 'File type is invalid. Must be .png,.jpg,.jpeg,.gif,.svg'});
            }
            reject({success: false, message: 'File was not able to be uploaded !'});
            return res.status(400).json({success: false, message: ''});
        }
    })
);

export default uploadFile;

