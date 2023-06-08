import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("mysql://root:Asko94190@localhost:3306/microservice-books");

const Books = sequelize.define("books", {
    idBook: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

sequelize.sync();

export default Books;
