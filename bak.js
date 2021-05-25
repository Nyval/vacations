/*
    POST: When we want to insert data to server(databse).
    GET: When we want to get data from server(database).
    PUT: When we want to update data to server(database).
    DELETE: When we want to delete data from server(database).
*/
//#region comments
app.get('/get_vacations', (req, res)=>{
    let sql = 'SELECT * FROM `vacations`';
    let sqlLink = 'SELECT vacation_id FROM `users_vacations` WHERE user_id = ?';
    let sqlUserId = 10; // '10' ?

    db.query(sql, (error, allVacations)=>{
        if(error) throw error;

        db.query(sqlLink, sqlUserId, (error, userVacations)=>{ // vacations 2 (Iceland), 3 (Sweden)
            if(error) throw error;
            let userVacationsIds = userVacations.map((v)=> v.vacation_id);
            // if allVacations contains userVacation, add key to allVacations (id=x) - followedByMe=1, else=0
            allVacations.forEach((vacation, index) => {
               if(userVacationsIds.includes(vacation.id)) allVacations[index].followedByMe = 1;
               else allVacations[index].followedByMe = 0;
            });
            res.send(allVacations);
        });
    });
})

//Need to select the ID with email and password.
//Compare the sent ID with the select one.
//Only then, delete.




let query = (sqlEmail, userLogin, callback)=>{
    if(typeof(userLogin) == 'string'){
        //run query
    }
    if(typeof(userLogin) == 'array'){

    }
    if(typeof(userLogin) == 'object'){

    }
    let result = run_query(sqlEmail,userLogin);
    callback(result.error, result.results);
}


    // login function options:
    // Option 1:
    let query = db.query(sql, userLogin, (error, result)=>{
        if(error) throw error;
        
        if (result.length == 0) return res.send(false);
        res.send(result);
    });

    // Option 2: check if email exist, if exist check if password match, if match response with user data.
    let query = db.query(sql, userLogin, (error, result)=>{
        if(error) throw error;
        
        if (result.length == 0){
            let queryEmail = db.query(sqlEmail, userLogin[0], (error, result)=>{
                if(error) throw error;
                if (result.length == 0) return res.send("This email address is not registered");
                res.send("incorrect password");
            })
        }
        res.send(result);
    })
    //Check if email exist.
    //Check email with password.
    //return result if match.
//#endregion