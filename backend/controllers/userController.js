const User  = require('../models/userModel')
const jwt =require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const request_User = async(req, res)=> {
    const {email} = req.body;
    console.log(email)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            
            const transporter = nodemailer.createTransport({
                service: 'gmail', 
                auth: {
                    user: process.env.EMAIL_ID, 
                    pass: process.env.PASSWORD
                }
            });

            const registrationLink = `http://localhost:5174/register`;

            const mailOptions = {
                from: process.env.EMAIL_ID,
                to: email,
                subject: 'Complete Your Registration',
                html: `
                    <p>Hi Eshwarit,</p>
                    <p>Please click the link below to complete your registration:</p>
                    <a href="${registrationLink}">Complete Registration</a>
                    <p>If you have any questions or didn't request this, please let us know.</p>
                    <p>Thank you,</p>
                    <p>Bookbuddy</p>
                    <p>Sri Eshwar College of Engineering</p>
                `,};

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ success: false, msg: "Failed to send email" });
                } else {
                    return res.status(200).json({ success: true, msg: "Email sent successfully" });
                }
            });
        } else {
            // If user is found, send a success response
            return res.status(200).json({ msg: "User found", user });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
}


const register_User = async(req, res) => {
    const { user_id, username , email, password, contact_no, role} = req.body;
    const user = await User.findOne({email})
    try{
        if (user) return res.status(409).json({ msg: "Email already registered" });
        const newuser = new User({
            user_id,
            username,
            email,
            password,
            contact_no,
            role
        })

    
        await newuser.save()

        res.status(200).json({
            "status" : "Success",
            "message" : "User is Registerd successfully"
        })

        
    }catch(err){
        res.status(500).json({
            "status" : "failure",
            "message" : "User is not Registerd"
        })

        console.error(err);
    }
}

const login_User = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email : email });
    console.log(user)
    try{
        if (!user) return res.status(404).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });

        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET,
            { expiresIn: "2h" });


            res.json({
                status: 'success',
                message: 'Login is successful',
                token,
                role: user.role 
            });
    }
    catch(err){
        res.status(500).json({
            "status" : "failure",
            "message" : "User is not Logged In",
            "error" : err
        })
    }
}


module.exports = {register_User, login_User, request_User}

