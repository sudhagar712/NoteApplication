const express = require('express')
const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()


// ..........................Api for Signup..............................
router.post('/signup', async(req,res)=>{
    try {
        const{name , email , password} = req.body
        const user = await User.findOne({email})
        if(user){
          res.status(400).json({message: 'Email ID Already Exist', success: 'false'})
        }
        const harshPassword = await bcrypt.hash(password,10)
       
        const newUser = new User({
            name,
            email,
            password: harshPassword
        })
      const SavedUser = await newUser.save()

      res.status(201).json({success:'true', message: "User Created Successfully", SavedUser })


        
    } catch (error) {
         res.status(500).json({success:'false', message: "error user is not created" })
    }

})


//................................ Api for Login..............................................

router.post('/login', async(req,res)=> {
     try {
      const {email , password} = req.body
      const user = await User.findOne({email})
      if(!user){
        res.status(404).json({success:'false', message: "User Not Found"})
      }

      const checkPassword = await bcrypt.compare(password, user.password)

      if(!checkPassword){
        res.status(404).json({message: "Password Does'Not Match"})
      }

      const token =  jwt.sign({id:user._id}, process.env.SECRETKEY , {expiresIn: "5hr"} )

      res.status(200).json({success:"true", token, user: {name: user.name} ,message: "Login Successfull"})

     } catch (error) {

       res.status(500).json({success:"false", message: "Login Not Successfull"})
      
     }
})





















module.exports = router