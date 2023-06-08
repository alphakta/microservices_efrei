import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("mysql://root:Asko94190@localhost:3306/microservice-authors");

const Authors = sequelize.define("authors", {
    idAuthor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

sequelize.sync();

export default Authors;
