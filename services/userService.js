const pool = require("../database");
const bcrypt = require('bcryptjs');

const UserService = {
  async createUser(email, password){
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    return result.rows[0];
  },

  async getUserById(userId) {
    const result = await pool.query('SELECT * FROM users WHERE users_id = $1',[userId]);
    return result.rows[0];
  },

  async getAllUsers(){
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  },

  async updateUser(userId, email, password){
    const hashedPassword = bcrypt.hash(password,10);
    const result = await pool.query('UPDATE users SET email = $1, password = $2 WHERE user_id = $3 RETURNING *',[email, hashedPassword, userId]);
    return result.rows[0];
  },

  async deleteUser(userId) {
    const result = await pool.query('DELETE FROM users WHERE users_id = $1 RETURNING *', [userId]);
    return result.rows[0];
}
};



module.exports = UserService;