var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')

router.post('/signup', userController.signUp);

router.post('/login', userController.logIn);

router.delete('/delete/:id', userController.delUser);

router.get("/find", userController.userFind)

module.exports = router;
