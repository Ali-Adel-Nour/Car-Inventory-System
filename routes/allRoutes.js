const express = require('express');

const {registerAUser,loginUser} = require('../controllers/userCont')
const{createAStore} = require('../controllers/storeCont')
const { isAdmin, authMiddleware } = require('../middleware/authMiddleware');

const allRouter = express.Router()

//User
allRouter.post("/register",registerAUser)

allRouter.post('/login', loginUser)


//Store

allRouter.post('/store',authMiddleware,isAdmin,createAStore)
//allRouter.get('/store',isAdmin,authMiddleware,getA)
module.exports = allRouter