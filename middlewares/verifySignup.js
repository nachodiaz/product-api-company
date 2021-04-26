import User from "../models/User";


export const verifyUserExists = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (user) return res.status(400).json({messagge: 'The user already exist'})

        const email = await User.findOne({email: req.body.email})
        if (email) return res.status(400).json({messagge: 'The email already exist'})

        next();
    } catch (error) {
        console.log(error)
    }

}
