import bcrypt from 'bcrypt'

const users = [
    { name: 'Alice Souza', email: 'alice.souza@example.com', password: 'senha123' },
    { name: 'Bruno Lima', email: 'bruno.lima@example.com', password: 'senha123' },
    { name: 'Carla Mendes', email: 'carla.mendes@example.com', password: 'senha123' },
    { name: 'Daniel Alves', email: 'daniel.alves@example.com', password: 'senha123' },
    { name: 'Elisa Rocha', email: 'elisa.rocha@example.com', password: 'senha123' }
]

const courses = [
    { name: 'Infraestrutura', professor: 'Alexandre' },
    { name: 'Banco de Dados', professor: 'Gustavo' },
    { name: 'Desenvolvimento Web', professor: 'Luan' },
    { name: 'Programação', professor: 'Mariana' },
    { name: 'Redes de Computadores', professor: 'Fabiana' }
]

const addresses = [
    {
        userEmail: 'alice.souza@example.com',
        name: 'Rua das Flores, 123',
        district: 'Centro',
        city: 'São Paulo'
    },
    {
        userEmail: 'bruno.lima@example.com',
        name: 'Avenida Paulista, 456',
        district: 'Bela Vista',
        city: 'São Paulo'
    },
    {
        userEmail: 'carla.mendes@example.com',
        name: 'Travessa do Sol, 78',
        district: 'Jardim',
        city: 'Campinas'
    }
]

const userCourses = [
    { userEmail: 'alice.souza@example.com', courseName: 'Infraestrutura' },
    { userEmail: 'alice.souza@example.com', courseName: 'Banco de Dados' },
    { userEmail: 'bruno.lima@example.com', courseName: 'Desenvolvimento Web' },
    { userEmail: 'bruno.lima@example.com', courseName: 'Banco de Dados' },
    { userEmail: 'carla.mendes@example.com', courseName: 'Infraestrutura' },
    { userEmail: 'daniel.alves@example.com', courseName: 'Programação' },
    { userEmail: 'daniel.alves@example.com', courseName: 'Desenvolvimento Web' },
    { userEmail: 'elisa.rocha@example.com', courseName: 'Redes de Computadores' },
    { userEmail: 'elisa.rocha@example.com', courseName: 'Programação' }
]

export default async function seed(postgres) {
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10)

        await postgres.query(
            `INSERT INTO users (name, email, password, created_at, updated_at)
             VALUES ($1, $2, $3, NOW(), NOW())
             ON CONFLICT (email) DO NOTHING`,
            [user.name, user.email, hashedPassword]
        )
    }

    for (const course of courses) {
        await postgres.query(
            `INSERT INTO courses (name, professor, created_at, updated_at)
             SELECT $1, $2, NOW(), NOW()
             WHERE NOT EXISTS (
               SELECT 1 FROM courses WHERE name = $1 AND professor = $2
             )`,
            [course.name, course.professor]
        )
    }

    for (const address of addresses) {
        const userResult = await postgres.query(
            'SELECT id FROM users WHERE email = $1',
            [address.userEmail]
        )

        if (userResult.rows.length === 0) {
            throw new Error(`Usuário não encontrado: ${address.userEmail}`)
        }

        const userId = userResult.rows[0].id

        await postgres.query(
            `INSERT INTO addresses (id_user, name, district, city, created_at, updated_at)
             SELECT $1, $2, $3, $4, NOW(), NOW()
             WHERE NOT EXISTS (
               SELECT 1 FROM addresses WHERE id_user = $1 AND name = $2 AND district = $3 AND city = $4
             )`,
            [userId, address.name, address.district, address.city]
        )
    }

    for (const entry of userCourses) {
        const userResult = await postgres.query(
            'SELECT id FROM users WHERE email = $1',
            [entry.userEmail]
        )
        const courseResult = await postgres.query(
            'SELECT id FROM courses WHERE name = $1',
            [entry.courseName]
        )

        if (userResult.rows.length === 0) {
            throw new Error(`Usuário não encontrado: ${entry.userEmail}`)
        }

        if (courseResult.rows.length === 0) {
            throw new Error(`Curso não encontrado: ${entry.courseName}`)
        }

        const userId = userResult.rows[0].id
        const courseId = courseResult.rows[0].id

        await postgres.query(
            `INSERT INTO course_user (id_user, id_course, created_at)
             SELECT $1, $2, NOW()
             WHERE NOT EXISTS (
               SELECT 1 FROM course_user WHERE id_user = $1 AND id_course = $2
             )`,
            [userId, courseId]
        )
    }
}
