export async function up(db) {
    await db.query(`
    CREATE TABLE course_user (
      id SERIAL PRIMARY KEY,
      id_user INTEGER NOT NULL REFERENCES users(id),
      id_course INTEGER NOT NULL REFERENCES courses(id),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function down(db) {
    await db.query(`
    DROP TABLE course_user
  `)
}
