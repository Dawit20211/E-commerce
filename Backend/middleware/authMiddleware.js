import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'

//protect routes 

const protect = asyncHandler (async (req,res, next) => {
    let token;

    //read the jwt from the coockie 
    token = req.cookies.jwt; // named it 'jwt' when storing it in the coockie

    if (token) { 
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password');
            next();

        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('not authorised, token failed ');
        }

    }else{
        res.status(401)
        throw new Error('not authorised, no token provided')
    }
});

//Admin middleware 
const admin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('You are not authorised as an admin');
    }
}

export {admin, protect}