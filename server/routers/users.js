const express = require('express');
const {db} = require('../connection');
const router = express.Router();
const Joi = require('joi');
// const {log, sqlResults} = require('../helper');

router.post('/',(req, res)=>{
    const schema = Joi.object({
        name:Joi.string().min(2).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(4).required(),
    });
    let user = req.body;
    let validationResult = schema.validate(user);

    if(validationResult.error) return res.send(validationResult.error.message);

    let sql = "INSERT INTO `users` SET ?";
    let query = db.query(sql, user, (error, result)=>{
        if(error) throw error;
        
        res.send("New user has been added");
    });
});
//10/email/pass
router.delete('/:user_id/:user_email/:user_password', (req, res)=>{
    if (req.params.user_id != req.query.user_id) return res.send('User can delete only himself!');
    const schema = Joi.object({
        user_id:Joi.number().greater(0).required(),
        user_email:Joi.string().email().required(),
        user_password:Joi.string().min(4).required(),
    });
    let userInfo = req.params;
    let validationResult = schema.validate(userInfo);
    
    if(validationResult.error) return res.send(validationResult.error.message);
    
    let sql = "SELECT id FROM users WHERE email=? AND password=?";
    let sqlDeleteUser = 'DELETE FROM users WHERE id = ?';
    
    db.query(sql, [userInfo.user_email, userInfo.user_password], (error, results)=>{
        if(error) throw error;

        let result = sqlResults(results, true); // ??
        
        if (result && result.id == userInfo.user_id){
            db.query(sqlDeleteUser, [userInfo.user_id], (error, result)=>{
                if(error) throw error;
                res.send({
                    success:true,
                    msg:'The user has been deleted'
                });
            });
        }
        else
            res.send({
                success:false,
                msg:'incorrect details'
            });
        });
});

module.exports = router;

// H.W use Joi here