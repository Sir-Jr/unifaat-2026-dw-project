import AddressModel from "../app/Models/AddressModel.js";
import UserModel from "../app/Models/UserModel.js";
import CourseModel from "../app/Models/CourseModel.js";
import CourseUserModel from "../app/Models/CourseUserModel.js";

export default function initRelations() {
    UserModel.hasMany(AddressModel, {
        foreignKey: "id_user",
        as: "addresses"
    });

    AddressModel.belongsTo(UserModel, {
        foreignKey: "id_user",
        as: "user"
    });

    UserModel.belongsToMany(CourseModel, {
        through: CourseUserModel,
        foreignKey: "id_user",
        otherKey: "id_course",
        as: "courses"
    });

    CourseModel.belongsToMany(UserModel, {
        through: CourseUserModel,
        foreignKey: "id_course",
        otherKey: "id_user",
        as: "users"
    });
}