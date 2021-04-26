import User from './../models/User'
import Role from "../models/Role";

import config from './../config'

import log from './../utils/logger'



import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body
    console.log(req.body)

    const newUser =  new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if (roles){
       const foundRoles =  await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)

    } else {
        const role = await Role.findOne({name: 'user'})
        newUser.roles = [role._id]
    }

    console.log(newUser)

    const savedUser =  await newUser.save()

    const access_token = jwt.sign({id: savedUser._id}, config.SECRET, {expiresIn: 24 * 60 * 60})

    res.json({access_token: access_token})

    console.log(savedUser)
}
export const signIn = async (req, res) => {

    const userFound = await User.findOne({email: req.body.email}).populate('roles')

    if(!userFound) return res.status(400).json({messagge: 'User not found'})

    const matchPassword =  await User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: 'Invalid Password'})

    const access_token = jwt.sign({id: userFound._id}, config.SECRET, {expiresIn: 24 * 60 * 60})


    res.json({access_token: access_token })

}
