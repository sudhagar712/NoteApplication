const jwt = require('jsonwebtoken')
const User = require('../models/users')

const middleWare = async(req,res,next) => {
     try {
        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            return res.status(401).json({success:'false', message: 'unauthorized'})
        }

        const decoded = jwt.verify(token , process.env.SECRETKEY)

        if(!decoded){
            res.status(401).json({message: 'wrong Token'})
        }

        const user = User.findById({_id: decoded.id})

        if(!user){
            res.status(404).json({message: 'no User found'})
        }
        
     
        const newUser =  {name: user.name , id: user._id}
        req.user = newUser

        next()


     } catch (error) {
         res.status(500).json({message: 'Internal server Error', error})
     }
}



module.exports = middleWare