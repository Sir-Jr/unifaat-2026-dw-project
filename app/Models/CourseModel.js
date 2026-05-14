import { DataTypes } from "sequelize";
import sequelize from "../../database/connections/sequelize.js";

const CourseModel = sequelize.define(
    "CourseModel",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        professor: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        tableName: "courses",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export default CourseModel;