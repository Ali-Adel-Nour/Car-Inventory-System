const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler')

const validateMongodbId = require('../config/valditeMongodb')

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the authorization header is present
  if (req?.headers?.authorization?.startsWith('Bearer ')) {
    token = req.headers?.authorization?.split(' ')[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);

        if (user) {
          req.user = user;
          next();
        } else {
          throw new Error('User not found');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      next(new Error('Not authorized. Please log in again.'));
    }
  } else {
    next(new Error('No token attached to the header'));
  }
});

const isAdmin = asyncHandler(async(req, res, next)=>{
  const {email} = req.user
  const isAdmin = await User.findOne({email:email})
  if(isAdmin.roles !== "admin"){
    throw new Error("You are not an Admin")
  }else{
    next()
  }
})

module.exports ={isAdmin,authMiddleware}