const pool = require("../config/pg.database");

exports.loginSetup = async (req,res, next) => {
  try {
    const {name, email} = req.body  

    const check = await pool.query(`SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`,[email]);
  
    if(check.rows[0].exists){
      res.send(`<script>alert("Bu emaildan foydalanilyabdi!"); window.history.back();</script>`);
      return
    }
    await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2)`,
      [name, email]
    )
    res.render("wordEnter", {email})
  } catch (error) {
    next(error);
  }
}
