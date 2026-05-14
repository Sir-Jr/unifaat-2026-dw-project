import UserModel from "../../Models/UserModel.js";

export default async function CreateUserController(request, response) {
    try {
        const { name, email } = request.body;

        const error = [];

        if (!name) {
            error.push("name obrigatório!");
        }

        if (!email) {
            error.push("email obrigatório!");
        }

        if (error.length > 0) {
            return response.status(400).json({ error: error });
        }

        const user = await UserModel.create({
            name: name,
            email: email
        });

        return response.status(201).json(user);
    } catch (error) {
        console.error(error);

        if (error.name === "SequelizeUniqueConstraintError") {
            return response.status(409).json({
                error: error.errors[0].message
            });
        }

        return response.status(500).json({
            error: "Internal server error"
        });
    }
}