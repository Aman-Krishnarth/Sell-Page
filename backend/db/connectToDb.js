const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/cloudinaryPractice").then((res)=>{
    console.log("DB CONNECTED SUCCESSFULLY")
})
.catch((err)=>{
    console.log("DB CONNECTION ERROR")
})