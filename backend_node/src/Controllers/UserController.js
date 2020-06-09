const User = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    //list
    async index(req, res) {
        const users = await User.findAll();
        return res.json(users)
    },
    //create
    async store(req, res) {
        const { name, email, password } = req.body;

        const passwordHash = bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(8),
            null
        );
        let newPassword = passwordHash;

        const users = await User.findOne({
            where: {
                name: name
            }
        });

        if (users) {
            return res
                .status(400)
                .send({ error: "User already registered" });
        }

        const user = await User.create({ name, email : name, password: newPassword })

        return res.json(user)
    },

    async delete(req, res) {
        const { user_id } = req.params;

        const users = await User.destroy({
            where: {
                id: user_id
            }
        })

        return res.json(users)
    },

    async update(req, res) {
        const { user_id } = req.params;
        const { name, email } = req.body;

        const users = await Post.update({
            name, email
        }, {
            where: {
                id: user_id
            }
        })

        return res.json(users)
    },

    async login(req, res) {
        const { name, password } = req.body;
        if (!name || !password) {
            return res
                .status(500)
                .send({ error: "Fill in the Email and password correctly" });
        }

        const users = await User.findOne({
            where: {
                name: name
            }
        });

        if (!users) {
            return res
                .status(400)
                .send({ error: "User not found" });
        }

        if (!(await bcrypt.compare(password, users.password)))
            return res.status(500).send({ error: "Invalid password" });

        const token = jwt.sign({ id: users.id },"05081988supersecret", {
            expiresIn: 86400
        }); 

        return res.status(200).json({ token, id : users.id, });
    }
}