const { Model, DataTypes } = require('sequelize')

class Post extends Model {
    static init(sequelize){
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            date: DataTypes.DATE,
        }, {
            sequelize
        })
    }

    static associate(models){
        this.belongsTo(models.User, {
            foreignKey:'user_id', as:'user'
        })
    }
}

module.exports = Post;