const pool = require("../config/pg.database");


async function createTable(){

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS data (id SERIAL PRIMARY KEY,
      users_email VARCHAR(255),
      CONSTRAINT fk_user_email FOREIGN KEY (users_email) REFERENCES users(email) ON DELETE CASCADE,
      create_at TIMESTAMP DEFAULT NOW(),
      title TEXT,
      data TEXT
      );
      `);
    return "Database'da jadvallar yaratildi ✅";
  } catch (error) {
    throw new Error("Jadval yaratishda xatolik⚠️");
  }
}

module.exports = createTable