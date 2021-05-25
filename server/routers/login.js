
const express = require('express');
const {db} = require('../connection');
const router = express.Router();
const Joi = require('joi');
const {log, sqlResults} = require('../helper');

//-----------------HELPERS-----------------
router.post('/',(req, res)=>{
    let respObj = {};
    console.log({body:req.body, query:req.query, params:req.params});
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).required(),
    });
    let loginDetails = req.body;
    let validationResult = schema.validate(loginDetails);

    if(validationResult.error){
        respObj = {
            success:false,
            msgError:validationResult.error.message
        };
        return res.send(respObj);
    }
    
    let email = req.body.email
    let password = req.body.password
    
    let sql=`SELECT users.id, users.name, users.admin AS isAdmin, users.email, IF(u.password != '',1,0) AS currect_password 
             FROM users
             LEFT JOIN users AS u ON u.password = '${password}'
             WHERE users.email='${email}'`;

    db.query(sql, (error, result) => {
        if(error) {
            //log with error msg.
            respObj = {
                success:false,
                dbFailed:true,
                msgError:"The login failed..",
                dbMsgError:error
            };
            throw error;
        }
       
        if(result.length == 0){
            respObj = {
                success:false,
                msgError:"This email address is not registered"
            };
            return res.send(respObj);
        }
        
        let infoResult = sqlResults(result, onlyOneResult=true);
       
        if(infoResult.currect_password == 0){
            respObj = {
                success:false,
                msgError:"Incorrect password!"
            };
            return res.send(respObj);
            // return res.send("Incorrect password!");
        }
        
        respObj = {
            success:true,
            data:{
                'id':infoResult.id,
                'name':infoResult.name,
                'isAdmin':infoResult.isAdmin,
                'email':infoResult.email,
            }
        };
        return res.send(respObj);
    });

    // if(res.success==false) alert(res.msgError);
    // let sqlEmail = 'SELECT * FROM users WHERE email = ?' ;
    // let sqlSelect = 'SELECT * FROM users WHERE email = ? AND password = ?' ;

    // db.query(sqlEmail, email, (error, result) => {
    //     if(error) throw error;
    //     let emailResult = sqlResults(result, onlyOneResult=true);
        
    //     if (!emailResult) return res.send("This email address is not registered");
       
    //     db.query(sqlSelect, [email, password], (error, result)=>{
    //         if(error) throw error;
    //         let userResult = sqlResults(result, onlyOneResult=true);

    //         if(!userResult) return res.send("incorrect password");  
    //         return res.send(userResult);
    //     });
    // });
});












    // let sql = "SELECT id, admin, email FROM users WHERE email=? AND password=?";
    // let sqlEmail = "SELECT email FROM users WHERE email=?";
    // let sqlUserLogin = ['Ron@gmail.com', 'passron']; //Array

    // //Option 3:
    // let query = db.query(sqlEmail, sqlUserLogin[0], (error, emailResult)=>{
    //     if(error) throw error;
        
    //     if (emailResult.length == 0) return res.send("This email address is not registered");

    //     db.query(sql, sqlUserLogin, (error, userInfo)=>{
    //         if(error) throw error;

    //         if(userInfo.length == 0) return res.send("incorrect password");            
    //         res.send(userInfo);
        // })      
    // })


module.exports = router;