const Post = require('../models/Post')
const User = require('../models/User')

module.exports = {
    //list
    async index(req, res) {
        const posts = await Post.findAll();
        return res.json(posts)
    },
    //create
    async store(req, res) {
        const { user_id } = req.params;
        const { title, description, date } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        const post = await Post.create({ title, description, date, user_id })
        return res.json(post)
    },
    // find by id user
    async findByUser(req, res) {
        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {
            include: { association: 'posts' }
        });

        return res.json(user.posts)
    },
    // find by id user
    async delete(req, res) {
        const { post_id } = req.params;

        const posts = await Post.destroy({
            where: {
                id: post_id
            }
        })

        return res.json(posts)
    },

    async update(req, res) {
        const { post_id } = req.params;
        const { title, description, date } = req.body;

        const posts = await Post.update({
            title, description, date
        }, {
            where: {
                id: post_id
            }
        })

        return res.json(posts)
    }
}