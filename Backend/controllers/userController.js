import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import generatToken from '../utils/generateToken.js';

//@desc Auth user & get token
//@route  POST /api/users/login
//access Public 
const authUser = asyncHandler(async (req, res)=>{
    
    //deconstract the email and password from the body
    const {email, password} = req.body;

    //check if we have a user. 
    const user = await User.findOne({email: email});
    
    if (user && (await user.matchPassword(password))){

       generatToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin 
        });

    }else{
        res.status(401)
        //dont want to let them know which one is wrong in the message 
        throw new Error('Invalid email or password')
    }

    res.json('auth user')

})

//@desc Register User
//@route  POST /api/users
//access Public 
const registerUser = asyncHandler(async (req, res)=>{
   const { name, email, password } = req.body;

   const userExists = await User.findOne({email: email})

   if(userExists){
    res.status(400) //client error 
    throw new Error ('User already exists');
   }

   const user = await User.create({
    name,
    email,
    password
   })

   if (user)
   {
    generatToken(res, user._id);

    res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
    })
   }else{
    res.status(400);
    throw new Error('Invalid user data provided')
   }
})

//@desc Logout user / clear cookie
//@route  POST /api/logout
//access Private
const logoutUser = asyncHandler(async (req, res)=>{
   res.cookie('jwt', '', {
    httpOnly:true,
    expires: new Date (0)
    });
    res.status(200).json({meesage: 'Logged out!'})
});




//@desc  Get user profile 
//@route POST /api/logout
//access Private
const getUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('user not found')
    }

})



//@desc Update user profile (user will update their profile using their token)
//@route  GRT /api/users/profile
//access Private
const updateUserProfile = asyncHandler(async (req, res)=>{
    
    const user = await User.findById(req.user._id);

    if (user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('user not found')
    }

})


//@desc   Get users
//@route  Get /api/users
//access  Private/Admin
const getUsers = asyncHandler(async (req, res)=>{
    res.json('get all users')

})

//@desc   Get user by ID
//@route  Get /api/users/:id
//access  Private/Admin
const getUserByID = asyncHandler(async (req, res)=>{
    res.json('get user by id')

})


//@desc   Delete users
//@route  DELETE /api/users/:id
//access  Private/Admin
const deleteUser = asyncHandler(async (req, res)=>{
    res.json('delete user')

})

//@desc   Update user (admin will update any user)
//@route  PUT /api/users/:id
//access  Private/Admin
const updateUser = asyncHandler(async (req, res)=>{
    res.json('update user')

})

export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserByID,
    updateUser
}
