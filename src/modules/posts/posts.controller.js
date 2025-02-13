import models from '../../config/mysql';

const { Posts, Users } = models;

export const getPosts = async (req, res) => {
    try {
        const listPosts = await Posts.findAll({
            limit: 5,
        }, {
            include: Users,
        });
        return res.status(200).json(listPosts);
    } catch (err) {
        return res.status(400).json({ error: String(err) });
    }
};
