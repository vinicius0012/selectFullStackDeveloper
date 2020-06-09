const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Post = require('../models/Post');

const connection = new Sequelize(dbConfig)

User.init(connection); 
Post.init(connection); 

Post.associate(connection.models);
User.associate(connection.models);

module.exports = connection;