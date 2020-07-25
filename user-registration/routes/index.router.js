const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user.controller');
router.post('/users', userCtrl.addUser);
router.get('/users', userCtrl.getAllUser);
router.get('/users/:id', userCtrl.getUser);
router.delete('/users/:id', userCtrl.deleteUser);

module.exports = router;
