const fs = require("fs")
const path = require("path")

const mainfolder  = path.join(__dirname,"mainfolder")
const subfolder1  = path.join(mainfolder,"subfolder1")
const subfolder2  = path.join(mainfolder,"subfolder2")
const filePath  = path.join(subfolder2,"hello.txt")


//Create folder
fs.mkdirSync(mainfolder,{recursive:true})
fs.mkdirSync(subfolder1,{recursive:true})
fs.mkdirSync(subfolder2,{recursive:true})

fs.writeFileSync(filePath,"Hello World Again","utf-8")

//Remove folder and file
// fs.unlinkSync(filePath)
// fs.rmdirSync(subfolder1)
// fs.rmdirSync(subfolder2)
// fs.rmdirSync(mainfolder)

//Read Direcotry with files Details
// fs.readdir(mainfolder,{withFileTypes:true},(err,files)=>{
//     if(err){
//         throw err;
//     }
//     files.forEach((file)=>{
//         console.log(file.name); //file or folder name
//         console.log(file.isFile()); //true or false
//         console.log(file.isDirectory()); //true or false
//     }   )
// }   )