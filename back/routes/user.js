const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try{
        const beforeEmail = await User.findOne({
            where:{
                email: req.body.email
            }
        });

        if(beforeEmail){
            return res.status(403).send("이미 이메일이 사용중입니다.");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword
        });
        res.status(200).send('ok');
    } catch(error){
        next(error);
    }
}) //POST /user/

module.exports = router;