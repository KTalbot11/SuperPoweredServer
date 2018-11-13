module.exports = function ( sequelize, DataTypes) {
    return sequelize.define('power', {
        owner: {
            type: DataTypes.STRING,
          
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}