import jwt from 'jsonwebtoken'
import config from "../config";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
   try {
       const access_token =  req.headers["x-access-token"]

       console.log(access_token)

       if (!access_token) return res.status(403).json({messagge: "No token provided"})

       const decoded =  jwt.verify(access_token, config.SECRET, {expiresIn: 24 * 60 * 60})
       console.log(decoded)

       req.userId = decoded.id ;

       const user =  await User.findById(req.userId, {password: 0})
       if(!user) return res.status(404).json({messagge: 'user not found'})

       next()
         
   } catch (error){
       console.log(error)
   }
}
