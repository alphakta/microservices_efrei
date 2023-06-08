import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("mysql://root:Asko94190@localhost:3306/microservice-category");

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

sequelize.sync();

export default Category;
