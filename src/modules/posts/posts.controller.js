import models from '../../config/mysql';

const Posts = models.Posts;

export const getProducts = async (req, res) => {
    try {
        const listPosts = await Posts.findAll({
            limit: 2,
        });
        return res.status(200).json(listPosts);
    } catch (err) {
        return res.status(400).json({error: String(err)});
    }
};
