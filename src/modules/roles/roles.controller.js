// import models from '../../config/mysql';
// const { Users, Roles } = models;

export const getRoles = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const getRole = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const createRole = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const editRole = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json(err);
    }
};

export const deleteRole = async (req, res) => {
    try {
        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(400).json(err);
    }
};
