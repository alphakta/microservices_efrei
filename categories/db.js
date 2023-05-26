import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("mysql://root:root@localhost:3306/microservice-category");

const Category = sequelize.define("categories", {
    idCategory: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Category;
