const isObject = (obj)=>{
    if(typeof(obj) == 'object' && obj != null) return true;
    else false;
}

const log = (...params)=> console.log(params);

const sql_results = (results=[], one_result_only=false)=>{
    if(!results) return false;
   
    return one_result_only?results[0]:results;
}


// global.log = (...params)=> console.log(params);
// global.port = 5000;
module.exports.log = log;
module.exports.isObject = isObject;
module.exports.sqlResults = sql_results;
