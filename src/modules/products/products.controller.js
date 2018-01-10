import models from '../../config/mysql';
import UploadFile from '../../config/upload';

const Products = models.Products;

export async function addProducts(req, res) {
    try {
        UploadFile(req, res, async (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({success: false, message: 'File size is too large. Max limit is 8MB'})
                } else if (err.code === 'filetype') {
                    return res.status(400).json({
                        success: false,
                        message: 'File type is invalid. Must be .png,.jpg,.jpeg,.gif,.svg'
                    })
                }
                return res.status(400).json({success: false, message: 'File was not able to be uploaded !'});
            }
            const dataProduct = req.body;
            dataProduct.images = null;
            if (req.file) {
                dataProduct.images = req.file.filename;
            };
            await Product.create(dataProduct);
            return res.status(200).json({success: true});
        });
    } catch (err) {
        return res.status(400).json(err);
    }
}

export const getProducts = async (req, res) => {
    try {

        const listProducts = await Products.findAll({
            limit: 2
            // include: [ models.User ]
        });
        console.log(Products.testClass());
        console.log(Products.Instance);
        return res.status(200).json(listProducts);
    } catch (err) {
        return res.status(400).json({error: String(err)})
    }
}

export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        // method1: const product = await Product.findOne({
        //     where: {id: id}
        // });
        const product = await Products.findById(id);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export async function editProducts(req, res) {
    try {
        const id = req.params.id;
        const editProduct = await Products.findById(id);
        Object.keys(req.body).forEach((key) => {
            editProduct[key] = req.body[key];
        });
        return res.status(200).json(await editProduct.save());
    } catch (err) {
        return res.status(400).json(err);
    }
}

export async function removeProducts(req, res) {
    try {
        const id = req.params.id;
        await Products.destroy({where: {id: id}});
        return res.status(200).json({'status': 'successful'});
    } catch (err) {
        return res.status(400).json(err);
    }
}




