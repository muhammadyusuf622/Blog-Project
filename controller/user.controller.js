const path = require("node:path");
const ForFiles = require("../helpers/function");
const userPath = path.join(__dirname, "..", "data", "user.json");

const forUserFile = new ForFiles(userPath);

exports.loginSetup = (req,res) => {

  const {name, email} = req.body  
  const data = forUserFile.readingFile

  let foundUser = data.find(user => user.email == email)

  if(foundUser){
    res.send(`<script>alert("Bu emaildan foydalanilyabdi!"); window.history.back();</script>`);
    return
  }

  const id = data.at(-1)?.id + 1 || 1;

  const user = {
    id:id,
    name,
    email
  }
  forUserFile.writeToFile(user);
  res.render("wordEnter", {email})
}