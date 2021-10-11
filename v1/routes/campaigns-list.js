const express = require('express');
const router = express.Router();
const axios = require('axios');

function compare(a,b){
    if ( a.totalAmount < b.totalAmount ){
    return 1;
  }
  if ( a.totalAmount > b.totalAmount ){
    return -1;
  }
  return 0;
}
router.get('/',function(req,res){
axios.get("https://testapi.donatekart.com/api/campaign",{headers:{'Content-Type': 'application/json'}})
.then(function(response){
    var responseData=response.data;
     var filterData=responseData.map(function(item){
        var obj={
            "title":item.title,
            "totalAmount":item.totalAmount,
            "backersCount":item.backersCount,
            "endDate":item.endDate
        }
         return obj;
    })
    var finalResponse = filterData.sort(compare);
    res.status(response.status).send(finalResponse);
}).catch(function(err){
    console.log(err);
    res.send({"status":err.response.status,"message":err.response.data});
})
})

module.exports =router;