const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userschema = new mongoose.Schema({
    user_id : {
        type: String,
        required: true,
        unique: true
    },
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        enum :["Incharge", "Student", "Admin", "Staff"],
        required: true
    },
    contact_no :{
        type: String,
        required: true 
    }
})

userschema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

module.exports = mongoose.model('User', userschema)