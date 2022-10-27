module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("user", {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        createdAt: {
            type: DataTypes.DATE
          },
        updatedAt: {
            type: DataTypes.DATE
        }
    
    })

    return Product

}