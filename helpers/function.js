const fs = require("node:fs");
const path = require("node:path");
const { json } = require("node:stream/consumers");

class ForFiles {
  constructor(newPath){
    this.filePath = newPath
  }

  get readingFile(){

    try{
      const data = fs.readFileSync(this.filePath, "utf8");

      return JSON.parse(data) || ["Bu Blog"]
    } catch (error){
      return [ { id:0,email:"Email",date:"Date",title:"Title",data:"Message"}]
    }
  }
  writeToFile(newData){

    fs.readFile(this.filePath, "utf8", (err,data) => {

      if(err){
        console.error("file o'qishda xatolik 2")
      }

      if(!data){
        data = [];
      }else{
        data = JSON.parse(data);
      }
      
      data.push(newData)

      fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf8", (err) => {

        if(err){
          console.error("dara yozishda xatolik");
        }else{
          console.log("file mufoqyatli yoziuldi");
        }
      });
    });
  }


  putWreatFile(data){

    fs.writeFile(this.filePath, JSON.stringify(data, null, 2), "utf8", (err) => {

      if(err){
        console.error("kotta fileni o'qishda xatolik")
      }else{
        console.log("kotta fileni yozish mufoqyatli bo'ldi")
      }
    });
  }
}

module.exports = ForFiles;