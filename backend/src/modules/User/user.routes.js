const express = require('express');
const router = require('express').Router();
const {getUserProfile, updateUserProfile} = require('./user.controller');
const authMiddleware = require('../../middleware/authMiddleware');


router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;