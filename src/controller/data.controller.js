const pool = require("../config/pg.database");
const Errorhandler = require("../utils/ErrorHandler");

exports.getAlldata = async (req,res, next) => {
  try {
    let result = await pool.query(`SELECT * FROM data`);
    let data = result.rows;

    if(result.rowCount == 0){
      data =  [{ id:0, users_email:"Email", create_at:"Date", title:"Title", data:"Message"}]
    }

    res.render("index", { data });
  } catch (error) {
    next(error);
  }
}


exports.createData = async (req,res, next) => {

  try {
    const {title,message, email} = req.body
    const check = await pool.query(`SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`,[email]);
    if(!check.rows[0].exists){
      throw new Errorhandler(404, `User ${email} Not Found`)
    };
  
    await pool.query(`INSERT INTO data (title, users_email, data) VALUES ($1, $2, $3) RETURNING *;`,
      [title, email, message]
    );
    res.redirect("/api")
  } catch (error) {
    next(error)
  }
}


exports.deleteData = async (req,res, next) => {
  try {
    const {del} = req.body
    await pool.query(`DELETE FROM users WHERE email = $1;`,[del])
    res.redirect("/api")
  } catch (error) {
    next(error)
  }
}