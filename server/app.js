
const express = require('express');
const connection = require('./connection.js'); // longer. not specific. see otherText
const {db} = require('./connection.js');
const {log} = require('./helper.js');
const vacations = require('./routers/vacations');
const followVacation = require('./routers/followVacation');
const users = require('./routers/users');
const login = require('./routers/login');
const Joi = require('joi');

//For testing...
const {text} = require('./connection.js'); // shorter
//-----
const app = express();
const port = process.env.PORT || '3002';
app.listen(port,()=>{
    console.log("I'm listening on port 3002...");
});

app.use(express.json());// For post request. for body params.


app.get('/test',(req, res)=>{
    // log('testing');
    log('-------- ' + text);
    log('-------- ' + connection.otherText);
    res.send('testing');
})

//Base middleware.
app.use((req, res, next)=>{
    // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    let skipUserIdCheck = (req.method=='POST' && (req.url=='/users' || req.url=='/login'));
    if(skipUserIdCheck) return next();

    const schema = Joi.object({
        user_id:Joi.number().required(),
    });

    let validationResult = schema.validate(req.query);
    if(validationResult.error) return res.send(validationResult.error.message + ". Base middleware");

    let user_id = req.query.user_id;
    let sql = "SELECT * FROM users WHERE id=? LIMIT 1";

    db.query(sql, user_id, (error, result)=>{
        if(error) throw error;
        
        if(!result[0]) return res.send("User not exist! Base middleware");
        req.query.is_admin = result[0].admin;
        next();
    });
});

app.use("/vacations", vacations); //Middleware for loading the page
app.use("/followVacation", followVacation);
app.use("/users", users); // ???
app.use("/login", login);

//Route middlewares
app.get('/', (req, res)=>{
    res.send('No address found');
});

app.use((req, res)=>{
    res.send(404);
});

