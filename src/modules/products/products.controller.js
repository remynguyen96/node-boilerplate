import { Op } from 'sequelize';
import models from '../../config/mysql';
import UploadFile, { errorUpload } from '../../utils/upload';

const { Products, Users } = models;
export const addProducts = async (req, res) => {
    try {
        UploadFile(req, res, async (err) => {
            await errorUpload(err);
            const dataProduct = req.body;
            dataProduct.images = null;
            if (req.file) {
                dataProduct.images = req.file.filename;
            }
            await Products.create(dataProduct);
            return res.status(200).json({ success: true });
        });
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getProducts = async (req, res) => {
    try {
        const listProducts = await Products.findAll({
            limit: 5,
            order: [
                ['id', 'DESC'],
            ],
            include: [{
                model: Users,
                required: false,
                where: { id: { [Op.gt]: 1 } },
            }],
        });
        return res.status(200).json(listProducts);
    } catch (err) {
        return res.status(400).json({ error: String(err) });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        return res.status(200).json(product);
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const editProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const editProduct = await Products.findById(id);
        Object.keys(req.body).forEach((key) => {
            editProduct[key] = req.body[key];
        });
        return res.status(200).json(await editProduct.save());
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const removeProducts = async (req, res) => {
    try {
        const { id } = req.params;
        await Products.destroy({ where: { id } });
        return res.status(200).json({ status: 'successful' });
    } catch (err) {
        return res.status(400).json(err);
    }
};
