const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.URL)
    .then(()=>{
        console.log("Connected to DB")
    }).catch(err=>console.log(err))
}

module.exports = connectToDB