import multer from 'multer';
import { Promise } from 'sequelize';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/image-products');
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
            const err = new Error();
            err.code = 'FILE_TYPE';
            return cb(err);
        }
        const arrType = file.originalname.split('.');
        const typeFile = arrType[arrType.length - 1];
        const nameFile = file.originalname.replace(`.${typeFile}`, '');
        return cb(null, `${nameFile}-${Date.now()}.${typeFile}`);
    },
});

const uploadFile = multer({
    storage,
    limits: {
        fileSize: 8000000, // 8MB
    },
}).single('images');

export const errorUpload = (err) => (
    new Promise((resolve, reject) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                reject(new Error('File size is too large. Max limit is 8MB'));
            } else if (err.code === 'FILE_TYPE') {
                reject(new Error('File type is invalid. Must be .png,.jpg,.jpeg,.gif,.svg'));
            }
            reject(new Error('File was not able to be uploaded !'));
        }
    })
);

export default uploadFile;

