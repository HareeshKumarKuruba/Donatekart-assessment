const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/',function(req,res){
axios.get("https://testapi.donatekart.com/api/campaign",{headers:{'Content-Type': 'application/json'}})
.then(function(response){
    var responseData=response.data;
     var filterData=responseData.filter(function(item){
        return (item.endDate<new Date() || item.procuredAmount>=item.totalAmount);
    })
    if(filterData.length===0)
         res.status(response.status).send({"message":"There are no closed campaigns","campaigns":[]});
     else
        res.status(response.status).send(filterData);
}).catch(function(err){
    console.log(err);
    res.send({"status":err.response.status,"message":err.response.data});
})
})

module.exports =router;