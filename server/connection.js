
const mysql = require('mysql');
const text = 'shalom';
const otherText = 'ma kore';

//#region DATABASE CONFIGURATION
let db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'vacations'
});
//#endregion

//#region CONNECTION TO DATABASE
db.connect((error)=>{
    if(error) throw error;
    else console.log('MySql connected...');
});
//#endregion


module.exports.text = text;
module.exports.otherText = otherText;
module.exports.db = db;

