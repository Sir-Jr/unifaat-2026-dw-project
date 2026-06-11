export async function up(db) {
    await db.query(`
    CREATE TABLE courses (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      professor TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

export async function down(db) {
    await db.query(`
    DROP TABLE courses
  `)
}
