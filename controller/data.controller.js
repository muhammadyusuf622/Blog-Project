const path = require("node:path");
const ForFiles = require("../helpers/function");
const dataPath = path.join(__dirname, "..", "data", "data.json");
const userPath = path.join(__dirname, "..", "data", "user.json");

const forDataFile = new ForFiles(dataPath);
const forUserFile = new ForFiles(userPath);

exports.getAlldata = (req,res) => {
  const data = forDataFile.readingFile
  res.render("index", {data:data})
}


exports.putData = (req,res) => {

  const {title,message, email} = req.body
  const allData = forUserFile.readingFile

  let foundEmail = allData.find(user => user.email == email)

  const today = new Date().toLocaleDateString("uz-UZ");
  
  const newData = {
    id: foundEmail.id,
    email:email,
    date:today,
    title:title,
    data:message
  }

  forDataFile.writeToFile(newData)

  const data = forDataFile.readingFile

  data.push(newData)

  res.render("index", {data:data})
}

exports.deleteData = (req,res) => {

  

  const {del} = req.body

  if(del){
    const oldData = forDataFile.readingFile;
    const oldUserData = forUserFile.readingFile;
  
    const data = oldData.filter(user => user.email != del);
    const userData = oldUserData.filter(user => user.email != del);
  
    forDataFile.putWreatFile(data);
    forUserFile.putWreatFile(userData);
  
  
    res.render("index", {data:data})
  }else{
    

    res.send("malubot keldi")
  }
}