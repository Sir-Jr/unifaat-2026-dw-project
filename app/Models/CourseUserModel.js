import { DataTypes } from "sequelize";
import sequelize from "../../database/connections/sequelize.js";

const CourseUserModel = sequelize.define(
    "CourseUserModel",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        id_course: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        tableName: "course_user",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: false
    }
);

export default CourseUserModel;