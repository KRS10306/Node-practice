const { isUtf8 } = require('buffer');
const fs = require('fs');
const path = require('path');

const dataFolder = path.join(__dirname, "data")

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder)
    console.log("Done")
}

const filePath = path.join(dataFolder, "example.txt")

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'Hello World')
    console.log("File made")
}

// const readContent = fs.readFileSync(filePath,"utf8")
// console.log(readContent)

// fs.appendFileSync(filePath, "\nThis is a new line added later")
// console.log("File appended")

const asyncFilePath = path.join(dataFolder, "async.txt")
fs.writeFile(asyncFilePath, "Hello async", (err)=>{
    if(err) throw err;
    console.log("Created Async")

    fs.appendFile(asyncFilePath, "\nThis is a neww linee", err =>{
        if (err) {
            throw err
        }
        console.log("Appended data in async.txt")
    })

    fs.readFile(asyncFilePath, "utf8", (err,data)=>{
        if (err) throw err
        console.log("Data inside async.txt -->" ,data)
    })
})