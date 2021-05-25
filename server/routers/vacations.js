const express = require('express');
const {db} = require('../connection');
const router = express.Router();
const Joi = require('joi');
const {log} = require('../helper');
const {isObject, sqlResults} = require('../helper'); // color?

router.post('/', (req, res)=> {
    let isAdmin=req.query.is_admin; // 0 or 1
    if(isAdmin){
        const schema = Joi.object({
            name:Joi.string().min(3).required(),
            description:Joi.string().min(10).required(),
            price:Joi.number().min(100).required(),
            date_start:Joi.date().iso().required(), //ISO 8601 "YYYY-MM-DD"
            date_end:Joi.date().iso().required(),   //ISO 8601 YYYY-MM-DD
        });
        let vacation = req.body;
        let validationResult = schema.validate(vacation);
    
        if(validationResult.error) return res.send(validationResult.error.message);
                
        let sql = "INSERT INTO `vacations` SET ?";
        db.query(sql, vacation, (error, result)=>{
            if(error) throw error;
            return res.send({success:true, message:"New vacation has been added"});
        });
    }
    else return res.send("Access denied");
});

router.get('/', (req, res)=>{
    const schema = Joi.object({
        user_id:Joi.number().required(),
    });
    let validationResult = schema.validate(req.query);

    if(validationResult.error) return res.send(validationResult.error.message);
    let sqlUserId = req.query.user_id
    
    let sql=`SELECT vacations.*, IF(u_v.id,1,0) AS followedByMe`
        // , IF(followedByMe=1,u_v.id,0) AS follow_id
            `FROM vacations
            LEFT JOIN users_vacations AS u_v 
                ON vacations.id = u_v.vacation_id 
                AND u_v.user_id = ?`;

    db.query(sql, sqlUserId, (error, result)=>{
        if(error) throw error;
        res.send(result);        
    });
});

// Need to add update for vacation.
// test that the updater is an admin
router.put('/', (req, res)=> {
    log(req.query);
    let isAdmin=req.query.is_admin; // 0 or 1
    if(isAdmin){
        const schema = Joi.object({
            id:Joi.number().required(),
            name:Joi.string().min(3),
            description:Joi.string().min(10),
            price:Joi.number().min(100),
            date_start:Joi.date().iso(), //ISO 8601 "YYYY-MM-DD"
            date_end:Joi.date().iso(),   //ISO 8601 "YYYY-MM-DD"
        });
        let vacationUpdated = req.body;
        let vacationId = vacationUpdated.id;
        let validationResult = schema.validate(vacationUpdated);
        
    /*let newVacationUpdated={};
        for (const key in vacationUpdated) {
            //key=id
            //key=name
            if(key!='id')
                newVacationUpdated[key]=vacationUpdated[key];
        }*/
        
        if(validationResult.error) return res.send(validationResult.error.message);
        delete vacationUpdated.id;       
        let sql = "UPDATE `vacations` SET ? WHERE id = ?";
        db.query(sql, [vacationUpdated , vacationId], (error, result)=>{
            if(error) throw error;
            return res.send({success:true, message:"vacation updated"});
        });
    }
    else return res.send("Access denied");
});

router.delete('/:vacation_id', (req, res)=>{ // remove a record from vacations table. Only admins can delete
    let isAdmin=req.query.is_admin; // 0 or 1
    if(!isAdmin) return res.send("Access denied. not admin");
    
    const schema = Joi.object({
        vacation_id:Joi.number().required(),
    });

    let validationResult = schema.validate(req.params);
    if(validationResult.error) return res.send(validationResult.error.message);

    let deleteVacationSql = "DELETE FROM vacations WHERE id = ?";
    let vacation_id = req.params.vacation_id;

    db.query(deleteVacationSql, [vacation_id], (error, result)=>{
        if(error) throw error;

        if(result.affectedRows) res.send(`vacation id ${vacation_id} have been deleted!`);
        else res.send(`vacation id ${vacation_id} not exist!`);
    });
});



//Not in use.
const check_if_admin=(req,res,callback)=>{
    let userId=req.query.user_id;
    let checkAdminSql="SELECT admin FROM users WHERE id=?";
    db.query(checkAdminSql, userId, (error, result)=>{
        if(error) throw error;
        if(!result) return res.send("no results!");

        if(!result[0].admin) return res.send("Not an admin");
        callback();
    });
}





//-------------

//Example of callback - not in use.
router.delete('/callback/:tableName/:rowId',(req,res)=>{
    let tableName = req.params.tableName;
    let rowId = req.params.rowId;

    // deleteFromDB(tableName,rowId);
    // deleteFromDB('vacCat',2,"hello");
    deleteFromDB(tableName,rowId,(status)=>{
        log("print from callback");
        if(status) res.send("Deleted!");
        else res.send("Fail to delete!");
    });
});

const deleteFromDB = (tableName=false, rowId=0, callback=false)=>{
    if(!tableName || !rowId) return false;
    let deleteSql = `DELETE FROM ${tableName} WHERE id=?`
    return db.query(deleteSql, [rowId], (error, result)=>{
        if(error) throw error;
        if(callback && typeof(callback)=='function') callback(result.affectedRows);
    });
}

module.exports = router;