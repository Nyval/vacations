const express = require('express');
const {db} = require('../connection');
const router = express.Router();
const Joi = require('joi');
const {log} = require('../helper');

//----------------FOLLOW-VACATIONS-----------------
//#region follow vacation comments
//First the function check if the vacation already exist.
//Second if the vacation not exist, we add the vacation to the user.
//#endregion
router.post('/', (req, res)=>{   // add a record to users_vacations
    const schema = Joi.object({
        user_id:Joi.number().required(),
        vacation_id:Joi.number().required(),
    });
    let userVacation = req.body;
    let validationResult = schema.validate(userVacation);
 
    if(validationResult.error) return res.send(validationResult.error.message);
    
    new Promise((resolve, reject)=>{
        let sqlSelect = "SELECT * FROM users_vacations WHERE user_id = ? AND vacation_id = ?";
        db.query(sqlSelect, [userVacation.user_id, userVacation.vacation_id], (error, result)=>{
            if(error) reject(error);
            log('result' , result);
            if(result.length) reject("Vacation already followed");
            resolve();
        })
    })
    .then(()=>{
        let sqlInsert = "INSERT INTO users_vacations SET ?";
        db.query(sqlInsert, userVacation, (error, result)=>{
            if(error) throw(error);
            if(!result.affectedRows) throw("Error while insert new vacation to DB");
            return res.send("followed successfully!");
        });
    })
    .catch((errMsg)=>{
        log(errMsg);
        return res.send(errMsg);
    });
});

router.delete('/:user_id/:vacation_id', (req, res)=>{   // remove a record from users_vacations
    const schema = Joi.object({
        user_id:Joi.number().required(),
        vacation_id:Joi.number().required(),
    });
    let validationResult = schema.validate(req.params);
    if(validationResult.error) return res.send(validationResult.error.message);
    
    let sql = "DELETE FROM users_vacations WHERE user_id = ? AND vacation_id = ?";

    db.query(sql, [req.params.user_id , req.params.vacation_id], (error, result)=>{
        if(error) throw error;
        
        if(result.affectedRows) return res.send("unfollowed successfully");
        return res.send("No vacation found!");
    });
});

module.exports = router;